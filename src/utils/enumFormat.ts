interface IGenericObject {
  [key: string]: string;
}

interface IGenericObjectWithPath {
  [key: string]: {
    label: string;
    path: string | false;
  };
}

const STATUS_CONTRACT_FROM_TO: IGenericObject = {
  ["active"]: "Ativo",
  ["deactive"]: "Inativo",
  ["incomplete"]: "Incompleto",
  ["pending"]: "Pendente",
};

const AGE_GROUP_TYPE_FROM_TO: IGenericObject = {
  ["unique"]: "Único",
  ["ans"]: "ANS",
  ["custom"]: "Personalizada",
};

const BILLING_TYPE_FROM_TO: IGenericObject = {
  ["prePay"]: "Pré pagamento",
  ["currentMonth"]: "Mês atual",
};

const PRORATE_FROM_TO: IGenericObject = {
  ["proportional"]: "Valor proporcional",
  ["full"]: "Valor integral",
};

const STATUS_BATCH_INVOICE: IGenericObject = {
  ["suing"]: "Processando",
  ["begotten"]: "Gerado",
  ["envoy"]: "Disponível",
  ["paid"]: "Pago",
  ["excluded"]: "Excluído",
  ["failed"]: "Falhou",
};

const TYPE_RELEASE: IGenericObject = {
  ["increase"]: "Acrescimo",
  ["discount"]: "Desconto",
};

const STATUS_RELEASE: IGenericObject = {
  ["released"]: "Lançado",
  ["processed"]: "Processado",
  ["excluded"]: "Excluído",
};

const BENEFICIARY_EMPLOYMENT_RELATIONSHIP: IGenericObject = {
  ["clt"]: "CLT",
  ["partner"]: "Estatutário/Sócio",
  ["intern"]: "Estagiário",
  ["youngApprentice"]: "Jovem Aprendiz",
};

const BENEFICIARY_KINSHIP: IGenericObject = {
  ["child"]: "Filho(a)",
  ["spouse"]: "Conjuge",
  ["companion"]: "Companheiro(a)",
  ["mother"]: "Mãe",
  ["father"]: "Pai",
  ["brother"]: "Irmão(ã)",
  ["grandchild"]: "Neto(a)",
  ["nephew"]: "Sobrinho(a)",
  ["parentInLaw"]: "Sogro(a)",
  ["stepchild"]: "Enteado",
  ["aggregated"]: "Agregado e Outros",
};

const BENEFICIARY_KINSHIP_COMPLETE: IGenericObject = {
  ["holder"]: "Titular",
  ["child"]: "Filho(a)",
  ["spouse"]: "Conjuge",
  ["companion"]: "Companheiro(a)",
  ["mother"]: "Mãe",
  ["father"]: "Pai",
  ["brother"]: "Irmão(ã)",
  ["grandchild"]: "Neto(a)",
  ["nephew"]: "Sobrinho(a)",
  ["parentInLaw"]: "Sogro(a)",
  ["stepchild"]: "Enteado",
  ["aggregated"]: "Agregado e Outros",
};

const BENEFICIARY_TYPE: IGenericObject = {
  ["holder"]: "Titular",
  ["dependent"]: "Dependente",
  ["aggregated"]: "Agregado e Outros",
};

const BENEFICIARY_STATUS: IGenericObject = {
  ["A"]: "Ativo",
  ["I"]: "Inativo",
  ["P"]: "Pendente",
};

const SEX_IDENTITY: IGenericObject = {
  ["male"]: "Masculino",
  ["female"]: "Feminino",
};

const PERSON_MARITAL_STATUS: IGenericObject = {
  ["single"]: "Solteiro(a)",
  ["married"]: "Casado(a)",
  ["divorced"]: "Divorciado(a)",
  ["widowed"]: "Viúvo(a)",
  ["other"]: "Outro",
};

const STATUS_DOCUMENT: IGenericObject = {
  ["pending"]: "Pendente",
  ["nonconforming"]: "Inválido",
  ["valid"]: "Válido",
};

const TYPE_DOCUMENT: IGenericObject = {
  ["single"]: "Simples",
  ["front"]: "Frente",
  ["back"]: "Verso",
};

//CLASSES
const PRODUCT_CLASS: IGenericObject = {
  ["health"]: "Planos de Saúde",
  ["odontology"]: "Planos Odontológicos",
  ["consultation_and_exams"]: "Consultas e Exames",
  ["pharmacies_and_medicines"]: "Farmácias e Medicamentos",
  ["welfare"]: "Bem-estar",
  ["insurance"]: "Seguros",
  ["aesthetics"]: "Estética",
  ["occupational_health"]: "Saúde Corporativa",
  ["food_safety"]: "Alimentação e Nutrição",
};

