const staticData = () => {
  const civilStates = [
    {
      id: 1,
      civilState: "Solteiro(a)"
    },
    {
      id: 2,
      civilState: "Casado(a)"
    },
    {
      id: 3,
      civilState: "Viúvo(a)"
    },
    {
      id: 4,
      civilState: "Divorciado(a)"
    }
  ]

  const laborRelation = [
    { id: 1, nameRelation: "CLT" },
    { id: 2, nameRelation: "Estatutário/Sócio" },
    { id: 4, nameRelation: "Estagiário" },
    { id: 5, nameRelation: "Jovem Aprendiz" }
  ]

  const sexs = [
    {
      id: 1,
      sex: "Masculino"
    },
    {
      id: 2,
      sex: "Feminino"
    }
  ]

  const kinship = [
    {
      id: 1,
      nomeParentesco: "Titular"
    },
    {
      id: 4,
      nomeParentesco: "Outros"
    },
    {
      id: 5,
      nomeParentesco: "Agregado"
    },
    {
      id: 6,
      nomeParentesco: "Sobrinho(a)"
    },
    {
      id: 7,
      nomeParentesco: "Sogro(a)"
    },
    {
      id: 8,
      nomeParentesco: "Companheiro(a)"
    },
    {
      id: 2,
      nomeParentesco: "Pai"
    },
    {
      id: 10,
      nomeParentesco: "Desiguinado"
    },
    {
      id: 11,
      nomeParentesco: "Neto(a)"
    },
    {
      id: 12,
      nomeParentesco: "Irmão(ã)"
    },
    {
      id: 9,
      nomeParentesco: "Mãe"
    },
    {
      id: 3,
      nomeParentesco: "Filho(a)"
    },
    {
      id: 13,
      nomeParentesco: "Conjuge"
    }
  ]

  return {
    civilStates,
    laborRelation,
    sexs,
    kinship
  }
}

export default staticData
