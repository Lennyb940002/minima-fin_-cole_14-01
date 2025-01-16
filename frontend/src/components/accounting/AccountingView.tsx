import React, { useEffect, useState } from 'react';
import { FinancialSummaryCards } from './FinancialSummary';
import { TransactionsTable } from './TransactionsTable';
import { Transaction, FinancialSummary } from './types';
import { salesApi } from '../../services/api';
import { stockApi } from '../../services/stockApi';

export function AccountingView() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<FinancialSummary>({ revenue: 0, expenses: 0, profit: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sales data
        const salesData = await salesApi.getAllSales();
        const salesTransactions = salesData.map((sale: any) => ({
          id: sale.id,
          date: sale.date,
          category: 'Sales',
          description: sale.description,
          amount: sale.amount,
          type: 'income',
        }));

        // Fetch stock data
        const stockData = await stockApi.getAllStock();
        const stockTransactions = stockData.map((item: any) => ({
          id: item.id,
          date: item.createdAt.toISOString().split('T')[0],
          category: 'Inventaire',
          description: `Achat de stock: ${item.name}`,
          amount: item.price * item.quantity,
          type: 'expense',
        }));

        // Combine transactions
        const allTransactions = [...salesTransactions, ...stockTransactions];
        setTransactions(allTransactions);

        // Calculate summary
        const revenue = salesTransactions.reduce((acc: number, trans: Transaction) => acc + trans.amount, 0);
        const expenses = stockTransactions.reduce((acc: number, trans: Transaction) => acc + trans.amount, 0);
        const profit = revenue - expenses;

        setSummary({ revenue, expenses, profit });
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <header className='border-b border-white/10'>
        <h1 className="text-2xl font-bold text-white mb-6">Comptabilité</h1>
      </header>
      <FinancialSummaryCards summary={summary} />
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Transactions</h2>
        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  );
}