const BENEFICIARY_CONTRACT_STATUS: IGenericObject = {
  ["adhesionAnalysis"]: "Adesão em Análise",
  ["awaitingRegularizationDataDocuments"]:
    "Aguardando Regularização de Dados/Documentos",
  ["waitingSignature"]: "Aguardando Assinatura",
  ["cancelledClientRequest"]: "Cancelado a Pedido do Cliente",
  ["dateSubscriptionExpired"]: "Data de Assinatura Expirada",
  ["deadlineSendingDataDocumentsExpired"]:
    "Prazo de Envio de Dados/Documentos Expirado",
  ["beneficiaryNotEligible"]: "Beneficiário Não Elegível",
  ["waitingEffectiveStartDate"]: "Aguardando Data de Início de Vigência",
  ["active"]: "Ativo",
  ["cancelledCompanyRequest"]: "Cancelado a Pedido da Empresa",
  ["pendingShipmentToProviderSignatureConfirmed"]:
    "Pendente de Envio Para o Fornecedor - Assinatura Confirmada",
  ["dataSentToProvider"]: "Dados Enviados Para o Fornecedor",
  ["cancellationOtherReasons"]: "Cancelamento Outros Motivos",
  ["requestedQualifiedInterview"]: "Solicitado Entrevista Qualificada",
  ["cancelledForNonPaymentTicket"]: "Cancelado Por Não Pagamento do Boleto",
  ["pendingProposalGenerationSubmission"]:
    "Pendente de Geração e Envio da Proposta",
  ["pendingSubmissionDataToProvider"]:
    "Pendente de Envio de Dados Para o Fornecedor",
  ["scheduledCancellation"]: "Cancelamento Programado",
  ["cancellationReview"]: "Cancelamento em Análise",
  ["pendingPayment"]: "Pendente de Pagamento",
  ["awaitingRegularizationOtherContractsTheProposal"]:
    "Aguardando regularização dos demais contratos da proposta",
};

const HIRING_TYPE_FROM_TO: IGenericObject = {
  ["individual"]: "Individual",
  ["businessCollective"]: "Coletivo empresarial",
  ["collectiveByAccession"]: "Coletivo por adesão",
};

const ACCOMODATION_FROM_TO: IGenericObject = {
  ["business"]: "Invidual",
  ["collective"]: "Coletivo",
  ["unavailable"]: "Indisponível",
};

const CARE_SEGMENTATION_FROM_TO: IGenericObject = {
  ["outpatient"]: "Ambulatorial",
  ["hospital_without_obstetrics"]: "Hospitalar sem obstetrícia",
  ["hospital_with_obstetrics"]: "Hospitalar com obstetrícia",
  ["exclusively_dental"]: "Exclusivamente odontológico",
  ["reference"]: "Referência",
  ["outpatient_plus_dental"]: "Ambulatorial + odontológico",
  ["outpatient_plus_hospital_without_obstetrics"]:
    "Ambulatorial + hospitalar sem obstetrícia",
  ["outpatient_plus_hospital_with_obstetrics"]:
    "Ambulatorial + hospitalar com obstetrícia",
  ["hospital_with_obstetrics_plus_dental"]:
    "Hospitalar com obstetrícia + Odontológico",
  ["hospital_without_obstetrics_plus_dental"]:
    "Hospitalar sem obstetrícia + Odontológico",
  ["outpatient_plus_hospital_without_obstetrics_plus_dental"]:
    "Ambulatorial + Hospitalar sem obstetrícia + Odontológico",
  ["outpatient_plus_hospital_with_obstetrics_plus_dental"]:
    "Ambulatorial + Hospitalar com obstetrícia + Odontológico",
};

const COVERAGE_FROM_TO: IGenericObject = {
  ["state"]: "Estadual",
  ["countriesGroup"]: "Grupo de municípios",
  ["stateGroup"]: "Grupo de estados",
  ["national"]: "Nacional",
  ["municipal"]: "Municipal",
};

const CANCEL_REASON_FROM_TO: IGenericObject = {
  ["benefitValue"]: "Valor do benefício",
  ["dissatisfactionWithProvider"]: "Insatisfação com o fornecedor",
  ["dissatisfactionWithPlatform"]: "Insatisfação com a plataforma/APP",
  ["hiringAnotherSimilarBenefit"]:
    "Contratação de um outro benefício semelhante",
  ["didNotInform"]: "Não informou",
  ["otherReasons"]: "Outros motivos",
  ["employeeDismissal"]: "Desligamento do titular",
};
const CANCEL_REQUEST_BY_FROM_TO: IGenericObject = {
  ["C"]: "Cliente",
  ["E"]: "Empresa",
};
const CANCEL_REQUEST_STATUS_FROM_TO: IGenericObject = {
  ["inAanalysis"]: "Em analise",
  ["programmed"]: "proramado",
  ["completed"]: "concluído",
  ["suspended"]: "suspenso",
};
const SUSPEND_REQUEST_REASON_FROM_TO: IGenericObject = {
  ["companyRequest"]: "Pedido da empresa",
  ["clientRequest"]: "Pedido do cliente",
  ["documentSentInvalid"]: "Documento enviado inválido",
};

