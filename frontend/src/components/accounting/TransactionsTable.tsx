import React from 'react';
import { Transaction } from './types';
import { formatCurrency } from '../stock/utils/stockCalculations';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {

  const getColorScheme = (type: 'income' | 'expense', category: string) => {
    if (type === 'income') {
      switch (category) {
        case 'Sales': return 'bg-green-500/20 text-green-400';
        case 'Stock': return 'bg-orange-500/20 text-orange-400';
        case 'Marketing': return 'bg-purple-500/20 text-purple-400';
        case 'Déclaration': return 'bg-red-500/20 text-red-400';
        default: return 'bg-gray-500/20 text-gray-400';
      }
    } else {
      switch (category) {
        case 'Stock': return 'bg-orange-500/20 text-orange-400';
        case 'Déclaration': return 'bg-red-500/20 text-red-400';
        case 'Marketing': return 'bg-purple-500/20 text-purple-400';
        default: return 'bg-gray-500/20 text-gray-400';
      }
    }
  };

  const getTextColor = (type: 'income' | 'expense', category: string) => {
    if (type === 'income') return 'text-green-500';
    switch (category) {
      case 'Stock': return 'text-orange-500';
      case 'Déclaration': return 'text-red-500';
      case 'Marketing': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'Sales': return 'bg-green-500';
      case 'Stock': return 'bg-orange-500';
      case 'Marketing': return 'bg-purple-500';
      case 'Déclaration': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Function to sort transactions by date (most recent first)
  const sortedTransactions = transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-black rounded-lg border border-white/10 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Date</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Catégorie</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Description</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Type</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-white/60">Montant</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
            <tr key={transaction.id || transaction.date} className="border-b border-white/10">
              <td className="px-4 py-3 text-sm text-white">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="px-4 py-3 text-sm text-white">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${getBadgeColor(transaction.category)}`}></span>
                {transaction.category}
              </td>
              <td className="px-4 py-3 text-sm text-white">
                <span className={`px-2 py-1 rounded-full text-xs ${getColorScheme(transaction.type, transaction.category)}`}>
                  {transaction.description || 'No Description'}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-white">
                {transaction.type === 'income' ? 'Rentrée d\'argent' : 'Dépense'}
              </td>
              <td className={`px-4 py-3 text-sm text-right ${getTextColor(transaction.type, transaction.category)}`}>
                {transaction.type === 'expense' ? '- ' : '+ '}
                {formatCurrency(transaction.amount || 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}