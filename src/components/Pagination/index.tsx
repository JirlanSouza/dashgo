import { Box, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCounterOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCounterOfRegisters,
  registerPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps): JSX.Element {
  const lastPage = Math.floor(totalCounterOfRegisters / registerPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  return (
    <Stack
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      {totalCounterOfRegisters && (
        <Box>
          <strong>{currentPage * registerPerPage - registerPerPage + 1}</strong>{" "}
          -{" "}
          <strong>
            {Math.min(currentPage * registerPerPage, totalCounterOfRegisters)}
          </strong>{" "}
          de <strong>{totalCounterOfRegisters}</strong>
        </Box>
      )}

      <Stack direction="row" spacing="2">
        <>
          {currentPage > 1 + siblingsCount && (
            <>
              <PaginationItem number={1} onPageChange={onPageChange} />
              {currentPage > 2 + siblingsCount && (
                <Text
                  as="span"
                  fontSize="lg"
                  textAlign="center"
                  color="gray.300"
                  width={8}
                >
                  {" . . . "}
                </Text>
              )}
            </>
          )}

          {previousPages.map((page) => {
            return (
              <PaginationItem
                key={page}
                number={page}
                onPageChange={onPageChange}
              />
            );
          })}

          <PaginationItem
            number={currentPage}
            isCurrent
            onPageChange={onPageChange}
          />

          {nextPages.map((page) => {
            return (
              <PaginationItem
                key={page}
                number={page}
                onPageChange={onPageChange}
              />
            );
          })}

          {currentPage < lastPage - siblingsCount && (
            <>
              {currentPage < lastPage - (siblingsCount + 1) && (
                <Text
                  as="span"
                  fontSize="lg"
                  textAlign="center"
                  color="gray.300"
                >
                  {" . . . "}
                </Text>
              )}

              <PaginationItem number={lastPage} onPageChange={onPageChange} />
            </>
          )}
        </>
      </Stack>
    </Stack>
  );
}
