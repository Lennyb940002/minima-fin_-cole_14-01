// types.ts
export interface Transaction {
  id: any;
  date: any;
  category: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

export interface FinancialSummary {
  revenue: number;
  expenses: number;
  profit: number;
}