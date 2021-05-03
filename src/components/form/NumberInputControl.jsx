import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
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
      <NumberInput name={name} {...other} {...field}>
        <NumberInputField placeholder={props.placeholder} />
      </NumberInput>
    </FormControl>
  );
}

export default NumberInputControl;
