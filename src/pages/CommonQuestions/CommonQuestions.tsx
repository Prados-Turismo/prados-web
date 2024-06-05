/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useTheme,
} from "@chakra-ui/react";
import Dashboard from "../../Layouts/Dashboard";
import Menu from "../../components/Menu";
import { genericSort, pixelToRem } from "../../utils";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import CardQuestion from "./components/CardQuestion/CardQuestion";
import { IListFiltered, Ifilter, Question, QuestionGroup } from "./types";
import { useFaqs } from "../../hooks/useFaqs";
import purify from "dompurify";
import Showdown from "showdown";
import Loading from "../../components/Loading";
import { useGlobal } from "../../contexts/UserContext";
import { TOPIC_FROM_TO } from "../../utils/enumFormat";
import ReactSelect from "react-select";

const CommonQuestions = () => {
  const theme = useTheme();
  const { role } = useGlobal();
  const { getFaqs } = useFaqs();
  const { data, isLoading } = getFaqs({ userType: role?.name || "" });
  const [filter, setFilter] = useState<Ifilter | null>();
  const converter = new Showdown.Converter();

  const changeValue = (event: any) => {
    setFilter((prevState) => ({
      ...prevState,
      topic: event?.value,
    }));
  };

  const changeInput = (event: any) => {
    setFilter((prevState) => ({
      ...prevState,
      question: event?.target?.value,
    }));
  };

  const groupedQuestions = data
    ?.sort((a, b) =>
      genericSort(a, b, {
        property: "topic",
      }),
    )
    ?.sort((a, b) =>
      genericSort(a, b, {
        property: "priority",
      }),
    )
    ?.reduce((groups: QuestionGroup, question: Question) => {
      const groupName = question.topic;
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      const textFormat = purify.sanitize(converter.makeHtml(question.answer));
      const formattedQuestion = { ...question, Resposta: textFormat };
      groups[groupName].push(formattedQuestion);
      return groups;
    }, {});

  const listTopics = data?.reduce(
    (acc, current) => {
      if (!acc.includes(current.topic)) {
        acc.push(current.topic);
      }
      return acc;
    },
    ["Todos"] as string[],
  );

  const listVariation = Object?.entries(groupedQuestions || [])
    ?.map(([topic, question]) => {
      const listFiltered: IListFiltered = {};

      const FILTERS = question.filter((item: Question) => {
        const filterByQuestion = filter?.question
          ? item?.question
              ?.toUpperCase()
              .includes(filter?.question?.toUpperCase())
          : item?.question;
        const filterByResponse = filter?.question
          ? item?.answer.toUpperCase().includes(filter?.question?.toUpperCase())
          : item?.answer;
        return filterByQuestion || filterByResponse;
      });

      if (!filter?.topic || filter?.topic === "Todos") {
        if (FILTERS.length !== 0) {
          listFiltered[topic] = FILTERS;
        }
      }

      if (filter?.topic === topic) {
        listFiltered[filter.topic] = FILTERS;
      }

      return Object.keys(listFiltered).length === 0 ? null : listFiltered;
    })
    .filter((el) => el);

  useEffect(() => {
    document.title = `${theme.content.project} - Central de ajuda`;
  }, [theme]);

  return (
    <Dashboard menu={<Menu />}>
      <Stack mt="52px" px={8} mb={10}>
        <Text
          fontWeight={500}
          fontSize={pixelToRem(24)}
          lineHeight="36px"
          mb={1}
        >
          Central de ajuda
        </Text>
        <Stack direction="row" mt="42px !important" gap={4} flexWrap="wrap">
          <InputGroup maxWidth={700}>
            <InputLeftElement pointerEvents="none" sx={{ height: "39px" }}>
              <CiSearch size={20} />
            </InputLeftElement>
            <Input
              paddingLeft="35px"
              type="text"
              placeholder="Digite aqui sua dúvida"
              name="question"
              onChange={changeInput}
              sx={{ borderRadius: "5px", height: "39px" }}
              maxLength={256}
            />
          </InputGroup>
          <Stack
            maxWidth={350}
            width="100%"
            marginInlineStart="unset !important"
          >
            <ReactSelect
              name="topic"
              className="select-fields large"
              classNamePrefix="select"
              onChange={changeValue}
              defaultValue={{
                label: "Todos",
                value: "Todos",
              }}
              isLoading={isLoading}
              options={listTopics?.map((item) => ({
                label: TOPIC_FROM_TO[item],
                value: item,
              }))}
            ></ReactSelect>
          </Stack>
        </Stack>
        {isLoading ? (
          <Box paddingTop="50px">
            <Loading />
          </Box>
        ) : (
          <Center flexDir="column">
            {listVariation.length > 0 ? (
              listVariation?.map(
                (listFiltered) =>
                  Object?.entries(listFiltered || [])?.map(
                    ([topic, questions]) => (
                      <Stack mt={5} key={topic} maxW="743px" w="100%">
                        <Text
                          fontWeight={600}
                          fontSize={pixelToRem(16)}
                          lineHeight="16px"
                          mb="24px"
                          mt="40px"
                        >
                          {TOPIC_FROM_TO[topic]}
                        </Text>
                        <Stack gap="10px">
                          {(questions as Question[])?.map((question) => (
                            <CardQuestion
                              title={question?.question}
                              description={question?.answer}
                              key={question?.id}
                            />
                          ))}
                        </Stack>
                      </Stack>
                    ),
                  ),
              )
            ) : (
              <Alert status="info" maxW="max-content" mt="40px">
                <AlertIcon />
                Não encontrei o que você procura, tente pesquisar por tópico.
              </Alert>
            )}
          </Center>
        )}
      </Stack>
    </Dashboard>
  );
};

export default CommonQuestions;
