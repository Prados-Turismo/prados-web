import { Box } from "@chakra-ui/react";
import ReactSelect from "react-select";
import { IHolderAndDependentsSelect } from "./types";
import useCollaborator from "../../../../hooks/useCollaborator";
import { capitalize } from "../../../../utils/capitalize";

const HolderAndDependentsSelect = ({
  holder,
  setUserSelected,
  userSelected,
}: IHolderAndDependentsSelect) => {
  const { getDependents } = useCollaborator();
  const { data, isLoading } = getDependents({
    beneficiaryId: holder?.id,
  });

  return (
    <Box
      width="100%"
      maxWidth="450px"
      padding="0 20px"
      display="flex"
      flexDirection="column"
      gap="10px"
    >
      <label>
        <b>Titular/Dependentes</b>
      </label>
      <ReactSelect
        className="select-fields"
        isLoading={isLoading}
        classNamePrefix="select"
        closeMenuOnSelect={true}
        isSearchable={true}
        placeholder="Selecione"
        noOptionsMessage={() => "Nenhum titular / dependente"}
        value={userSelected}
        onChange={setUserSelected}
        options={[
          {
            label: "Titular",
            options: [
              {
                label: capitalize(holder?.person?.name),
                value: holder?.id,
                data: holder,
              },
            ],
          },
          {
            label: "Dependentes",
            options: data.map((item) => ({
              label: capitalize(item?.person?.name),
              value: item?.id,
              data: item,
            })),
          },
        ]}
      />
    </Box>
  );
};

export default HolderAndDependentsSelect;
