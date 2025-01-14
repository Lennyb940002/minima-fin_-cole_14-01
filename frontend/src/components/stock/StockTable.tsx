// components/stock/StockTable.tsx
import React from 'react';
import { AlertTriangle, Edit, Trash2 } from 'lucide-react';
import type { StockItem } from './types';
import { formatCurrency } from './utils/stockUtils';

interface StockTableProps {
  items: StockItem[];
  onUpdate: (reference: string, data: Partial<StockItem>) => Promise<void>;
  onDelete: (reference: string) => Promise<void>;
}

export function StockTable({ items, onUpdate, onDelete }: StockTableProps) {
  console.log('Items dans StockTable:', items);

  if (!items || items.length === 0) {
    return (
      <div className="bg-black border border-white/10 rounded-xl p-4 text-white text-center">
        Aucun élément en stock
      </div>
    );
  }

  return (
    <div className="bg-black border border-white/10 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Détails de l'inventaire</h2>
      </div>
      <div className="overflow-x-auto max-h-[500px]">
        <table className="w-full">
          <thead className="sticky top-0 bg-gray-900">
            <tr className="bg-black border-b border-white/10">
              {['Produit', 'Référence', 'Quantité', 'Prix unitaire', 'Valeur totale', 'Prix de vente', 'Actions']
                .map((header, index) => (
                  <th key={index} className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-white/10 hover:bg-gray-800/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {item.quantity <= item.threshold && (
                      <AlertTriangle className="w-4 h-4 text-red-500" title="Stock bas" />
                    )}
                    <span className="text-white">{item.product}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-white">{item.reference}</td>
                <td className="px-4 py-3 text-white">{item.quantity}</td>
                <td className="px-4 py-3 text-white">{formatCurrency(item.unitPrice)}</td>
                <td className="px-4 py-3 text-white">
                  {formatCurrency(item.quantity * item.unitPrice)}
                </td>
                <td className="px-4 py-3 text-white">{formatCurrency(item.salePrice)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onUpdate(item.reference, {})}
                      className="p-1 hover:bg-white/10 rounded"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                      onClick={() => onDelete(item.reference)}
                      className="p-1 hover:bg-white/10 rounded"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}