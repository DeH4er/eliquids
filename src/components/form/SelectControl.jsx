import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";

function SelectControl(props) {
  const {
    name,
    rules = undefined,
    shouldUnregister = undefined,
    defaultValue = undefined,
    control = undefined,
    compare = (v1, v2) => v1 === v2,
    ...other
  } = props;

  const { field, fieldState } = useController({
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const newIndex = props.values.findIndex((v) => compare(v, field.value));

    if (selectedIndex !== newIndex) {
      setSelectedIndex(newIndex);
    }
  }, [field.value, props.values]);

  function onSelect(e) {
    const index = e.target.value;
    setSelectedIndex(index);
    field.onChange(props.values[index]);
  }

  return (
    <FormControl isInvalid={fieldState.invalid}>
      <FormLabel>{props.label}</FormLabel>

      <Select
        name={name}
        {...other}
        {...field}
        value={selectedIndex}
        onChange={onSelect}
      >
        {props.values.map((v, i) => (
          <option key={v.id ?? v} value={i}>
            {props.children(v, i)}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectControl;
