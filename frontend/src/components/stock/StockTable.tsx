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
  if (!items || items.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 p-8 text-center text-zinc-400">
        Aucun élément en stock
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      <div className="p-4 border-b border-zinc-800 bg-zinc-900">
        <h2 className="text-lg font-medium">Détails de l'inventaire</h2>
      </div>
      <div className="overflow-x-auto max-h-[500px]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-zinc-900 text-left">
              <th className="px-6 py-3 font-medium text-zinc-400 border-b border-zinc-800">Produit</th>
              <th className="px-6 py-3 font-medium text-zinc-400 border-b border-zinc-800">Référence</th>
              <th className="px-6 py-3 font-medium text-zinc-400 border-b border-zinc-800 text-right">Quantité</th>
              <th className="px-6 py-3 font-medium text-zinc-400 border-b border-zinc-800 text-right">Prix unitaire</th>
              <th className="px-6 py-3 font-medium text-zinc-400 border-b border-zinc-800 text-right">Valeur totale</th>
              <th className="px-6 py-3 font-medium text-zinc-400 border-b border-zinc-800 text-right">Prix de vente</th>
              <th className="px-6 py-3 font-medium text-zinc-400 border-b border-zinc-800 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.id}
                className={`
                  border-b border-zinc-800 hover:bg-zinc-900/50 
                  ${index % 2 === 0 ? 'bg-zinc-900/25' : ''}
                `}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {item.quantity <= item.threshold && (
                      <span className="flex items-center gap-2 text-xs bg-red-500/10 text-red-500 px-2 py-1 rounded-full">
                        <AlertTriangle className="w-3 h-3" />
                        Stock bas
                      </span>
                    )}
                    <span className="font-medium">{item.product}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-zinc-400">{item.reference}</td>
                <td className="px-6 py-4 text-right">{item.quantity}</td>
                <td className="px-6 py-4 text-right text-zinc-400">{formatCurrency(item.unitPrice)}</td>
                <td className="px-6 py-4 text-right font-medium">{formatCurrency(item.quantity * item.unitPrice)}</td>
                <td className="px-6 py-4 text-right text-zinc-400">{formatCurrency(item.salePrice)}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => onUpdate(item.reference, {})}
                      className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                      onClick={() => onDelete(item.reference)}
                      className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
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