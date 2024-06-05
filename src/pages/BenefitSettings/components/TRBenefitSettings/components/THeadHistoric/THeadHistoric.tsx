import { TD, THead } from "../../../../../../components/Table";

const THeadHistoric = () => {
  return (
    <THead style={{ textAlign: "center" }}>
      <TD>Tipo</TD>
      <TD>Data</TD>
      <TD>Beneficiário</TD>
      <TD>Parentesco</TD>
      <TD>Categoria</TD>
      <TD>Subcategoria</TD>
      <TD>Valor</TD>
      <TD>
        Modo de <br />
        contribuição
      </TD>
      <TD>
        Pago pela
        <br />
        empresa
      </TD>
      <TD>Criado por</TD>
      <TD>Status</TD>
    </THead>
  );
};

export default THeadHistoric;
