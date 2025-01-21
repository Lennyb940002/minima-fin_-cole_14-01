import React, { useEffect, useState } from 'react';
import { FinancialSummaryCards } from './FinancialSummary';
import { TransactionsTable } from './TransactionsTable';
import FinancialChart from './FinancialChart';
import { Transaction, FinancialSummary } from './types';
import { salesApi } from '../../services/api';
import { stockApi } from '../../services/stockApi';
import { declarationApi } from '../../services/declarationApi';
import { marketingApi } from '../../services/marketingApi';

export function AccountingView() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<FinancialSummary>({ revenue: 0, expenses: 0, profit: 0 });
  const [loading, setLoading] = useState(true);

  const fetchSalesData = async () => {
    try {
      console.log('Fetching sales data');
      const salesData = await salesApi.getAllSales();
      console.log('Sales data:', salesData);
      const salesTransactions: Transaction[] = salesData.map((sale: any) => ({
        id: sale._id,
        date: sale.date,
        category: 'Sales',
        description: sale.product || 'No Description',
        amount: sale.salePrice * sale.quantity || 0,
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
      console.log('Fetching stock data');
      const stockData = await stockApi.getAllStock();
      console.log('Stock data:', stockData);
      const stockTransactions: Transaction[] = stockData.map((item: any) => ({
        id: item.id || item._id,
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

  const fetchDeclarationsData = async () => {
    try {
      console.log('Fetching declarations data');
      const declarationsData = await declarationApi.getAllDeclarations();
      console.log('Declarations data:', declarationsData);
      const paidDeclarations = declarationsData.filter((declaration: any) => declaration.isPaid);
      const declarationTransactions: Transaction[] = paidDeclarations.map((declaration: any) => {
        const reducedAmount = declaration.amount * 0.123; // Apply 12.3% to the amount
        return {
          id: declaration._id,
          date: declaration.date,
          category: 'Declarations',
          description: 'Charges payées',
          amount: reducedAmount,
          type: 'expense' as const,
        };
      });
      return declarationTransactions;
    } catch (error) {
      console.error('Erreur lors de la récupération des déclarations:', error);
      return [];
    }
  };

  const fetchMarketingData = async () => {
    try {
      console.log('Fetching marketing expenses data');
      const marketingData = await marketingApi.getAllMarketingExpenses();
      console.log('Marketing expenses data:', marketingData);

      if (marketingData.length === 0) {
        console.log('No marketing expenses found');
      } else {
        console.log('Marketing expenses found:', marketingData);
      }

      const marketingTransactions: Transaction[] = marketingData.filter((expense: any) => {
        console.log('Checking expense:', expense);
        return expense.amount > 0; // Ensure that amount is used instead of adBudget
      }).map((expense: any) => ({
        id: expense._id,
        date: expense.date,
        category: 'Marketing',
        description: expense.description || 'No Description',
        amount: expense.amount || 0,
        type: 'expense' as const,
      }));

      console.log('Processed marketing transactions:', marketingTransactions);
      return marketingTransactions;
    } catch (error) {
      console.error('Erreur lors de la récupération des dépenses marketing:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log('Fetching all data');
      const salesTransactions = await fetchSalesData();
      const stockTransactions = await fetchStockData();
      const declarationTransactions = await fetchDeclarationsData();
      const marketingTransactions = await fetchMarketingData();
      console.log('Marketing Transactions:', marketingTransactions);

      // Combine transactions
      const allTransactions = [...salesTransactions, ...stockTransactions, ...declarationTransactions, ...marketingTransactions];
      setTransactions(allTransactions);
      console.log('All transactions:', allTransactions);

      // Calculate summary
      const revenue = salesTransactions.reduce((acc, trans) => acc + trans.amount, 0);
      const expenses = [...stockTransactions, ...declarationTransactions, ...marketingTransactions].reduce((acc, trans) => acc + trans.amount, 0);
      const profit = revenue - expenses;

      setSummary({ revenue, expenses, profit });
      console.log('Summary:', { revenue, expenses, profit });
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