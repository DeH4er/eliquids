import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useController } from "react-hook-form";

function InputControl(props) {
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
      <Input name={name} {...other} {...field} />
    </FormControl>
  );
}

export default InputControl;
