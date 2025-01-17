import React from 'react';
import { ArrowRight, ArrowLeft, Calendar } from 'lucide-react';

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
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
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
    <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-200">
        <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-400" />
                </div>
                <h4 className="text-2xl font-bold text-white">
                    {formatPeriodLabel(declaration.date, 'monthly')}
                </h4>
            </div>

            <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-sm text-gray-400 mb-1">
                        Chiffre d'affaires
                    </p>
                    <p className="text-xl font-medium text-white">
                        {formatCurrency(declaration.payment)}
                    </p>
                </div>

                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <p className="text-sm text-blue-300 mb-1">
                        Cotisations estimées
                    </p>
                    <p className="text-2xl font-semibold text-blue-400">
                        {formatCurrency(declaration.amount * TAX_RATE)}
                    </p>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-between gap-4">
            <button
                onClick={() => onSimulate(declaration)}
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-all duration-200"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Simuler</span>
            </button>
            <button
                onClick={() => onDeclare(declaration)}
                className="flex items-center gap-2 px-4 py-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
            >
                <span className="font-medium">Déclarer</span>
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-sm text-gray-400 flex items-center gap-2">
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                À déclarer avant {DECLARATION_DEADLINE_DAYS} jours
            </p>
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
            <div className="flex items-center gap-3">
                <h3 className="text-2xl font-semibold text-white">{title}</h3>
                <div className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-400">
                    {items.length}
                </div>
            </div>

            <div className="grid gap-6">
                {items.length > 0 ? (
                    items.map((declaration) => (
                        <DeclarationCard
                            key={declaration.date}
                            declaration={declaration}
                            onDeclare={onDeclare}
                            onSimulate={onSimulate}
                        />
                    ))
                ) : (
                    <div className="p-8 text-center">
                        <p className="text-gray-400">Aucune déclaration</p>
                    </div>
                )}
            </div>
        </div>
    );
}