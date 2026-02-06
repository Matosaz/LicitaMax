import { BiddingDetails } from "./biddingInterfaceDetails";

export function mapApiToBiddingDetails(apiData: any): BiddingDetails {
  console.log("🧩 apiData recebido no mapper:", apiData);

  if (!apiData || !apiData.licitacao) {
    throw new Error("Licitação não encontrada na resposta da API");
  }

  const lic = apiData.licitacao;
  const uasg = apiData.uasg;

  return {
    id: lic.id_compra?.toString() ?? `bidding-${Date.now()}`,
    title: lic.objeto ?? "Sem título",
    description: lic.informacoes_gerais ?? "Descrição não informada",

    value: lic.valor_estimado_total
      ? `R$ ${Number(lic.valor_estimado_total).toLocaleString("pt-BR")}`
      : "Valor não informado",

    valorReferencia: lic.valor_estimado_total
      ? `R$ ${Number(lic.valor_estimado_total).toLocaleString("pt-BR")}`
      : "—",

    agency: uasg?.nomeUasg ?? "Órgão não informado",

    location: uasg
      ? `${uasg.nomeMunicipioIbge} - ${uasg.siglaUf}`
      : "Local não informado",

    deadline: lic.data_entrega_proposta
      ? new Date(lic.data_entrega_proposta).toLocaleDateString("pt-BR")
      : "—",

    dataPublicacao: lic.data_publicacao ?? "—",
    dataAbertura: lic.data_abertura_proposta ?? "—",

    category: lic.nome_modalidade ?? "Modalidade não informada",
    modalidade: lic.nome_modalidade ?? "—",
    numero: lic.numero_aviso ?? "—",
    participacao: lic.tipo_recurso ?? "—",

    isPremium: false,
    isLocked: false,

    contato: {
      responsavel: lic.nome_responsavel ?? "Não informado",
      email: "—",
      telefone: "—",
    },

    documents: [],
  };
}
