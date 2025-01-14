export interface Transaction {
  id: string;
  date: string;
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

export type TransactionCategory =
  | 'E-commerce'
  | 'Magasin physique'
  | 'Marketing'
  | 'Administratif'
  | 'Impôts'
  | 'Inventaire';