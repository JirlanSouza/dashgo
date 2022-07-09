import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "@components/Header";
import { Pagination } from "@components/Pagination";
import { Sidebar } from "@components/Sidebar";
import { useUsers } from "@services/hooks/useUsers";
import { UsersTable } from "@components/UsersTable";
import { useState } from "react";

export default function UserList(): JSX.Element {
  const [page, setPage] = useState(1);
  const isWideVersion = useBreakpointValue({ base: false, lg: true });
  const { data, isLoading, isFetching, error } = useUsers(page);

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {isFetching && !isLoading && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
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
              <Spinner size="lg" color="gray.500" />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao carregar dados dos usuários.</Text>
            </Flex>
          ) : (
            <UsersTable users={data.users} isWideVersion={isWideVersion} />
          )}
          <Pagination
            totalCounterOfRegisters={data?.totalCount}
            currentPage={page}
            onPageChange={setPage}
          />
        </Box>
      </Flex>
    </Box>
  );
}
