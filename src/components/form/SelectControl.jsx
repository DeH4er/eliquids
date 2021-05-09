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

  const { onChange, value } = field;

  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const newIndex = props.values.findIndex((v) => compare(v, value));

    if (selectedIndex === -1 && props.values.length > 0) {
      onChange(props.values[0]);
      setSelectedIndex(0);
      return;
    }

    if (selectedIndex !== newIndex) {
      setSelectedIndex(newIndex);
    }
  }, [compare, value, onChange, props.values, selectedIndex]);

  function onSelect(e) {
    const index = e.target.value;
    setSelectedIndex(index);
    onChange(props.values[index]);
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
