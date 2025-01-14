// components/stock/StockSummary.tsx

import React from 'react';
import { Package, ShoppingCart, AlertTriangle } from 'lucide-react';
import { StockAnalytics } from './types';
import { formatCurrency } from './utils/stockUtils';
import { StockSummaryCard } from './StockSummaryCard';

interface StockSummaryProps {
    analytics: StockAnalytics;
}

export function StockSummary({ analytics }: StockSummaryProps) {
    const summaryItems = [
        {
            title: 'Produits totaux',
            value: analytics.totalProducts?.toString() || '0',
            icon: <Package className="w-5 h-5 text-blue-400" />
        },
        {
            title: 'Valeur du stock',
            value: analytics.totalValue ? formatCurrency(analytics.totalValue) : '0,00 €',
            icon: <ShoppingCart className="w-5 h-5 text-green-400" />
        },
        {
            title: 'Commandes',
            value: '0',
            icon: <ShoppingCart className="w-5 h-5 text-yellow-400" />
        },
        {
            title: 'Stock faible',
            value: analytics.lowStockCount?.toString() || '0',
            icon: <AlertTriangle className="w-5 h-5 text-red-400" />
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryItems.map((item, index) => (
                <StockSummaryCard
                    key={index}
                    title={item.title}
                    value={item.value}
                    icon={item.icon}
                />
            ))}
        </div>
    );
}