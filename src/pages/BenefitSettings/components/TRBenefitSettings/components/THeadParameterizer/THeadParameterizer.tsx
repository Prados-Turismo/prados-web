import { TD, THead } from "../../../../../../components/Table";

const THeadParameterizer = () => {
  return (
    <THead style={{ textAlign: "center" }}>
      <TD>Tipo</TD>
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
      <TD style={{ flex: "0 0 4%" }}>&nbsp;</TD>
      <TD style={{ flex: "0 0 5%" }}>&nbsp;</TD>
    </THead>
  );
};

export default THeadParameterizer;
