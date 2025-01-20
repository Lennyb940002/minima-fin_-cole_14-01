// src/components/declaration/types.ts

export interface Declaration {
  id: string;
  status: 'pending' | 'paid' | 'processing';
  paymentDate?: string;
  lastModified: string;
  type: string;
  dueDate: string;
  amount: number;
  submissionDate?: string;
  isPaid: boolean;
  // Ajout des champs manquants
  date: string;
  payment: number;
}

export class DeclarationError extends Error {
  code: string;

  constructor({ message, code }: { message: string; code: string }) {
    super(message);
    this.code = code;
  }
}