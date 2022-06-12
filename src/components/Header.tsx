import { Avatar, Box, Flex, HStack, Icon, Input, Text } from "@chakra-ui/react";
import {
  RiNotificationLine,
  RiSearchLine,
  RiUserAddLine,
} from "react-icons/ri";

export function Header(): JSX.Element {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Text
        fontSize="3xl"
        fontWeight="bold"
        letterSpacing="tight"
        w="48"
        userSelect="none"
      >
        dashgo
        <Text as="span" ml="1" color="pink.500">
          .
        </Text>
      </Text>

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
        />
        <Icon as={RiSearchLine} />
      </Flex>

      <Flex align="center" ml="auto">
        <HStack
          spacing="8"
          mx="8"
          pr="8"
          py="1"
          color="gray.300"
          borderRightWidth={1}
          borderColor="gray.700"
        >
          <Icon as={RiNotificationLine} />
          <Icon as={RiUserAddLine} />
        </HStack>
      </Flex>

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
    </Flex>
  );
}