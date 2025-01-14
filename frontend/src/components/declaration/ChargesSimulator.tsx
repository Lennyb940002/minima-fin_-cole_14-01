import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

interface ChargesSimulatorProps {
    onSimulate: (total: number) => void;
}

export function ChargesSimulator({ onSimulate }: ChargesSimulatorProps) {
    const [revenue, setRevenue] = useState(300);

    const serviceCharges = revenue * 0.22;
    const merchandiseCharges = revenue * 0.12;
    const totalCharges = serviceCharges + merchandiseCharges;

    return (
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-medium text-white">Simulateur de Charges</h3>
                </div>
                <button
                    onClick={() => onSimulate(totalCharges)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Simuler
                </button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-white">Charges Services (22%)</span>
                    <span className="text-white font-mono">{serviceCharges.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-white">Charges Marchandises (12%)</span>
                    <span className="text-white font-mono">{merchandiseCharges.toFixed(2)} €</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-white font-medium">Total des Charges</span>
                    <span className="text-blue-400 font-mono font-bold">{totalCharges.toFixed(2)} €</span>
                </div>
            </div>
        </div>
    );
}