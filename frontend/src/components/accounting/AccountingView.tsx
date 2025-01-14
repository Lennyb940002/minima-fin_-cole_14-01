import React from 'react';
import { FinancialSummaryCards } from './FinancialSummary';
import { TransactionsTable } from './TransactionsTable';
import { Transaction, FinancialSummary } from './types';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '10/12/24',
    category: 'E-commerce',
    description: 'Vente en ligne',
    amount: 1200,
    type: 'income',
  },
  {
    id: '2',
    date: '09/12/24',
    category: 'Magasin physique',
    description: 'Vente boutique',
    amount: 800,
    type: 'income',
  },
  {
    id: '3',
    date: '08/12/24',
    category: 'Marketing',
    description: 'Campagne publicitaire',
    amount: 300,
    type: 'expense',
  },
  {
    id: '4',
    date: '07/12/24',
    category: 'Administratif',
    description: 'Charges sociales',
    amount: 150,
    type: 'expense',
  },
  {
    id: '5',
    date: '06/12/24',
    category: 'Impôts',
    description: 'Déclaration trimestrielle',
    amount: 100,
    type: 'expense',
  },
  {
    id: '6',
    date: '05/12/24',
    category: 'Inventaire',
    description: 'Achat de stock',
    amount: 500,
    type: 'expense',
  },
];

const mockSummary: FinancialSummary = {
  revenue: 2000,
  expenses: 550,
  profit: 1450,
};

export function AccountingView() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white mb-6">Comptabilité</h1>
      <FinancialSummaryCards summary={mockSummary} />
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Transactions</h2>
        <TransactionsTable transactions={mockTransactions} />
      </div>
    </div>
  );
}