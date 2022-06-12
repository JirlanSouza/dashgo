import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile(): JSX.Element {
  return (
    <Flex align="center">
      <Box mr="4">
        <Text>Jirlan Souza</Text>
        <Text as="span" fontSize="small">
          jirlansouza08@gmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Jirlan Souza"
        src="https://github.com/jirlansouza.png"
      />
    </Flex>
  );
}
