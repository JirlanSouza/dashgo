import { Box, Center, Flex, SimpleGrid, Text } from "@chakra-ui/react";

import { Header } from "@components/Header";
import { Sidebar } from "@components/Sidebar";
import { withSSRAuth } from "@utils/withSSRAuth";
import { getServerApiClient } from "@services/api/setupApiClient";
import { Chart } from "@components/Charts/dashboardChart";
import { useCan } from "@services/hooks/useCan";

interface DashboardProps {
  series: any[][];
}

export default function Dashboard({ series }: DashboardProps): JSX.Element {
  const useCanSeeMetrics = useCan({ roles: ["administrator", "editor"] });

  if (!useCanSeeMetrics) {
    return (
      <Flex direction="column" h="100vh">
        <Header />
        <Flex w="100%" my="6" maxWidth={1480} height="100%" mx="auto" px="6">
          <Sidebar />
          <Center width="100%" height="100%">
            <Text fontSize="larger">
              Usuário não tem permissão para visualizar as métricas
            </Text>
          </Center>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box
            position="relative"
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            <Chart series={series[0]} />
          </Box>

          <Box
            position="relative"
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
            <Chart series={series[1]} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

const series = [
  [{ name: "series1", data: [45, 69, 102, 86, 68, 58, 71] }],
  [{ name: "series1", data: [0.6, 0.89, 0.2, 0.56, 0.98, 0.58, 0.71] }],
];

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = getServerApiClient(ctx);
  const response = await apiClient.request.get("/me");
  return {
    props: {
      series,
    },
  };
}, {});