const TOPIC_FROM_TO: IGenericObject = {
  ["Todos"]: "Todos",
  ["legalDoubts"]: "Dúvidas jurídicas",
  ["companyPortalQuestions"]: "Dúvidas portal da empresa",
  ["financial"]: "Financeiro",
  ["brokerAgent"]: "Corretora",
  ["aboutFiibo"]: "Sobre a fiibo",
  ["productsAndServices"]: "Produtos e serviços",
};

const COMPANY_ASSOCIATED_STATUS: IGenericObject = {
  ["registered"]: "Registrada",
  ["acceptedTerm"]: "Termo aceito",
  ["waitingLegalSubscriber"]: "Esperando assinante legal",
  ["waitingLegalApproval"]: "Esperando aprovação legal",
  ["waitingInternalSubscriber"]: "Esperando assinante interno",
  ["approved"]: "Aprovado",
  ["reproved"]: "Reprovado",
};

const LEGAL_STATUS: IGenericObject = {
  ["pending"]: "Pendente",
  ["validated"]: "Validado",
  ["rejected"]: "Rejeitado",
};

const NOTIFICATION_CATEGORY: IGenericObjectWithPath = {
  ["adherence"]: {
    label: "Adesão",
    path: "/movimentacoes",
  },
  ["contract"]: {
    label: "Contrato",
    path: false,
  },
  ["partnerCompany"]: {
    label: "Empresas parceiras",
    path: "/prestadores-de-servico",
  },
  ["linkedCompany"]: {
    label: "Empresa vinculada",
    path: false,
  },
  ["finance"]: {
    label: "Financeiro",
    path: "/area-financeira",
  },
  ["collaborator"]: {
    label: "Pessoas",
    path: "/pacotes",
  },
  ["product"]: {
    label: "Produto",
    path: false,
  },
  ["support"]: {
    label: "Suporte",
    path: "/canal-de-atendimento",
  },
};

const NOTIFICATION_SUBJECT: IGenericObjectWithPath = {
  ["newSupplier"]: {
    label: "Novo fornecedor",
    path: "",
  },
  ["newProduct"]: {
    label: "Novo Produto",
    path: "",
  },
  ["invoice"]: {
    label: "Fatura",
    path: "?menu=1",
  },
  ["fiscalNote"]: {
    label: "Nota Fiscal",
    path: "?menu=1&nota-fiscal",
  },
  ["invoiceDueDate"]: {
    label: "Data de corte da fatura",
    path: "",
  },
  ["newCall"]: {
    label: "Novo chamado",
    path: "?status=A",
  },
  ["callMessage"]: {
    label: "Resposta de chamado",
    path: "?status=A",
  },
  ["callClosed"]: {
    label: "Chamado concluído",
    path: "?status=E",
  },
  ["contractAniversary"]: {
    label: "Aniversário de contrato",
    path: "",
  },
  ["linkApproval"]: {
    label: "Aprovação de vinculo",
    path: "?menu=3",
  },
  ["serviceProviderRegister"]: {
    label: "Cadastro de Prestadores de Serviço",
    path: "/",
  },
  ["newAdherence"]: {
    label: "Nova adesão",
    path: "?menu=E",
  },
  ["adherenceCancelled"]: {
    label: "Cancelamento de adesão",
    path: "?menu=C",
  },
  ["pendingAdherence"]: {
    label: "Pendência de adesão",
    path: "?menu=P",
  },
  ["newLinkedCompany"]: {
    label: "Nova empresa vinculada",
    path: "",
  },
};

export {
  ACCOMODATION_FROM_TO,
  AGE_GROUP_TYPE_FROM_TO,
  BENEFICIARY_CONTRACT_STATUS,
  BENEFICIARY_EMPLOYMENT_RELATIONSHIP,
  BENEFICIARY_KINSHIP,
  BENEFICIARY_KINSHIP_COMPLETE,
  BENEFICIARY_STATUS,
  BENEFICIARY_TYPE,
  BILLING_TYPE_FROM_TO,
  CANCEL_REASON_FROM_TO,
  CANCEL_REQUEST_BY_FROM_TO,
  CANCEL_REQUEST_STATUS_FROM_TO,
  CARE_SEGMENTATION_FROM_TO,
  COMPANY_ASSOCIATED_STATUS,
  COVERAGE_FROM_TO,
  HIRING_TYPE_FROM_TO,
  LEGAL_STATUS,
  PERSON_MARITAL_STATUS,
  PRODUCT_CLASS,
  PRORATE_FROM_TO,
  SEX_IDENTITY,
  STATUS_BATCH_INVOICE,
  STATUS_CONTRACT_FROM_TO,
  STATUS_DOCUMENT,
  STATUS_RELEASE,
  SUSPEND_REQUEST_REASON_FROM_TO,
  TOPIC_FROM_TO,
  TYPE_DOCUMENT,
  TYPE_RELEASE,
  NOTIFICATION_CATEGORY,
  NOTIFICATION_SUBJECT,
};
