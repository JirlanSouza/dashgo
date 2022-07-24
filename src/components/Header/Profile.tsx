import {
  Avatar,
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  theme,
} from "@chakra-ui/react";
import { useAuth } from "@contexts/AuthContext";
import { useState } from "react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps): JSX.Element {
  const { isAuthenticated, signOut, user } = useAuth();

  return (
    <Flex align="center">
      {showProfileData && (
        <Popover>
          <PopoverTrigger>
            <Box mr="4" cursor="pointer">
              <Text as="h5">. . .</Text>
              <Text as="span" fontSize="small" color="gray.300">
                {user?.email}
              </Text>
            </Box>
          </PopoverTrigger>

          <PopoverContent bg="gray.800" borderColor="gray.700">
            <PopoverArrow
              bg="gray.800"
              borderColor="gray.700"
              sx={{
                "--popper-arrow-shadow-color": theme.colors.gray[700],
              }}
            />
            <PopoverCloseButton bg="gray.700" />
            <PopoverHeader borderColor="gray.700">
              <Text fontSize="large" textAlign="center">
                Deslogar da conta
              </Text>
            </PopoverHeader>
            <PopoverBody
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={4}
            >
              <Button
                variant="solid"
                colorScheme="pink"
                onClick={() => signOut()}
              >
                SignOut
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )}

      <Avatar size={showProfileData ? "md" : "sm"} name="dashgo user" src="" />
    </Flex>
  );
}
