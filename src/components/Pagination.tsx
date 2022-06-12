import { Box, Button, HStack } from "@chakra-ui/react";

export function Pagination(): JSX.Element {
  return (
    <HStack spacing="6" mt="8" justify="space-between" align="center">
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>

      <HStack spacing="2">
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          colorScheme="pink"
          disabled
          _disabled={{ bgColor: "pink.500", cursor: "default" }}
        >
          1
        </Button>
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          bg="gray.700"
          _hover={{ bgColor: "gray.500" }}
        >
          2
        </Button>
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          bg="gray.700"
          _hover={{ bgColor: "gray.500" }}
        >
          3
        </Button>
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          bg="gray.700"
          _hover={{ bgColor: "gray.500" }}
        >
          4
        </Button>
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          bg="gray.700"
          _hover={{ bgColor: "gray.500" }}
        >
          5
        </Button>
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          bg="gray.700"
          _hover={{ bgColor: "gray.500" }}
        >
          6
        </Button>
      </HStack>
    </HStack>
  );
}
