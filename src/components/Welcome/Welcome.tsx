import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Img,
  Text,
  useTheme,
} from "@chakra-ui/react";
import { pixelToRem } from "../../utils";
import { Button, Input } from "../../pages/Register/styled";
import { useState } from "react";
import { Item, ItemGroup } from "./styled";
import useCompleteRegistration from "../../hooks/useCompleteRegistration";
import { IWelcomeFormRegister } from "./types";

const amountItems: Array<{ text: string; min: number; max: number }> = [
  {
    text: "1 a 29",
    min: 1,
    max: 29,
  },
  {
    text: "30 a 199",
    min: 30,
    max: 199,
  },
  {
    text: "200 a 999",
    min: 200,
    max: 999,
  },
  {
    text: "mais de 1000",
    min: 1000,
    max: 100000000,
  },
];

const formDefault = {
  whoIndicated: "",
  minQuantityCollaborators: null,
  maxQuantityCollaborators: null,
};

const Welcome = () => {
  const theme = useTheme();
  const { updatedCompaniesAssociated } = useCompleteRegistration();
  const { mutate, isLoading } = updatedCompaniesAssociated();
  const [form, setForm] = useState<IWelcomeFormRegister>(formDefault);
  const [selectedItem, setSelectedItem] = useState<number>();
  const [errorWhoIndicated, setErrorWhoIndicated] = useState(false);

  const handleWhoIndicated = (value: string) => {
    if (value.trim().length > 0 && value.trim().length < 3) {
      setErrorWhoIndicated(true);
    } else {
      setErrorWhoIndicated(false);
    }
    setForm({
      ...form,
      whoIndicated: value,
    });
  };

  const toggleItemClass = ({ max, min }: { min: number; max: number }) => {
    setForm({
      ...form,
      minQuantityCollaborators: min,
      maxQuantityCollaborators: max,
    });
  };

  const handleSubmit = () => {
    mutate(form);
  };

  return (
    <Flex
      padding="10px"
      textAlign="center"
      flexDir="column"
      maxW="556px"
      margin="0 auto"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
        marginTop="50px"
      >
        <Img
          src={theme.images.iaraWelcome}
          alt={theme.content.project}
          position="absolute"
          bottom="1px"
          borderBottomRightRadius="44%"
          borderBottomLeftRadius="44%"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="163"
          height="163"
          viewBox="0 0 163 163"
          fill="none"
        >
          <circle
            cx="81.5"
            cy="81.5"
            r="81.5"
            fill="#333333"
            fillOpacity="0.08"
          />
        </svg>
      </Box>
      <Text
        fontSize={pixelToRem(20)}
        fontWeight="500"
        margin="25px 0"
        fontFamily="Poppins, Roboto, sans-serif"
      >
        Boas-vindas à sua Conta Empresarial.
      </Text>
      <Text
        fontSize={pixelToRem(14)}
        color="#909090"
        margin="0 0 30px"
        lineHeight="150%"
        fontFamily="Poppins, Roboto, sans-serif"
      >
        Antes de começar a navegar pela plataforma, precisamos de algumas
        informações e autorizações para personalizar a sua experiência.
      </Text>

      <FormControl isInvalid={errorWhoIndicated} marginBottom="15px">
        <FormLabel color="#13130F">
          Você foi indicado por alguma empresa?
        </FormLabel>
        <Input
          name="whoIndicated"
          placeholder="Digite aqui o nome da empresa, corretora ou fornecedor"
          value={form.whoIndicated}
          onChange={(e) => handleWhoIndicated(e.target.value)}
          maxLength={70}
        />
        <FormErrorMessage>
          O nome deve conter no mínimo 3 e no máximo 70 caracteres
        </FormErrorMessage>
      </FormControl>

      <FormControl marginBottom="40px" isRequired>
        <FormLabel color="#13130F">
          Quantas pessoas fazem parte da sua empresa
        </FormLabel>
        <ItemGroup flexDirection="unset" flexWrap="wrap">
          {amountItems.map((item, index) => (
            <Item
              key={item.text}
              className={selectedItem === index ? "selected" : ""}
              onClick={() => {
                setSelectedItem(index);
                toggleItemClass({
                  min: item.min,
                  max: item.max,
                });
              }}
              width="max-content"
              padding="10px 12px"
            >
              {item.text}
            </Item>
          ))}
        </ItemGroup>
      </FormControl>

      <Button
        onClick={handleSubmit}
        isDisabled={
          errorWhoIndicated ||
          !form?.minQuantityCollaborators ||
          !form?.maxQuantityCollaborators
        }
        isLoading={isLoading}
      >
        Confirmar
      </Button>
    </Flex>
  );
};

export default Welcome;
