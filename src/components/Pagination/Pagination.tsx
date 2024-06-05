import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";

import { PaginationItem } from "./PaginationItem";
import { PaginationWrap, Text } from "./styled";
import { IPagination } from "./types";
import { Box, Flex } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/react";

const siblingsCount = 1;

const generatePagesArray = (from: number, to: number) =>
  [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);

const Pagination = ({
  totalRegisters,
  registerPerPage = 10,
  currentPage = 1,
  handleChangePage,
}: IPagination) => {
  const lastPage = Math.ceil(totalRegisters / registerPerPage);
  const [break600] = useMediaQuery("(max-width: 600px)");
  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : [];

  const countPage = registerPerPage * currentPage;

  return (
    <Flex
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      padding="0 30px"
      flexDir={break600 ? "column" : "row"}
    >
      <Flex flex="1" gap="5px" marginBottom={break600 ? "25px" : "unset"}>
        <Text fontWeight={500} cursor="default">
          Resultado:
        </Text>
        <Text
          background="brand.50"
          padding="2px 7px"
          color="brand.500"
          cursor="default"
          borderRadius="5px"
          fontSize="0.9rem"
        >
          {totalRegisters < registerPerPage
            ? totalRegisters
            : countPage > totalRegisters
            ? totalRegisters
            : countPage}{" "}
          de {totalRegisters}
        </Text>
      </Flex>
      {totalRegisters > 0 && (
        <PaginationWrap>
          <Text
            disabled={currentPage === 1}
            className={`${currentPage !== 1 && "active"}`}
            onClick={() => handleChangePage(currentPage - 1)}
          >
            <IoIosArrowBack /> Anterior
          </Text>

          <div className="buttonsWrap">
            {currentPage > 1 + siblingsCount && (
              <>
                <PaginationItem onClick={() => handleChangePage(1)} page={1} />
                {currentPage > 2 + siblingsCount && (
                  <Text>
                    <BsThreeDots />
                  </Text>
                )}
              </>
            )}

            {previousPages.length > 0 &&
              previousPages.map((page) => (
                <PaginationItem
                  key={page}
                  onClick={() => handleChangePage(page)}
                  page={page}
                />
              ))}

            <PaginationItem page={currentPage} isCurrent />

            {nextPages.length > 0 &&
              nextPages.map((page) => (
                <PaginationItem
                  key={page}
                  onClick={() => handleChangePage(page)}
                  page={page}
                />
              ))}

            {currentPage + siblingsCount < lastPage && (
              <>
                {currentPage + 1 + siblingsCount < lastPage && (
                  <Text>
                    <BsThreeDots />
                  </Text>
                )}
                <PaginationItem
                  onClick={() => handleChangePage(lastPage)}
                  page={lastPage}
                />
              </>
            )}
          </div>

          <Text
            disabled={currentPage === lastPage || totalRegisters === 0}
            className={`${
              currentPage !== lastPage && "active" && totalRegisters !== 0
            }`}
            onClick={() => handleChangePage(currentPage + 1)}
          >
            Próximo <IoIosArrowForward />
          </Text>
        </PaginationWrap>
      )}
      <Box flex="1"></Box>
    </Flex>
  );
};

export default Pagination;
