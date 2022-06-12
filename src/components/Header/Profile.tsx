import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps): JSX.Element {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4">
          <Text as="h5">Jirlan Souza</Text>
          <Text as="span" fontSize="small" color="gray.300">
            jirlansouza08@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size={showProfileData ? "md" : "sm"}
        name="Jirlan Souza"
        src="https://github.com/jirlansouza.png"
      />
    </Flex>
  );
}
