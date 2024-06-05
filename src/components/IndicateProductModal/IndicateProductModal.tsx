import { Input, Button, Box, Textarea, Text, Center } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { MdOutlineCheck } from "react-icons/md";

import Asterisk from "../Asterisk";

import {
  minContent,
  maxContent,
  fieldRequired,
} from "../../utils/messagesError";

import { FieldWrap } from "./styled";
import { isUrlValid } from "../../utils/isUrlValid";
import useNeedHelp from "../../hooks/useNeedHelp";
import { useGlobal } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { pixelToRem } from "../../utils";
import usePartner from "../../hooks/usePartner";

const handleSubmitRegisterSchema = z.object({
  name: z
    .string()
    .min(7, {
      message: `O nome do produto ${minContent(7)}`,
    })
    .max(256, {
      message: `O nome do produto ${maxContent(256)}`,
    })
    .nonempty({
      message: fieldRequired("nome"),
    }),
  fornecedor: z
    .string()
    .max(256, {
      message: `O nome do fornecedor ${maxContent(256)}`,
    })
    .refine(
      (value) => {
        if (value.trim() === "" || value.trim().length > 6) {
          return true; // Se estiver vazio, não há erro
        }
        return false;
      },
      {
        message: `O nome do fornecedor ${minContent(7)}`,
      },
    ),

  descricao: z
    .string()
    .max(500, {
      message: `A descrição ${maxContent(500)}`,
    })
    .refine(
      (value) => {
        if (value.trim() === "" || value.trim().length > 6) {
          return true; // Se estiver vazio, não há erro
        }
        return false;
      },
      {
        message: `A descrição ${minContent(7)}`,
      },
    ),

  link: z
    .string()
    .max(256, {
      message: `O link ${maxContent(256)}`,
    })
    .refine(
      (value) => {
        if (value.trim() === "") {
          return true; // Se estiver vazio, não há erro
        }
        return isUrlValid(value);
      },
      {
        message: "O link não está em um formato de URL válido",
      },
    ),
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

const IndicateProductModal = () => {
  const { role, user } = useGlobal();
  const { handleSubmitIndicatProduct, getTopic } = useNeedHelp();
  const { getPartnerDetails } = usePartner();

  const { submitRequest, isLoadingSubmit, isSuccess } =
    handleSubmitIndicatProduct();
  const { company } = useGlobal();
  const { isLoading: isLoadingTopics, data: topics } = getTopic(role!.id);

  const { data: companyData } = getPartnerDetails({
    companyId: company!.externalCompanyId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
  });

  const handleSubmitRegister = (data: IhandleSubmitRegister) => {
    const msgConcat = `<strong>Nome Produto/Serviço: </strong>${data?.name}<br />
    <strong>Nome do Fornecedor: </strong>${data?.fornecedor || "-"}<br />
    <strong>Descrição: </strong>${data?.descricao || "-"}<br />
    <strong>Link do Fornecedor: </strong>${data?.link || "-"}<br />`;
    const payload = {
      data: {
        callReasonId: topics?.filter(
          (el) =>
            el?.name &&
            ["Indicacao de Produto ou Servico", "Indicação de Produto ou Serviço", "indicacao de produto ou servico"].some(
              (keyword) => el.name.includes(keyword),
            ),
        )[0]?.id,
        companyId: company?.externalCompanyId ?? "",
        companyName: company?.name ?? "",
        hubId: companyData?.companyAssociated.hub.id || "",
        hubName: companyData?.companyAssociated.hub.name || "",
        message: msgConcat,
        requestingUser: user?.email ?? "",
        requestingUserName: user?.username ?? "",
        isAdmin: false,
      },
    };
    submitRequest(payload);
  };

  return (
    <>
      {isSuccess ? (
        <Center flexDir="column" w="100%" gap="20px">
          <Box
            w="156px"
            h="156px"
            bg="#F5F5FA80"
            borderRadius="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="brand.500"
          >
            <MdOutlineCheck size={50} />
          </Box>
          <Text fontSize={pixelToRem(20)} fontWeight="600">
            Solicitação enviada com sucesso.
          </Text>
          <Text fontSize={pixelToRem(17)} textAlign="center">
            Em breve responderemos sua solicitação. Você pode acompanhar
            <br />
            através da tela de suporte. Para acompanhar{" "}
            <Link to="/canal-de-atendimento?status=A">
              <Box
                display="unset"
                color="brand.500"
                fontWeight="bold"
                letterSpacing="0.5px"
                _hover={{ color: "brand.300" }}
              >
                clique aqui
              </Box>
            </Link>
          </Text>
        </Center>
      ) : (
        <form
          onSubmit={handleSubmit(handleSubmitRegister)}
          style={{ width: "100%" }}
        >
          <Box display="flex" flexDirection="column" gap="25px" padding="30px">
            <span>
              (<Asterisk />) indica os campos obrigatórios
            </span>

            <FieldWrap>
              <span>
                Nome do produto/serviço <Asterisk />
              </span>

              <Input
                placeholder="Produto"
                type="text"
                {...register("name")}
                maxLength={120}
              />
              {errors.name && <p className="error">{errors.name.message}</p>}
            </FieldWrap>

            <FieldWrap>
              <span>Nome do fornecedor</span>

              <Input
                placeholder="Fornecedor"
                type="text"
                {...register("fornecedor")}
                maxLength={120}
              />
              {errors.fornecedor && (
                <p className="error">{errors.fornecedor.message}</p>
              )}
            </FieldWrap>

            <FieldWrap>
              <span>Descrição</span>

              <Textarea
                placeholder="Descrição"
                {...register("descricao")}
                height="150px"
                maxLength={500}
              />
              {errors.descricao && (
                <p className="error">{errors.descricao.message}</p>
              )}
            </FieldWrap>

            <FieldWrap>
              <span>Link (página do fornecedor)</span>

              <Input
                placeholder="Ex: http://"
                type="text"
                {...register("link")}
              />
              {errors.link && <p className="error">{errors.link.message}</p>}
            </FieldWrap>

            <span style={{ textAlign: "end" }}>
              <Button
                isLoading={isLoadingSubmit}
                isDisabled={isLoadingTopics}
                w="140px"
                borderRadius="4px"
                loadingText="enviando..."
                type="submit"
              >
                Enviar
              </Button>
            </span>
          </Box>
        </form>
      )}
    </>
  );
};

export default IndicateProductModal;
