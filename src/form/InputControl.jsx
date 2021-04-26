const {
  FormControl,
  FormLabel,
  Input,
  propNames,
} = require("@chakra-ui/react");
const React = require("react");
const { useController } = require("react-hook-form");

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
