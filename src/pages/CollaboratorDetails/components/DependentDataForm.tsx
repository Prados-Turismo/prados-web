/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useRef, useState } from "react";
import ReactSelect from "react-select";
import { Button, Input } from "@chakra-ui/react";

// Icons
import { HiPencil, HiCheck } from "react-icons/hi";
import { MdClose } from "react-icons/md";

// Hooks and utils
import useCollaborator from "../../../hooks/useCollaborator";

import { cpfHidden, cpfMask, phoneMask, dateFormat } from "../../../utils";

// Styled
import { HeaderInner, GroupButtons, GroupFields, Field } from "../pages/styled";
import { IDataDependents } from "../../../models/collaborator.model";

import {
  BENEFICIARY_KINSHIP,
  PERSON_MARITAL_STATUS,
  SEX_IDENTITY,
} from "../../../utils/enumFormat";
import { ISelect } from "../../../models/generics.model";
import { capitalize } from "../../../utils/capitalize";

interface IDependentDataForm {
  dependent: IDataDependents;
}

export const DependentDataForm = ({ dependent }: IDependentDataForm) => {
  const { updateDependent } = useCollaborator();
  const { isLoading, mutate } = updateDependent();
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [sex, setSex] = useState<ISelect>();
  const [civilState, setCivilState] = useState<ISelect>();
  const [kinShip, setKinShip] = useState<ISelect>();

  const name = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const motherName = useRef<HTMLInputElement>(null);

  const handleSubmitRegister = (event: FormEvent) => {
    event.preventDefault();

    const data = {
      id: dependent?.id,
      idPessoaFisica: dependent?.person?.id,
      nomePessoaFisica: name.current?.value || "",
      celular: phone.current?.value || "",
      sexo: sex?.value || "",
      estadoCivil: civilState?.value || "",
      nomeMae: motherName.current?.value || "",
      parentesco: kinShip?.value || "",
    };

    mutate(data);
    setIsDisable(true);
  };

  useEffect(() => {
    if (name.current && phone.current && motherName.current) {
      name.current.value = capitalize(dependent?.person?.name);
      motherName.current.value = dependent?.person?.nameMother;
      phone.current.value =
        dependent?.person?.phoneNumber &&
        phoneMask(dependent?.person?.phoneNumber);
      setSex({
        label: SEX_IDENTITY[dependent?.person?.sexIdentity] || "",
        value: dependent?.person?.sexIdentity,
      });
      setCivilState({
        label:
          PERSON_MARITAL_STATUS[dependent?.person?.personMaritalStatus] || "",
        value: dependent?.person?.personMaritalStatus,
      });
      setKinShip({
        label: BENEFICIARY_KINSHIP[dependent?.beneficiaryKinship] || "",
        value: dependent?.beneficiaryKinship,
      });
    }
  }, [dependent]);

  useEffect(() => {
    setIsDisable(true);
  }, [dependent]);

  return (
    <>
      <form onSubmit={handleSubmitRegister}>
        <HeaderInner>
          <div className="title">
            {isDisable ? (
              <h3>Dados do dependente</h3>
            ) : (
              <>
                <h3>Editar</h3>
                <span className="required">
                  (*) indica os campos obrigatórios
                </span>
              </>
            )}
          </div>

          <GroupButtons>
            {isDisable ? (
              <>
                <></>
                <Button
                  variant="outline"
                  leftIcon={<HiPencil />}
                  onClick={() => {
                    setIsDisable(false);
                  }}
                >
                  Editar
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  variant="outline"
                  leftIcon={<HiCheck />}
                  isLoading={isLoading}
                >
                  Salvar
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDisable(true);
                  }}
                >
                  <MdClose />
                </Button>
              </>
            )}
          </GroupButtons>
        </HeaderInner>

        <GroupFields>
          <div className="left">
            <Field>
              <label>
                Nome <span className="required">&nbsp;*</span>
              </label>

              <div className="inputWrap">
                <Input
                  ref={name}
                  type="text"
                  isDisabled={isDisable || isLoading}
                  required
                  id="name"
                  name="name"
                />
              </div>
            </Field>

            <Field>
              <label htmlFor="cpf">CPF</label>

              <div className="inputWrap">
                <Input
                  type="text"
                  value={cpfHidden(cpfMask(dependent?.person?.cpf))}
                  isDisabled={true}
                  id="cpf"
                  name="cpf"
                />
              </div>
            </Field>

            <Field>
              <label htmlFor="born">Data de nascimento</label>

              <div className="inputWrap">
                <Input
                  type="text"
                  value={dateFormat(new Date(dependent?.person?.bornDate))}
                  isDisabled={true}
                  id="bornDate"
                  name="bornDate"
                />
              </div>
            </Field>

            <Field>
              <label htmlFor="email">E-mail</label>
              <div className="inputWrap">
                <Input
                  type="email"
                  value={dependent?.person?.email}
                  isDisabled={true}
                  required
                  id="email"
                  name="email"
                />
              </div>
            </Field>

            <Field>
              <label htmlFor="phone">
                Telefone<span className="required">&nbsp;*</span>
              </label>
              <div className="inputWrap">
                <Input
                  ref={phone}
                  type="text"
                  isDisabled={isDisable || isLoading}
                  required
                  onInput={(event: FormEvent<HTMLInputElement>) => {
                    event.currentTarget.value = phoneMask(
                      event.currentTarget.value,
                    );
                  }}
                  id="phone"
                  name="phone"
                />
              </div>
            </Field>
          </div>

          <div className="right">
            <Field>
              <label htmlFor="sex">
                Sexo<span className="required">&nbsp;*</span>
              </label>
              <ReactSelect
                className="select-fields large"
                classNamePrefix="select"
                closeMenuOnSelect={true}
                isSearchable={true}
                placeholder="Selecione o sexo"
                options={Object.keys(SEX_IDENTITY).map((key) => ({
                  value: key,
                  label: SEX_IDENTITY[key],
                }))}
                onChange={(e: any) => setSex(e)}
                value={sex}
                isDisabled={isDisable || isLoading}
                required
                id="sexIdentity"
                name="sexIdentity"
              />
            </Field>
            <Field>
              <label htmlFor="civilState">
                Estado civil<span className="required">&nbsp;*</span>
              </label>
              <ReactSelect
                className="select-fields large"
                classNamePrefix="select"
                closeMenuOnSelect={true}
                isSearchable={true}
                placeholder="Selecione o estado civil"
                options={Object.keys(PERSON_MARITAL_STATUS).map((key) => ({
                  value: key,
                  label: PERSON_MARITAL_STATUS[key],
                }))}
                onChange={(e: any) => setCivilState(e)}
                value={civilState}
                isDisabled={isDisable || isLoading}
                required
                id="civilState"
                name="civilState"
              />
            </Field>
            <Field>
              <label htmlFor="motherName">
                Nome da mãe<span className="required">&nbsp;*</span>
              </label>

              <div className="inputWrap">
                <Input
                  ref={motherName}
                  type="text"
                  isDisabled={isDisable || isLoading}
                  required
                  id="motherName"
                  name="motherName"
                />
              </div>
            </Field>

            <Field>
              <label htmlFor="kinShip">
                Grau de parentesco
                <span className="required">&nbsp;*</span>
              </label>
              <ReactSelect
                className="select-fields large"
                classNamePrefix="select"
                closeMenuOnSelect={true}
                isSearchable={true}
                placeholder="Selecione o grau de parentesco"
                options={Object.keys(BENEFICIARY_KINSHIP).map((key) => ({
                  value: key,
                  label: BENEFICIARY_KINSHIP[key],
                }))}
                onChange={(e: any) => setKinShip(e)}
                value={kinShip}
                isDisabled={isDisable || isLoading}
                required
                id="kinship"
                name="kinship"
              />
            </Field>
          </div>
        </GroupFields>
      </form>
    </>
  );
};
