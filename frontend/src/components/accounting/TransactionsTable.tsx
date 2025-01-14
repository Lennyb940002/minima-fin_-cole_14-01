import React from 'react';
import { Transaction } from './types';
import { formatCurrency } from '../stock/utils/stockCalculations';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const getColorScheme = (type: string, category: string) => {
    if (type === 'income') return 'bg-blue-500/20 text-blue-400';
    switch (category) {
      case 'Marketing': return 'bg-purple-500/20 text-purple-400';
      case 'Sales': return 'bg-yellow-500/20 text-yellow-400';
      case 'Operations': return 'bg-cyan-500/20 text-cyan-400';
      default: return 'bg-red-500/20 text-red-400';
    }
  };

  const getTextColor = (type: string, category: string) => {
    if (type === 'income') return 'text-blue-500';
    switch (category) {
      case 'Marketing': return 'text-purple-500';
      case 'Sales': return 'text-yellow-500';
      case 'Operations': return 'text-cyan-500';
      default: return 'text-red-500';
    }
  };

  return (
    <div className="bg-black rounded-lg border border-white/10 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Date</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Catégorie</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Description</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-white/60">Montant</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-white/10">
              <td className="px-4 py-3 text-sm text-white">{transaction.date}</td>
              <td className="px-4 py-3 text-sm text-white">{transaction.category}</td>
              <td className="px-4 py-3 text-sm text-white">
                <span className={`px-2 py-1 rounded-full text-xs ${getColorScheme(transaction.type, transaction.category)}`}>
                  {transaction.description}
                </span>
              </td>
              <td className={`px-4 py-3 text-sm text-right ${getTextColor(transaction.type, transaction.category)}`}>
                {transaction.type === 'expense' ? '- ' : '+ '}
                {formatCurrency(transaction.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}