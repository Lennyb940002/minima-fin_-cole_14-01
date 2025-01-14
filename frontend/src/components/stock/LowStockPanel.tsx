// components/stock/LowStockPanel.tsx
import React from 'react';
import { Trash2 } from 'lucide-react';
import { LowStockItem } from './types';

interface LowStockPanelProps {
    items: LowStockItem[];
    onDelete: (reference: string) => Promise<void>;
}

export function LowStockPanel({ items, onDelete }: LowStockPanelProps) {
    return (
        <div className="bg-red-600/15 border border-red-600 rounded-xl p-6 h-[500px]">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">
                    Stocks Critiques
                    <span className="ml-2 px-2 py-1 bg-red-600 rounded-full text-sm">
                        {items.length}
                    </span>
                </h2>
            </div>
            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item.reference}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                        <div>
                            <p className="text-white font-medium">{item.product}</p>
                            <p className="text-gray-400 text-sm">
                                {item.reference}
                                <span className="ml-2">Stock: {item.quantity}</span>
                            </p>
                        </div>
                        <button
                            onClick={() => onDelete(item.reference)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
