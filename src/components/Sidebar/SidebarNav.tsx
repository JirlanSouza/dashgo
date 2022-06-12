import { Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
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
          <NavLink href="/dashboard" icon={RiDashboardLine}>
            Dashboard
          </NavLink>
          <NavLink href="/users" icon={RiContactsLine}>
            Contatos
          </NavLink>
        </>
      </NavSection>

      <NavSection title="AUTOMAÇÃO">
        <>
          <NavLink href="/forms" icon={RiInputMethodLine}>
            Formulários
          </NavLink>
          <NavLink href="/automation" icon={RiGitMergeLine}>
            Automação
          </NavLink>
        </>
      </NavSection>
    </Stack>
  );
}
