import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
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
import { useQuery } from "react-query";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export default function UserList(): JSX.Element {
  const isWideVersion = useBreakpointValue({ base: false, lg: true });
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>(
    "users",
    async () => {
      const response = await fetch("http://localhost:3000/api/users");
      const data = await response.json();

      return data.users;
    },
    1000 * 60 * 5
  );

  const dateFormate = new Intl.DateTimeFormat("pt-br", {
    dateStyle: "long",
  });

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

          {isLoading ? (
            <Flex flex={1} align="center" justify="center">
              <Spinner size="lg" />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao carregar dados dos usuários.</Text>
            </Flex>
          ) : (
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
                {users.map((user) => {
                  return (
                    <Tr key={user.id}>
                      <Td p={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text fontSize="small" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && (
                        <Td textAlign="center">
                          {dateFormate.format(new Date(user.createdAt))}
                        </Td>
                      )}
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
                  );
                })}
              </Tbody>
            </Table>
          )}
          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}
