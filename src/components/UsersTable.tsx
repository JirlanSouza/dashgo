import {
  Box,
  Button,
  Checkbox,
  Icon,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { User } from "@services/hooks/useUsers";
import { RiPencilLine } from "react-icons/ri";

interface UsersTableProps {
  users: User[];
  isWideVersion: boolean;
  onUserHover: (id: string) => void;
}

export function UsersTable({
  users,
  isWideVersion,
  onUserHover,
}: UsersTableProps) {
  return (
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
                  <Link onMouseEnter={() => onUserHover(user.id)}>
                    <Text fontWeight="bold">{user.name}</Text>
                  </Link>

                  <Text fontSize="small" color="gray.300">
                    {user.email}
                  </Text>
                </Box>
              </Td>

              {isWideVersion && <Td textAlign="center">{user.createdAt}</Td>}

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
  );
}
