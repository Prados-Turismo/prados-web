import { Button, Select } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiCheckFill, RiCloseFill, RiPencilFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { z } from "zod";
import Loading from "../../../../../components/Loading";
import usePartner from "../../../../../hooks/usePartner";
import { cnpjMask, onlyNumberMask, phoneMask } from "../../../../../utils";
import { optionsPreferenceContact } from "../../../../../utils/optionsPreferenceContact";
import { handleSubmitEditSchema } from "../../../utils/handleSubmitRegisterSchema";
import { Content, Form, FormControl, FormLabel, Input } from "./styled";

type IhandleSubmitRegister = z.infer<typeof handleSubmitEditSchema>;

const PartnerDetailsForm = () => {
  const { id } = useParams();
  const { getPartnerDetails, updatePartnership } = usePartner();
  const [edit, setEdit] = useState(false);
  const { data, isLoading } = getPartnerDetails({
    companyId: id || "",
  });

  const { mutate: mutateUpdate, isLoading: isUpdateLoading } =
    updatePartnership(id || "");

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitEditSchema),
  });

  const handleSubmitEdit = ({
    name,
    phone,
    email,
    preference,
  }: IhandleSubmitRegister) => {
    mutateUpdate({
      name,
      phone: onlyNumberMask(phone),
      email,
      preference,
      id: data?.companyContact?.id || "",
    });
    setEdit(false);
  };

  useEffect(() => {
    if (data) {
      setValue("name", data?.companyContact?.name);
      setValue("phone", phoneMask(data?.companyContact?.phone));
      setValue("email", data?.companyContact?.email);
      setValue("preference", data?.companyContact?.preference);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      {isLoading && <Loading />}

      {!isLoading && data && (
        <>
          <Content>
            <Form onSubmit={handleSubmit(handleSubmitEdit)}>
              <div className="formTop">
                <div className="title">Dados do prestador de serviço</div>

                <div className="buttonBox">
                  {edit && (
                    <Button
                      isLoading={isUpdateLoading}
                      leftIcon={<RiCheckFill />}
                      type="submit"
                    >
                      Salvar
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      setEdit((old) => !old);
                      reset({
                        name: data?.companyContact?.name,
                        phone: phoneMask(data?.companyContact?.phone),
                        email: data?.companyContact?.email,
                        preference: data?.companyContact?.preference,
                      });
                    }}
                    variant="outline"
                    leftIcon={edit ? <RiCloseFill /> : <RiPencilFill />}
                  >
                    {edit ? "Cancelar" : "Editar"}
                  </Button>
                </div>
              </div>

              <div className="fieldsWrap">
                <div className="field">
                  <FormControl>
                    <FormLabel>Nome da empresa</FormLabel>
                    <div className="fieldInput">
                      <Input
                        isReadOnly
                        defaultValue={data?.corporateName}
                        placeholder="Digite o nome da empresa"
                        type="text"
                      />
                    </div>
                  </FormControl>
                </div>

                <div className="field">
                  <FormControl>
                    <FormLabel>CNPJ</FormLabel>
                    <div className="fieldInput">
                      <Input
                        isReadOnly
                        defaultValue={cnpjMask(data?.cnpj || "")}
                        type="text"
                      />
                    </div>
                  </FormControl>
                </div>

                <div className="field">
                  <FormControl>
                    <FormLabel>Nome do responsável</FormLabel>
                    <div className="fieldInput">
                      <Input
                        isReadOnly={!edit}
                        defaultValue={data?.companyContact?.name}
                        placeholder="Digite o nome do responsável"
                        type="text"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="error">{errors.name.message}</p>
                      )}
                    </div>
                  </FormControl>
                </div>

                <div className="field">
                  <FormControl>
                    <FormLabel>Telefone para contato</FormLabel>
                    <div className="fieldInput">
                      <Input
                        isReadOnly={!edit}
                        placeholder="Digite o telefone para contato"
                        defaultValue={phoneMask(data?.companyContact?.phone)}
                        type="text"
                        onInput={(event: FormEvent<HTMLInputElement>) => {
                          event.currentTarget.value = phoneMask(
                            event.currentTarget.value,
                          );
                        }}
                        maxLength={15}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="error">{errors.phone.message}</p>
                      )}
                    </div>
                  </FormControl>
                </div>

                <div className="field">
                  <FormControl>
                    <FormLabel>E-mail</FormLabel>
                    <div className="fieldInput">
                      <Input
                        isReadOnly={!edit}
                        defaultValue={data?.companyContact?.email}
                        placeholder="Digite o e-mail"
                        type="email"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="error">{errors.email.message}</p>
                      )}
                    </div>
                  </FormControl>
                </div>

                <div className="field">
                  <FormControl>
                    <FormLabel>Preferência de contato</FormLabel>

                    <div className="fieldInput">
                      <Select
                        isDisabled={!edit}
                        defaultValue={
                          optionsPreferenceContact.filter(
                            (op) =>
                              op.label === data?.companyContact?.preference,
                          )[0]?.value
                        }
                        {...register("preference")}
                      >
                        {optionsPreferenceContact.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                      {errors.preference && (
                        <p className="error">{errors.preference.message}</p>
                      )}
                    </div>
                  </FormControl>
                </div>
              </div>
            </Form>
          </Content>
        </>
      )}
    </>
  );
};

export default PartnerDetailsForm;
