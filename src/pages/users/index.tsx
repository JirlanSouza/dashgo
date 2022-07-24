import { useState } from "react";
import { GetServerSideProps } from "next";
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
import { RiAddLine } from "react-icons/ri";

import { Header } from "@components/Header";
import { Pagination } from "@components/Pagination";
import { Sidebar } from "@components/Sidebar";
import { getUsers, User, useUsers } from "@services/hooks/useUsers";
import { UsersTable } from "@components/UsersTable";
import { prefetchUser } from "@services/prefetch/user";
import { Can } from "@components/Can";

interface UserListProps {
  usersData?: {
    users: User[];
    totalCount: number;
  };
}

export default function UserList({ usersData }: UserListProps): JSX.Element {
  const [page, setPage] = useState(1);
  const isWideVersion = useBreakpointValue({ base: false, lg: true });
  const { data, isLoading, isFetching, error } = useUsers(
    page,
    usersData
      ? {
          initialData: {
            users: usersData?.users,
            totalCount: usersData?.totalCount,
          },
        }
      : undefined
  );

  function handlePrefetchUser(id: string) {
    prefetchUser(id);
  }

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

            <Can roles={["administrator"]}>
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
            </Can>
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
            <UsersTable
              users={data.users}
              isWideVersion={isWideVersion}
              onUserHover={handlePrefetchUser}
            />
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

export const getServerSideProps: GetServerSideProps<
  UserListProps
> = async () => {
  try {
    const response = await getUsers(1);

    return {
      props: {
        usersData: { ...response },
      },
    };
  } catch {
    return {
      props: {},
    };
  }
};
