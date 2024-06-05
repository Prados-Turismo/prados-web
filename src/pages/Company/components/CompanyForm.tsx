import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Heading, SimpleGrid, Box } from "@chakra-ui/react";

import FormField from "./FormField";
import FormRow from "./FormRow";

import { useGlobal } from "../../../contexts/UserContext";
import usePartner from "../../../hooks/usePartner";
import Loading from "../../../components/Loading";
import { cepMask, cnpjMask, phoneMask } from "../../../utils";

interface FormValues {
  corporateName: string;
  neighborhood: string;
  cnpj: string;
  city: string;
  irsSituation: string;
  uf: string;
  irsSituationDate: string;
  publicPlace: string;
  cnae_principal: string;
  number: string;
  cep: string;
  complement: string;
  irsEmail: string;
  name: string;
  phone: string;
  email: string;
  preference: string;
}

export default function CompanyForm() {
  const { company } = useGlobal();
  const { getPartnerDetails } = usePartner();
  const { data, isLoading } = getPartnerDetails({
    companyId: company!.externalCompanyId,
  });

  const form = useForm<FormValues>({
    defaultValues: {
      corporateName: "",
      neighborhood: "",
      cnpj: "",
      city: "",
      uf: "",
      number: "",
      complement: "",
      irsEmail: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = () => {
    return null;
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    form.reset({
      corporateName: data?.corporateName,
      neighborhood: data?.companyAddress[0]?.neighborhood,
      cnpj: data?.cnpj,
      city: data?.companyAddress[0]?.city,
      uf: data?.companyAddress[0]?.uf,
      number: data?.companyAddress[0]?.number,
      complement: data?.companyAddress[0]?.complement,
      irsEmail: data?.irsEmail,
      phone: data?.companyContact?.phone,
      email: data?.companyContact?.email,
      irsSituation: data?.irsSituation,
      irsSituationDate: data?.irsSituationDate,
      publicPlace: data?.companyAddress[0]?.publicPlace,
      cnae_principal: data?.cnae[0]?.code,
      cep: data?.companyAddress[0]?.cep,
      name: data?.companyContact?.name,
      preference: data?.companyContact?.preference,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return isLoading ? (
    <Box paddingTop="40px">
      <Loading />
    </Box>
  ) : (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <SimpleGrid columns={1} gap={8}>
        <Box>
          <Heading size="sm" mb={4}>
            Dados da receita federal
          </Heading>
          <SimpleGrid gap={{ base: "4" }}>
            <FormRow>
              <Controller
                name="corporateName"
                control={form.control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <>
                    <FormField
                      name={name}
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      label="Razão Social"
                      isDisabled
                    />
                  </>
                )}
              />

              <Controller
                name="neighborhood"
                control={form.control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <FormField
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    label="Bairro"
                    isDisabled
                  />
                )}
              />
            </FormRow>
            <FormRow>
              <Controller
                name="cnpj"
                control={form.control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <FormField
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={cnpjMask(value)}
                    label="CNPJ"
                    isDisabled
                  />
                )}
              />
              <Controller
                name="city"
                control={form.control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <FormField
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    label="Município"
                    isDisabled
                  />
                )}
              />
            </FormRow>
            <FormRow>
              <Controller
                name="irsSituation"
                control={form.control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <FormField
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    label="Situação cadastral"
                    isDisabled
                  />
                )}
              />

              <Controller
                name="uf"
                control={form.control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <FormField
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    label="Estado"
                    isDisabled
                  />
                )}
              />
            </FormRow>
            <FormRow>
              <Controller
                name="irsSituationDate"
                control={form.control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <FormField
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    label="Data Situação cadastral"
                    isDisabled
                  />
                )}
              />
              <Controller
                name="publicPlace"
                control={form.control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <FormField
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    label="Logradouro"
                    isDisabled
                  />
                )}
              />
            </FormRow>
            <FormRow>
              <Controller
                name="cnae_principal"
                control={form.control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <FormField
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    label="CNAE Principal"
                    isDisabled
                  />
                )}
              />
              <Controller
                name="number"
                control={form.control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <FormField
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    label="Número"
                    isDisabled
                  />
                )}
              />
            </FormRow>
            <FormRow>
              <Controller
                name="cep"
                control={form.control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <FormField
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value ? cepMask(value) : undefined}
                    label="CEP"
                    isDisabled
                  />
                )}
              />
              <Controller
                name="complement"
                control={form.control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <FormField
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    label="Complemento"
                    isDisabled
                  />
                )}
              />
            </FormRow>
            <FormRow>
              <Controller
                name="irsEmail"
                control={form.control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <FormField
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    label="Email RFB"
                    isDisabled
                  />
                )}
              />
            </FormRow>
          </SimpleGrid>
        </Box>
        <Box>
          <Heading size="sm" mb="4">
            Dados para Contato
          </Heading>
          <SimpleGrid gap={{ base: "4" }}>
            <FormRow>
              <Controller
                name="name"
                control={form.control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <FormField
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    label="Nome para contato"
                    isDisabled
                  />
                )}
              />
              <Controller
                name="phone"
                control={form.control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <FormField
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value ? phoneMask(value) : undefined}
                    label="Telefone"
                    isDisabled
                  />
                )}
              />
            </FormRow>
            <FormRow>
              <Controller
                name="email"
                control={form.control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <FormField
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    label="Email"
                    isDisabled
                  />
                )}
              />
              <Controller
                name="preference"
                control={form.control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <FormField
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    label="Preferência de Contato"
                    isDisabled
                  />
                )}
              />
            </FormRow>
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    </form>
  );
}
