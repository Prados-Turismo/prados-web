/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderMark,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { uf } from "../../utils/uf";
import { cities } from "../../utils/cities";
import { useLocation, useNavigate } from "react-router-dom";

import { SelectContent } from "./styled";
import { IProductSearchFilter } from "./types";
import { getHost, numberFormat } from "../../utils";
import { IReactSelected } from "../../pages/UserManagements/types";

import FieldSearch from "../FieldSearch/FieldSearch";
import { useGlobal } from "../../contexts/UserContext";
import { CARE_SEGMENTATION_FROM_TO } from "../../utils/enumFormat";
import useBenefits from "../../hooks/useBenefits";

const ProductSearchFilter = ({
  isLoading,
  setSearch,
  search,
  setFieldSearch,
  counts,
  menu,
  setOrderBy,
}: IProductSearchFilter) => {
  const navigate = useNavigate();
  const { getAllCompaniesProvider } = useBenefits();
  const { data: providersData, isLoading: isLoadingProviders } =
    getAllCompaniesProvider({ productClass: menu === "all" ? null : menu });
  const { isBroker } = useGlobal();
  const [suplierSelected, setSupliersSelected] = useState<any>(null);

  const [copartSelected, setCopartSelected] = useState<any>(null);
  const [segmentationSelected, setSegmentationSelected] = useState<any>(null);
  const [ufSelected, setUfSelected] = useState<any>(null);
  const [citySelected, setCitySelected] = useState<any>(null);

  const location = useLocation();

  const [valueMin, setValueMin] = useState<number>(counts?.minValue || 0);
  const [valueMax, setValueMax] = useState<number>(counts?.maxValue || 0);
  const [value, setValue] = useState<number[]>([
    counts?.minValue || 0,
    counts?.maxValue || 0,
  ]);
  const host = getHost();
  const [tags, setTags] = useState<any>({
    fornecedor: [],
    uf: [],
    city: [],
  });
  const [reset, setReset] = useState(false);

  const clearFilters = () => {
    setOrderBy("providerName");
    setSupliersSelected(null);
    setCopartSelected(null);
    setUfSelected(null);
    setCitySelected(null);
    setSegmentationSelected(null);
    setSearch({
      fornecedorOrProductText: search.fornecedorOrProductText,
    });
    setValue([valueMin, valueMax]);
    setTags({
      fornecedor: [],
      uf: [],
      city: [],
    });
    if (setFieldSearch) {
      setFieldSearch(null);
    }
  };

  function deleteTagFornecedor(value: string) {
    const newTagArray = tags.fornecedor.filter(function (item: any) {
      return item.value !== value;
    });

    const newSearchArray = search.fornecedor.filter(function (item: any) {
      return item !== value;
    });

    setTags({
      ...tags,
      fornecedor: newTagArray,
    });

    setSearch({
      ...search,
      fornecedor: newSearchArray.length > 0 ? newSearchArray : null,
    });

    if (tags?.fornecedor?.length <= 1 && tags?.uf?.length < 1) {
      clearFilters();
    }
  }

  function deleteTagUf(value: string) {
    const newTagArray = tags.uf.filter(function (item: any) {
      return item.value !== value;
    });

    const newSearchArray = search.uf.filter(function (item: any) {
      return item !== value;
    });

    const newCities = search?.city?.filter(function (item: any) {
      return item?.uf !== value;
    });

    setTags({
      ...tags,
      uf: newTagArray,
      city: newCities,
    });

    setSearch({
      ...search,
      uf: newSearchArray.length > 0 ? newSearchArray : null,
      city: newCities,
    });

    if (tags?.fornecedor?.length < 1 && tags?.uf?.length <= 1) {
      clearFilters();
    }
  }

  function deleteTagCity(value: string) {
    const newTagArray = tags.city.filter(function (item: any) {
      return item.value !== value;
    });

    const newSearchArray = search.city.filter(function (item: any) {
      return item.value !== value;
    });

    setTags({
      ...tags,
      city: newTagArray,
    });

    setSearch({
      ...search,
      city: newSearchArray.length > 0 ? newSearchArray : null,
    });

    if (
      tags?.fornecedor?.length < 1 &&
      tags?.uf?.length < 1 &&
      tags?.city.length <= 1
    ) {
      clearFilters();
    }
  }

  useEffect(() => {
    if (value[0] === 0 && value[1] === 0) {
      setValueMin(counts?.minValue || 0);
      setValueMax(counts?.maxValue || 0);
      setValue([counts?.minValue || 0, counts?.maxValue || 0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counts]);

  return (
    <Box zIndex={2}>
      <SelectContent>
        <FormControl
          maxWidth={{
            base: "100%",
            md: "220px",
          }}
        >
          <FormLabel htmlFor="fornecedor">Fornecedor</FormLabel>

          <ReactSelect
            className="fornecedor select-fields large"
            classNamePrefix="select"
            isLoading={isLoadingProviders}
            closeMenuOnSelect={true}
            isSearchable={true}
            placeholder="Selecionar"
            noOptionsMessage={() => "Nenhum opção para selecionar"}
            value={suplierSelected}
            onChange={(selectedOption) => {
              setSupliersSelected(selectedOption);
              setSearch({
                ...search,
                fornecedor: search?.fornecedor
                  ? [...search.fornecedor, selectedOption?.value]
                  : [selectedOption?.value],
              });
              setTags({
                ...tags,
                fornecedor: tags?.fornecedor
                  ? [...tags.fornecedor, selectedOption]
                  : [selectedOption],
              });
            }}
            options={providersData
              ?.filter((el) =>
                search?.fornecedor ? !search?.fornecedor.includes(el.id) : true,
              )
              ?.map((supplier) => ({
                value: supplier?.id,
                label: supplier?.corporateName,
              }))}
          />
        </FormControl>

        <Box minW="230px" maxW="242px">
          <FormLabel htmlFor="fornecedor">Nome do produto</FormLabel>
          <FieldSearch
            placeholder="Buscar produto"
            handleSearch={(value) => {
              setReset(false);
              setSearch({
                ...search,
                fornecedorOrProductText: value,
              });
            }}
            reset={reset}
          />
        </Box>

        <FormControl
          maxWidth={{
            base: "100%",
            md: "180px",
          }}
          minW="130px"
        >
          <FormLabel htmlFor="segmentacao">Segmentação</FormLabel>

          <ReactSelect
            className="segmentacao select-fields large"
            classNamePrefix="select"
            closeMenuOnSelect={true}
            isSearchable={true}
            placeholder="Selecionar"
            noOptionsMessage={() => "Nenhum opção para selecionar"}
            value={segmentationSelected}
            onChange={(selectedOption) => {
              setSegmentationSelected(selectedOption);
              setSearch({ ...search, segment: selectedOption?.value });
            }}
            options={Object.keys(CARE_SEGMENTATION_FROM_TO).map((key) => ({
              value: key,
              label: CARE_SEGMENTATION_FROM_TO[key],
            }))}
          />
        </FormControl>

        <FormControl
          maxWidth={{
            base: "100%",
            md: "180px",
          }}
          minW="130px"
        >
          <FormLabel htmlFor="coparticipacao">Coparticipação</FormLabel>
          <ReactSelect
            className="coparticipacao select-fields large"
            classNamePrefix="select"
            closeMenuOnSelect={true}
            isSearchable={true}
            placeholder="Selecionar"
            noOptionsMessage={() => "Nenhum opção para selecionar"}
            value={copartSelected}
            onChange={(selectedOption) => {
              setCopartSelected(selectedOption);
              setSearch({ ...search, copart: selectedOption?.value });
            }}
            options={[
              {
                value: 1,
                label: "Sim",
              },
              {
                value: 2,
                label: "Não",
              },
            ]}
          />
        </FormControl>

        <FormControl
          maxWidth={{
            base: "100%",
            md: "180px",
          }}
          minW="130px"
        >
          <FormLabel htmlFor="estado">Estado</FormLabel>

          <ReactSelect
            className="estado select-fields large"
            classNamePrefix="select"
            closeMenuOnSelect={true}
            isSearchable={true}
            placeholder="Selecionar"
            noOptionsMessage={() => "Nenhum opção para selecionar"}
            value={ufSelected}
            onChange={(selectedOption) => {
              setUfSelected(selectedOption);
              setSearch({
                ...search,
                uf: search?.uf
                  ? [...search.uf, selectedOption?.value]
                  : [selectedOption?.value],
                // city: null
              });
              setTags({
                ...tags,
                uf: tags?.uf ? [...tags.uf, selectedOption] : [selectedOption],
                // city: []
              });
              setCitySelected(null);
              // setFieldSearch({
              //   uf: selectedOption?.value,
              //   city: ""
              // })
            }}
            options={
              uf &&
              uf
                .filter((el) =>
                  search?.uf ? !search?.uf.includes(el.codIbgeUF) : true,
                )
                .map((item) => ({
                  value: item?.codIbgeUF,
                  label: item?.nomeUF,
                }))
            }
          />
        </FormControl>

        <FormControl
          maxWidth={{
            base: "100%",
            md: "180px",
          }}
        >
          <FormLabel htmlFor="municipio">Município</FormLabel>

          {!ufSelected ? (
            <Flex
              justifyContent="flex-start"
              paddingLeft="10px"
              alignItems="center"
              border="1px solid hsl(0, 0%, 80%)"
              borderRadius="4px"
              height="38px"
              minW="165px"
            >
              Selecione um Estado
            </Flex>
          ) : (
            <ReactSelect
              className="municipio select-fields large"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isSearchable={true}
              placeholder="Selecionar"
              noOptionsMessage={() => "Nenhum opção para selecionar"}
              value={citySelected}
              onChange={(selectedOption) => {
                setCitySelected(selectedOption);
                setSearch({
                  ...search,
                  city: search?.city
                    ? [...search.city, selectedOption]
                    : [selectedOption],
                });
                setTags({
                  ...tags,
                  city: tags?.city
                    ? [...tags.city, selectedOption]
                    : [selectedOption],
                });
              }}
              options={
                cities &&
                cities
                  .filter(
                    (item) =>
                      item?.unidade_federativa?.codIbgeUF === ufSelected?.value,
                  )
                  .map((item) => ({
                    value: item?.codIbgeMunicipio,
                    label: item?.nomeMunicipio,
                    uf: item?.unidade_federativa?.codIbgeUF,
                  }))
              }
            />
          )}
        </FormControl>

        <Button
          minWidth="125px"
          variant="outline"
          borderRadius="4px"
          marginTop={{ base: "32px" }}
          height="38px"
          onClick={() => {
            clearFilters();
            setSearch(null);
            setReset(true);
          }}
        >
          Limpar Filtros
        </Button>
      </SelectContent>

      <Box
        justifyContent={
          host.pathname.includes("/produtos") && isBroker
            ? "space-between"
            : "center"
        }
        mt="24px"
        display="flex"
        alignItems="center"
        flexWrap="wrap"
      >
        {host.pathname.includes("/produtos") && isBroker && (
          <Box w="179px" h="10px"></Box>
        )}

        {location?.pathname !== "/parametrizacao-de-produtos" && (
          <Stack
            borderWidth="1px"
            direction="row"
            borderColor="gray.200"
            p="4"
            flex="1"
            display="flex"
            gap="40px"
            alignItems="center"
            maxW="500px"
            rounded="md"
          >
            {value[0] === 0 && value[1] === 0 && isLoading ? (
              <Flex justifyContent="center" alignItems="center" width="100%">
                <CircularProgress
                  color={"brand.500"}
                  size={5}
                  isIndeterminate
                ></CircularProgress>
                <Text marginLeft="10px" opacity="0.8">
                  Carregando valores...
                </Text>
              </Flex>
            ) : (
              <>
                <Box fontSize="sm">
                  Preço:
                  {/* {counts?.minValue === counts?.maxValue ? " mínimo e máximo" : ""}: */}
                </Box>
                {/* {counts?.minValue === counts?.maxValue ? (
            <Text marginLeft="-35px">
              {numberFormat(counts?.minValue || 0)}
            </Text>
          ) : (
            <> */}
                <RangeSlider
                  aria-label={["min", "max"]}
                  zIndex={0}
                  value={value}
                  min={valueMin}
                  max={valueMax}
                  onChange={(val) => {
                    setValue(val);
                  }}
                >
                  <RangeSliderMark
                    value={valueMin}
                    ml="0"
                    fontSize="sm"
                    top="4"
                    color="gray.500"
                  >
                    {numberFormat(valueMin)}
                  </RangeSliderMark>
                  <RangeSliderMark
                    value={valueMax}
                    fontSize="sm"
                    ml="-62px"
                    top="4"
                    color="gray.500"
                    minW="16"
                  >
                    {numberFormat(valueMax)}
                  </RangeSliderMark>
                  <RangeSliderMark
                    value={valueMax}
                    top="-5"
                    fontSize="sm"
                    ml="-62px"
                    minW="16"
                    color="gray.800"
                  >
                    {numberFormat(value[1])}
                  </RangeSliderMark>
                  <RangeSliderMark
                    value={valueMin}
                    top="-5"
                    fontSize="sm"
                    color="gray.800"
                  >
                    {numberFormat(value[0])}
                  </RangeSliderMark>
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack bgColor="brand.500" />
                  </RangeSliderTrack>
                  <RangeSliderThumb borderColor="gray.200" index={0} />
                  <RangeSliderThumb borderColor="gray.200" index={1} />
                </RangeSlider>
                <Button
                  isDisabled={counts?.minValue === counts?.maxValue}
                  size="sm"
                  rounded="md"
                  px="4"
                  onClick={() => {
                    setSearch({ ...search, min: value[0], max: value[1] });
                    setValue(value);
                  }}
                >
                  Aplicar
                </Button>
              </>
            )}
          </Stack>
        )}
        {host.pathname.includes("/produtos") && isBroker && (
          <>
            <Box>
              <Text
                fontSize={{
                  md: "smaller",
                }}
              >
                Não encontrou o que procura?
              </Text>
              <Box display="flex" justifyContent="end">
                <button onClick={() => navigate("/solicitar-cotacao")}>
                  <Text color="brand.500">Clique aqui</Text>
                </button>
                <Box
                  backgroundColor="brand.50"
                  marginLeft="5px"
                  rounded="md"
                  width="50px"
                  height="25px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="brand.500">Beta</Text>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>

      <Box
        display="flex"
        gap="10px"
        flexWrap="wrap"
        width="100%"
        marginTop="20px"
      >
        {tags?.fornecedor.length > 0 &&
          tags?.fornecedor.map((item: IReactSelected) => (
            <HStack spacing={4} key={item.value}>
              <Tag size="lg" borderRadius="full">
                <TagLabel>{item.label}</TagLabel>
                <TagCloseButton
                  color="black"
                  onClick={() => {
                    deleteTagFornecedor(item?.value?.toString());
                  }}
                />
              </Tag>
            </HStack>
          ))}
        {tags?.uf?.length > 0 &&
          tags?.uf.map((item: IReactSelected) => (
            <HStack spacing={4} key={item.value}>
              <Tag size="lg" borderRadius="full" background="#BEE3F8">
                <TagLabel>{item.label}</TagLabel>
                <TagCloseButton
                  color="black"
                  onClick={() => {
                    deleteTagUf(item?.value?.toString());
                    setUfSelected(null);
                  }}
                />
              </Tag>
            </HStack>
          ))}

        {tags?.city?.length > 0 &&
          tags?.city.map((item: IReactSelected) => (
            <HStack spacing={4} key={item.value}>
              <Tag size="lg" borderRadius="full" background="#90CDF4">
                <TagLabel>{item.label}</TagLabel>
                <TagCloseButton
                  color="black"
                  onClick={() => {
                    deleteTagCity(item?.value?.toString());
                    setCitySelected(null);
                  }}
                />
              </Tag>
            </HStack>
          ))}
      </Box>
    </Box>
  );
};

export default ProductSearchFilter;
