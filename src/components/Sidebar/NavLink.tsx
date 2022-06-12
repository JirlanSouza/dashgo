import { ElementType } from "react";
import { Icon, Link, LinkProps, Text } from "@chakra-ui/react";

interface NavLinkProps extends LinkProps {
  icon: ElementType;
  children: string;
}

export function NavLink({
  icon,
  children,
  ...rest
}: NavLinkProps): JSX.Element {
  return (
    <Link display="flex" alignItems="center" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  );
}
