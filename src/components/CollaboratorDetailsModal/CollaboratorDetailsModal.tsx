// Components and Util
import { cpfMask, dateFormat, phoneMask } from "../../utils";
import { capitalize } from "../../utils/capitalize";
import SimpleModal from "../SimpleModal";

// Styles
import { ModalContent } from "./styled";

// Types
import { ICollaboratorDetailsModalModal } from "./types";

const CollaboratorDetailsModal = ({
  collaborator,
  showModal,
  setShowModal,
}: ICollaboratorDetailsModalModal) => {
  return (
    <SimpleModal
      isOpen={showModal}
      handleModal={setShowModal}
      size="2xl"
      minHeight="160px"
    >
      <ModalContent>
        <span className="title">Dados do Beneficiário</span>

        <div className="details">
          <div className="detailsColumnA">
            <span>Nome:</span>
            <span>CPF:</span>
            <span>Data de nascimento:</span>
            <span>E-mail:</span>
            <span>Telefone:</span>
            <span>Sexo:</span>
            <span>Estado Civil:</span>
            <span>Nome da Mãe:</span>
            <span>Categoria:</span>
            <span>Subcategoria:</span>
            <span>Data de Admissão:</span>
            <span>Tipo de Vínculo:</span>
          </div>
          <div className="detailsColumnB">
            <span>
              {capitalize(collaborator?.pessoa_fisica?.nomePessoaFisica) || "-"}
            </span>
            <span>{cpfMask(collaborator?.pessoa_fisica?.cpf)}</span>
            <span>
              {dateFormat(
                new Date(collaborator?.pessoa_fisica?.dataNascimento),
              )}
            </span>
            <span>{collaborator?.pessoa_fisica?.email || "-"}</span>
            <span>{phoneMask(collaborator?.pessoa_fisica?.celular)}</span>
            <span>{collaborator?.pessoa_fisica?.sexo?.nomeSexo || "-"}</span>
            <span>
              {collaborator?.pessoa_fisica?.estado_civil?.nomeEstadoCivil ||
                "-"}
            </span>
            <span>{collaborator?.pessoa_fisica?.nomeMae || "-"}</span>
            <span>{collaborator?.setor?.nomeSetor || "-"}</span>
            <span>{collaborator?.cargo?.nomeCargo || "-"}</span>
            <span>{dateFormat(new Date(collaborator?.dataAdmissao))}</span>
            <span>{collaborator?.relacao_trabalhista?.nomeRelacao || "-"}</span>
          </div>
        </div>
      </ModalContent>
    </SimpleModal>
  );
};

export default CollaboratorDetailsModal;
