import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList(): JSX.Element {
  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>

            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="small"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                cursor="pointer"
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={["4", "4", "6"]} color="gray.300" width="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Usuário</Th>
                {isWideVersion && <Th>Data de cadastro</Th>}
                <Th></Th>
              </Tr>
            </Thead>

            <Tbody>
              <Tr>
                <Td p={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Jirlan de Souza</Text>
                    <Text fontSize="small" color="gray.300">
                      jirlansouza08@gmail.com
                    </Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>03 de Fevereiro de 2022</Td>}
                <Td textAlign="end">
                  {isWideVersion && (
                    <Button
                      as="a"
                      size="sm"
                      fontSize="small"
                      colorScheme="blue"
                      leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                      cursor="pointer"
                    >
                      Editar
                    </Button>
                  )}
                </Td>
              </Tr>

              <Tr>
                <Td p={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Jirlan de Souza</Text>
                    <Text fontSize="small" color="gray.300">
                      jirlansouza08@gmail.com
                    </Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>03 de Fevereiro de 2022</Td>}
                <Td textAlign="end">
                  {isWideVersion && (
                    <Button
                      as="a"
                      size="sm"
                      fontSize="small"
                      colorScheme="blue"
                      leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                      cursor="pointer"
                    >
                      Editar
                    </Button>
                  )}
                </Td>
              </Tr>

              <Tr>
                <Td p={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Jirlan de Souza</Text>
                    <Text fontSize="small" color="gray.300">
                      jirlansouza08@gmail.com
                    </Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>03 de Fevereiro de 2022</Td>}
                <Td textAlign="end">
                  {isWideVersion && (
                    <Button
                      as="a"
                      size="sm"
                      fontSize="small"
                      colorScheme="blue"
                      leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                      cursor="pointer"
                    >
                      Editar
                    </Button>
                  )}
                </Td>
              </Tr>

              <Tr>
                <Td p={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Jirlan de Souza</Text>
                    <Text fontSize="small" color="gray.300">
                      jirlansouza08@gmail.com
                    </Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>03 de Fevereiro de 2022</Td>}
                <Td textAlign="end">
                  {isWideVersion && (
                    <Button
                      as="a"
                      size="sm"
                      fontSize="small"
                      colorScheme="blue"
                      leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                      cursor="pointer"
                    >
                      Editar
                    </Button>
                  )}
                </Td>
              </Tr>

              <Tr>
                <Td p={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Jirlan de Souza</Text>
                    <Text fontSize="small" color="gray.300">
                      jirlansouza08@gmail.com
                    </Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>03 de Fevereiro de 2022</Td>}
                <Td textAlign="end">
                  {isWideVersion && (
                    <Button
                      as="a"
                      size="sm"
                      fontSize="small"
                      colorScheme="blue"
                      leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                      cursor="pointer"
                    >
                      Editar
                    </Button>
                  )}
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}
