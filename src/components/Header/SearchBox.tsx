import { useState } from "react";
import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox(): JSX.Element {
  const [search, setSearch] = useState("");

  return (
    <Flex
      as="label"
      flex="1"
      py="2"
      px="4"
      ml="8"
      maxWidth={400}
      alignSelf="center"
      align="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="10"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: "gray.400" }}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <Icon as={RiSearchLine} />
    </Flex>
  );
}
