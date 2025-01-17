import React, { useState, useEffect } from 'react';
import { StockTable } from './StockTable';
import { StockSummary } from './StockSummary';
import { StockModal } from './StockModal';
import { LowStockPanel } from './LowStockPanel';
import { StockHeader } from './StockHeader';
import StockChart from './StockChart';
import type { StockItem, StockAnalytics } from './types';
import { stockApi } from '../../services/stockApi';

export function StockView() {
  const [items, setItems] = useState<StockItem[]>([]);
  const [analytics, setAnalytics] = useState<StockAnalytics>({
    totalProducts: 0,
    totalValue: 0,
    lowStockCount: 0
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [stockData, analyticsData] = await Promise.all([
        stockApi.getAllStock(),
        stockApi.getAnalytics()
      ]);
      setItems(stockData);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Erreur dans StockView:', err);
      setError('Une erreur est survenue lors du chargement des données.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-white text-center">Chargement des données...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded">
          {error}
        </div>
      </div>
    );
  }

  // Prepare data for chart
  const chartData = items.map(item => ({
    date: item.createdAt.toISOString().split('T')[0],
    quantity: item.quantity,
  }));

  const handleCreateStock = async (stock: Omit<StockItem, 'id' | 'lastUpdated' | 'createdAt' | 'updatedAt'>) => {
    try {
      await stockApi.createStock({
        ...stock,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastUpdated: new Date(),
      });
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la création du stock :', error);
      setError('Erreur lors de la création du stock.');
    }
  };

  const handleUpdateStock = async (id: string, data: Partial<StockItem>) => {
    try {
      await stockApi.updateStock(id, {
        ...data,
        updatedAt: new Date(),
        lastUpdated: new Date(),
      });
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du stock :', error);
      setError('Erreur lors de la mise à jour du stock.');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <StockHeader onAddStock={() => setIsModalOpen(true)} />
      <StockSummary analytics={analytics} items={items} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <StockTable
            items={items}
            onUpdate={handleUpdateStock}
            onDelete={async (id) => {
              await stockApi.deleteStock(id);
              await loadData();
            }}
          />
        </div>
        <div>
          <LowStockPanel
            items={items.filter((item) => item.quantity <= item.threshold)}
            onDelete={async (id) => {
              await stockApi.deleteStock(id);
              await loadData();
            }}
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Évolution du Stock</h2>
        <StockChart items={chartData} />
      </div>

      <StockModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateStock}
      />
    </div>
  );
}