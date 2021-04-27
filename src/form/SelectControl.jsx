import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import React from "react";
import { useController } from "react-hook-form";

function NumberInputControl(props) {
  const {
    name,
    rules = undefined,
    shouldUnregister = undefined,
    defaultValue = undefined,
    control = undefined,
    ...other
  } = props;

  const { field, fieldState } = useController({
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
  });

  return (
    <FormControl isInvalid={fieldState.invalid}>
      <FormLabel>{props.label}</FormLabel>
      <Select name={name} {...other} {...field}>
        {props.values.map((v) => (
          <option key={v.value} value={v.value}>
            {v.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

export default NumberInputControl;
