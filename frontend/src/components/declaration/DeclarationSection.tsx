import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

// Types
interface Declaration {
    date: string;
    amount: number;
    payment: number;
}

interface DeclarationSectionProps {
    title: string;
    items: Declaration[];
    onDeclare: (declaration: Declaration) => void;
    onSimulate: (declaration: Declaration) => void;
    period: 'monthly' | 'quarterly';
}

// Constants
const MONTHS_IN_FRENCH = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const TAX_RATE = 0.12;
const DECLARATION_DEADLINE_DAYS = 90;

// Helper functions
const formatPeriodLabel = (date: string, periodType: 'monthly' | 'quarterly'): string => {
    const [year, monthOrQuarter] = date.split('-');

    if (periodType === 'monthly') {
        const monthIndex = parseInt(monthOrQuarter, 10) - 1;
        return `${MONTHS_IN_FRENCH[monthIndex]} ${year}`;
    }

    return `${monthOrQuarter} ${year}`;
};

const formatCurrency = (amount: number): string => {
    return `${amount.toFixed(2)} €`;
};

// Declaration Card Component
const DeclarationCard = ({
    declaration,
    onDeclare,
    onSimulate
}: {
    declaration: Declaration,
    onDeclare: (d: Declaration) => void,
    onSimulate: (d: Declaration) => void
}) => (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200">
        <div className="mb-4">
            <h4 className="text-3xl font-bold mb-3">
                {formatPeriodLabel(declaration.date, 'monthly')}
            </h4>

            <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <p className="text-base text-gray-400">
                        Chiffre d'affaire
                    </p>
                    <p className="text-xl font-medium">
                        {formatCurrency(declaration.payment)}
                    </p>
                </div>
                <div className="flex justify-between items-center py-2">
                    <p className="text-base text-gray-400">
                        Cotisations estimées
                    </p>
                    <p className="text-2xl font-semibold text-blue-400">
                        {formatCurrency(declaration.amount * TAX_RATE)}
                    </p>
                </div>
            </div>
        </div>

        <p className="text-sm text-gray-400 mb-6">
            À déclarer avant {DECLARATION_DEADLINE_DAYS} jours
        </p>

        <div className="flex justify-between gap-4 px-4">
            <button
                onClick={() => onSimulate(declaration)}
                className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 text-lg font-medium"
            >
                <ArrowLeft className="w-5 h-5" /> Simuler
            </button>
            <button
                onClick={() => onDeclare(declaration)}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 text-lg font-medium"
            >
                Déclarer <ArrowRight className="w-5 h-5" />
            </button>
        </div>
    </div>
);

// Main Component
export function DeclarationSection({
    title,
    items,
    onDeclare,
    onSimulate,
    period
}: DeclarationSectionProps) {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-6">{title}</h3>

            <div className="grid gap-6">
                {items.map((declaration) => (
                    <DeclarationCard
                        key={declaration.date}
                        declaration={declaration}
                        onDeclare={onDeclare}
                        onSimulate={onSimulate}
                    />
                ))}
            </div>
        </div>
    );
}