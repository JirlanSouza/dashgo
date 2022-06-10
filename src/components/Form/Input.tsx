import {
  FormControl,
  FormLabel,
  Input as InputBase,
  InputProps as InputBaseProps,
} from "@chakra-ui/react";

interface InputProps extends InputBaseProps {
  name: string;
  label?: string;
}

export function Input({ name, label, ...rest }: InputProps): JSX.Element {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputBase
        name={name}
        id={name}
        focusBorderColor="pink.500"
        bg="gray.900"
        variant="filled"
        _hover={{
          bgColor: "gray.900",
        }}
        size="lg"
        {...rest}
      />
    </FormControl>
  );
}
