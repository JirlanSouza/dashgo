import { theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ChartBase = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2022-03-16T00:00:00.000z",
      "2022-03-17T00:00:00.000z",
      "2022-03-18T00:00:00.000z",
      "2022-03-19T00:00:00.000z",
      "2022-03-20T00:00:00.000z",
      "2022-03-21T00:00:00.000z",
      "2022-03-22T00:00:00.000z",
    ],
  },
  yaxis: {
    min: 0,
    forceNiceScale: true,
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
  stroke: {
    width: 2,
  },
};

interface ChartParams {
  series: any[];
}

export function Chart({ series }: ChartParams) {
  return (
    <ChartBase options={options} series={series} type="area" height={160} />
  );
}
