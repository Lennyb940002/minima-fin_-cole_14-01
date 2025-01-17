// components/stock/StockSummaryCard.tsx

import React from 'react';

interface StockSummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode; // Ajout de l'icône comme propriété
}

export function StockSummaryCard({ title, value, icon }: StockSummaryCardProps) {
  return (
    <div className="bg-black rounded-lg p-6 border border-white/10">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium text-white">{title}</h3>

      </div>
      <p className="text-4xl font-bold text-white ">{value}</p>
    </div>
  );
}