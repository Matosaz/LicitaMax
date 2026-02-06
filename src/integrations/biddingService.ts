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
const TEST_TOKEN = "123"; // token fixo

export const getAllBiddings = async (
  startDate: string,
  endDate: string,
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
  token: string,
  documentId: string
): Promise<void> => {
  const response = await axios.get(
    `${API_BASE_URL}/documents/${documentId}/download`,
    {
      headers: {
        Authorization: `Bearer ${TEST_TOKEN}`,
      },
      responseType: "blob",
    }
  );

  // Cria um link temporário para download
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `documento-${documentId}.pdf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};