import { Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboard2Line,
  RiGitMergeLine,
  RiInputMethodLine,
} from "react-icons/ri";

import { NavSection } from "./NacSection";
import { NavLink } from "./NavLink";

export function SidebarNav(): JSX.Element {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <>
          <NavLink icon={RiDashboard2Line}>Dashboard</NavLink>
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
  );
}
