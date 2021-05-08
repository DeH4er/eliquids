import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useController } from "react-hook-form";
import { format, parse, isValid } from "date-fns";

function DatepickerControl(props) {
  const {
    name,
    rules = undefined,
    shouldUnregister = undefined,
    defaultValue = undefined,
    control = undefined,
    min = undefined,
    ...other
  } = props;

  const { field, fieldState } = useController({
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
  });

  const { onChange, value } = field;

  function dateChange(e) {
    const dateStr = e.target.value;
    const newDate = parseDate(dateStr);

    if (isValidDate(newDate)) {
      onChange(newDate);
    } else {
      e.target.value = formatDate(value);
    }
  }

  function isValidDate(date) {
    const validMin = min ? date >= min : true;
    const validDate = isValid(date);
    return validMin && validDate;
  }

  function parseDate(dateStr) {
    return parse(dateStr, "yyyy-MM-dd", new Date());
  }

  function formatDate(date) {
    return format(date, "yyyy-MM-dd");
  }

  return (
    <FormControl isInvalid={fieldState.invalid}>
      <FormLabel>{props.label}</FormLabel>
      <Input
        name={name}
        {...other}
        {...field}
        type="date"
        value={formatDate(value)}
        onChange={dateChange}
        min={min ? formatDate(min) : undefined}
      />
    </FormControl>
  );
}

export default DatepickerControl;
