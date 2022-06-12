import { ElementType } from "react";
import { Icon, Link as ChakraLink, LinkProps, Text } from "@chakra-ui/react";

import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends LinkProps {
  icon: ElementType;
  children: string;
}

export function NavLink({
  icon,
  children,
  href,
  ...rest
}: NavLinkProps): JSX.Element {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" alignItems="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
