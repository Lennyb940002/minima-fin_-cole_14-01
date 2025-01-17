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
        },
        {
            title: 'Valeur du stock',
            value: analytics.totalValue ? formatCurrency(analytics.totalValue) : '0,00 €',
        },
        {
            title: 'Stock faible',
            value: analytics.lowStockCount?.toString() || '0',
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {summaryItems.map((item, index) => (
                <StockSummaryCard
                    key={index}
                    title={item.title}
                    value={item.value}
                />
            ))}
        </div>
    );
}