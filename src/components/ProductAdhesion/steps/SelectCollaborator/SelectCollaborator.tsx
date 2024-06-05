import {
  Alert,
  AlertIcon,
  Box,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import { useGlobal } from "../../../../contexts/UserContext";
import useCollaborator from "../../../../hooks/useCollaborator";
import { capitalize } from "../../../../utils/capitalize";
import Loading from "../../../Loading";
import LoadingTextRandom from "../../../LoadingTextRandom";
import { ISelectCollaborator } from "./types";

const SelectCollaborator = ({ setHolderId, setIndex }: ISelectCollaborator) => {
  const animatedComponents = makeAnimated();
  const { company } = useGlobal();
  const { getCollaborators } = useCollaborator();

  const { data: dataCollaborators, isLoading: isLoadingCollaborators } =
    getCollaborators({
      size: 500,
      page: 1,
      companyId: company!.externalCompanyId,
      beneficiaryStatus: "A",
    });

  return isLoadingCollaborators ? (
    <Box>
      <Loading />
      <LoadingTextRandom texts={["Carregando lista de pessoas"]} />
    </Box>
  ) : (
    <>
      {dataCollaborators.length < 1 ? (
        <Alert status="info" fontSize="1.2rem">
          <AlertIcon />
          Não existem titulares aptos para adesão do produto selecionado
          conforme as regras de adesão!
        </Alert>
      ) : (
        <FormControl width="100%" maxWidth="500px" margin="24px auto">
          <FormLabel htmlFor="selectedEntidade">Titulares:</FormLabel>
          <ReactSelect
            className="select-fields large"
            classNamePrefix="select"
            closeMenuOnSelect={true}
            isSearchable={true}
            placeholder="Selecione um titular para adesão"
            noOptionsMessage={() => "Não há titulares para selecionar"}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) => {
              if (e?.value) {
                setHolderId(e?.value);
                setIndex(1);
              }
            }}
            options={dataCollaborators.map((colab) => ({
              value: colab?.id,
              label: capitalize(colab?.person?.name),
            }))}
            components={animatedComponents}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
              },
            })}
          />
        </FormControl>
      )}
    </>
  );
};

export default SelectCollaborator;
