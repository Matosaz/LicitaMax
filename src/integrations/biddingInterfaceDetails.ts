
// src/types/BiddingDetails.ts
export interface BiddingDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
}
export interface BiddingDetails {
  id: string;
  title: string;
  description: string;

  value: string;
  valorReferencia: string;

  agency: string;
  location: string;

  deadline: string;
  dataPublicacao: string;
  dataAbertura: string;

  category: string;
  modalidade: string;
  numero: string;
  participacao: string;

  isPremium: boolean;
  isLocked: boolean;

  documents: BiddingDocument[];

  contato: {
    responsavel: string;
    email: string;
    telefone: string;
  };
}
