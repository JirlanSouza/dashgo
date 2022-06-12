import { Box, Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from "react-icons/ri";

import { NavSection } from "./NacSection";
import { NavLink } from "./NavLink";

export function Sidebar(): JSX.Element {
  return (
    <Box as="aside" w="48" mr="8">
      <Stack spacing="12" align="flex-start">
        <NavSection title="GERAL">
          <>
            <NavLink icon={RiDashboardLine}>Dashboard</NavLink>
            <NavLink icon={RiContactsLine}>Contatos</NavLink>
          </>
        </NavSection>

        <NavSection title="AUTOMAÇÃO">
          <>
            <NavLink icon={RiInputMethodLine}>Formulários</NavLink>
            <NavLink icon={RiGitMergeLine}>Automação</NavLink>
          </>
        </NavSection>
      </Stack>
    </Box>
  );
}
