// src/components/declaration/types.ts

export interface Declaration {
  id: string;
  status: 'pending' | 'paid' | 'processing';
  paymentDate?: string;
  lastModified: string;
  // autres champs...
}

export class DeclarationError extends Error {
  code: string;

  constructor({ message, code }: { message: string; code: string }) {
    super(message);
    this.code = code;
  }
}