import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useAuth } from "@contexts/AuthContext";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps): JSX.Element {
  const { isAuthenticated, user } = useAuth();

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4">
          <Text as="h5">. . .</Text>
          <Text as="span" fontSize="small" color="gray.300">
            {user?.email}
          </Text>
        </Box>
      )}

      <Avatar size={showProfileData ? "md" : "sm"} name="dashgo user" src="" />
    </Flex>
  );
}
