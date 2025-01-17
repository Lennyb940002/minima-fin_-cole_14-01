import React, { useEffect, useState } from 'react';
import { FinancialSummaryCards } from './FinancialSummary';
import { TransactionsTable } from './TransactionsTable';
import FinancialChart from './FinancialChart';
import { Transaction, FinancialSummary } from './types';
import { salesApi } from '../../services/api';
import { stockApi } from '../../services/stockApi';

export function AccountingView() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<FinancialSummary>({ revenue: 0, expenses: 0, profit: 0 });
  const [loading, setLoading] = useState(true);

  const fetchSalesData = async () => {
    try {
      const salesData = await salesApi.getAllSales();
      const salesTransactions: Transaction[] = salesData.map((sale: any) => ({
        id: sale._id,  // Ensure the sale has a unique ID
        date: sale.date,
        category: 'Sales',
        description: sale.product || 'No Description',
        amount: sale.salePrice * sale.quantity || 0,  // Calculate the correct amount
        type: 'income' as const,
      }));
      return salesTransactions;
    } catch (error) {
      console.error('Erreur lors de la récupération des ventes:', error);
      return [];
    }
  };

  const fetchStockData = async () => {
    try {
      const stockData = await stockApi.getAllStock();
      const stockTransactions: Transaction[] = stockData.map((item: any) => ({
        id: item.id,
        date: item.createdAt.toISOString().split('T')[0],
        category: 'Stock',
        description: `Achat de stock: ${item.name}`,
        amount: item.price * item.quantity,
        type: 'expense' as const,
      }));
      return stockTransactions;
    } catch (error) {
      console.error('Erreur lors de la récupération des stocks:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const salesTransactions = await fetchSalesData();
      const stockTransactions = await fetchStockData();

      // Combine transactions
      const allTransactions = [...salesTransactions, ...stockTransactions];
      setTransactions(allTransactions);

      // Calculate summary
      const revenue = salesTransactions.reduce((acc, trans) => acc + trans.amount, 0);
      const expenses = stockTransactions.reduce((acc, trans) => acc + trans.amount, 0);
      const profit = revenue - expenses;

      setSummary({ revenue, expenses, profit });
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  // Prepare data for chart
  const chartData = transactions.map(transaction => ({
    date: transaction.date,
    amount: transaction.type === 'income' ? transaction.amount : -transaction.amount,
  }));

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
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Évolution du Compte</h2>
        <FinancialChart transactions={chartData} />
      </div>
    </div>
  );
}