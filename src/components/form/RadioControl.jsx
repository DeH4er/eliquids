import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React from "react";
import { useController } from "react-hook-form";

function RadioControl(props) {
  const {
    name,
    rules = undefined,
    shouldUnregister = undefined,
    defaultValue = undefined,
    control = undefined,
    direction = "row",
    values = [],
    ...other
  } = props;

  const { field } = useController({
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
  });

  return (
    <RadioGroup name={name} {...other} {...field}>
      <Stack direction={direction}>
        {values.map((v) => (
          <Radio key={v.value} value={v.value}>
            {v.label}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
}

export default RadioControl;
