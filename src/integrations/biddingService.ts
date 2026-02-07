// src/integrations/biddingService.ts
import axios from "axios";

const API_BASE_URL =
  import.meta.env.DEV
    ? "http://localhost:8888/.netlify/functions/licitacoes"
    : "/.netlify/functions/licitacoes";
export interface Bidding {
  id: string;
  title: string;
  titleSummary?: string;
  value: string;
  agency: string;
  location: string;
  deadline: string;
  category: string;
  isPremium?: boolean;
  isLocked?: boolean;
  description?: string;
  documents?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
  }>;
}

export interface BiddingResponse {
  data: Bidding[];
  total: number;
  page: number;
  pageSize: number;
}

const GOV_API_URL = "https://dadosabertos.compras.gov.br/modulo-legado/1_consultarLicitacao";

// Dados mock para fallback
const mockBiddings: Bidding[] = [
  {
    id: "1",
    title: "Aquisição de equipamentos de informática para secretaria de educação",
    value: "R$ 2.400.000,00",
    agency: "Prefeitura Municipal de São Paulo",
    location: "São Paulo - SP",
    deadline: "15/02/2025",
    category: "Tecnologia",
    isPremium: false,
    isLocked: false,
  },
  {
    id: "2",
    title: "Construção de ponte sobre o Rio Tietê na região metropolitana",
    value: "R$ 15.600.000,00",
    agency: "Governo do Estado de São Paulo",
    location: "São Paulo - SP",
    deadline: "28/02/2025",
    category: "Obras Públicas",
    isPremium: true,
    isLocked: true,
  },
  {
    id: "3",
    title: "Fornecimento de medicamentos para hospitais públicos da região",
    value: "R$ 8.200.000,00",
    agency: "Secretaria de Saúde do Estado",
    location: "Rio de Janeiro - RJ",
    deadline: "12/02/2025",
    category: "Saúde",
    isPremium: false,
    isLocked: false,
  },
  {
    id: "4",
    title: "Serviços de limpeza urbana e coleta seletiva",
    value: "R$ 3.800.000,00",
    agency: "Prefeitura de Belo Horizonte",
    location: "Belo Horizonte - MG",
    deadline: "20/02/2025",
    category: "Serviços",
    isPremium: false,
    isLocked: false,
  },
  {
    id: "5",
    title: "Contratação de consultoria em gestão pública digital",
    value: "R$ 1.200.000,00",
    agency: "Ministério da Economia",
    location: "Brasília - DF",
    deadline: "25/02/2025",
    category: "Consultoria",
    isPremium: true,
    isLocked: true,
  },
  {
    id: "6",
    title: "Aquisição de uniformes escolares para rede municipal",
    value: "R$ 950.000,00",
    agency: "Secretaria Municipal de Educação",
    location: "Salvador - BA",
    deadline: "18/02/2025",
    category: "Bens e Materiais",
    isPremium: false,
    isLocked: false,
  },
  {
    id: "7",
    title: "Sistema de videomonitoramento urbano inteligente",
    value: "R$ 4.200.000,00",
    agency: "Prefeitura do Recife",
    location: "Recife - PE",
    deadline: "22/02/2025",
    category: "Tecnologia",
    isPremium: true,
    isLocked: true,
  },
  {
    id: "8",
    title: "Pavimentação asfáltica de vias públicas",
    value: "R$ 12.800.000,00",
    agency: "Prefeitura de Curitiba",
    location: "Curitiba - PR",
    deadline: "30/01/2025",
    category: "Obras Públicas",
    isPremium: false,
    isLocked: false,
  },
  {
    id: "9",
    title: "Aquisição de ambulâncias para SAMU",
    value: "R$ 6.500.000,00",
    agency: "Secretaria de Saúde",
    location: "Fortaleza - CE",
    deadline: "10/02/2025",
    category: "Saúde",
    isPremium: true,
    isLocked: true,
  },
  {
    id: "10",
    title: "Reforma de escolas municipais",
    value: "R$ 5.300.000,00",
    agency: "Secretaria de Educação",
    location: "Porto Alegre - RS",
    deadline: "05/03/2025",
    category: "Obras Públicas",
    isPremium: false,
    isLocked: false,
  }
];

export const getAllBiddings = async (
  _startDate?: string,
  _endDate?: string,
  page: number = 1,
  pageSize: number = 20
): Promise<BiddingResponse> => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        pagina: page,
        tamanho_pagina: pageSize,
        data_publicacao_inicial: startDate,
        data_publicacao_final: endDate,
      },
    });

    const items = response.data?.resultado ?? [];

    return {
      data: items.map((item: any) => ({
        id: item.id_compra,
        title: item.objeto,
        value: item.valor_estimado_total
          ? `R$ ${item.valor_estimado_total.toLocaleString("pt-BR")}`
          : "Valor não informado",
        agency: item.orgao_entidade_razao_social,
        location: item.municipio_entidade,
        deadline: item.data_abertura_proposta,
        category: item.nome_modalidade,
        isPremium: false,
        isLocked: false,
      })),
      total: response.data?.total_registros ?? items.length,
      page,
      pageSize,
    };
  } catch (error) {
    console.warn("API não disponível, usando dados mock:", error);

    return {
      data: [
        {
          id: "1",
          title: "Aquisição de equipamentos de informática",
          value: "R$ 2.400.000",
          agency: "Prefeitura Municipal",
          location: "São Paulo, SP",
          deadline: "2024-02-15",
          category: "Tecnologia",
          isPremium: false,
          isLocked: false,
        },
      ],
      total: 1,
      page,
      pageSize,
    };
  }
};


export const getBiddingById = async (id: string) => {
  const response = await axios.get(API_BASE_URL, {
    params: {
      id_compra: id,
    },
  });

  return response.data;
};




export const downloadBiddingDocument = async (
  _token: string,
  documentId: string
): Promise<void> => {
  console.log('Download de documento:', documentId);
};
