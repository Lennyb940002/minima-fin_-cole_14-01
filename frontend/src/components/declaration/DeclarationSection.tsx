import React from 'react';
import { ArrowRight, ArrowLeft, Calendar } from 'lucide-react';

// Types
interface Declaration {
    date: string;
    amount: number;
    payment: number;
    isPaid: boolean;
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
    <div className={`p-6 rounded-xl border transition-all duration-200 ${declaration.isPaid ? 'bg-white text-black border-gray-300' : 'bg-white/5 text-white border-white/10 hover:border-white/20 hover:bg-white/[0.07]'}`}>
        <div className="mb-6 flex items-center justify-center">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Calendar className={`w-5 h-5 ${declaration.isPaid ? 'text-black' : 'text-blue-400'}`} />
                </div>
                <h4 className="text-2xl font-bold">
                    {formatPeriodLabel(declaration.date, 'monthly')}
                </h4>
            </div>
        </div>

        {declaration.isPaid ? (
            <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                    <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
                    <path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
                </svg>
                <p className="text-sm mt-4">Vous avez déclaré vos revenus le {declaration.date}</p>
                <div className="mt-4 space-y-2">
                    <div className="p-4 bg-white rounded-lg border border-gray-300">
                        <p className="text-sm text-gray-800 mb-1">
                            Chiffre d'affaires
                        </p>
                        <p className="text-xl font-medium">
                            {formatCurrency(declaration.payment)}
                        </p>
                    </div>

                    <div className="p-4 bg-green-100 rounded-lg border border-green-300">
                        <p className="text-sm text-green-800 mb-1">
                            Cotisations payées
                        </p>
                        <p className="text-xl font-medium">
                            {formatCurrency(declaration.amount * TAX_RATE)}
                        </p>
                    </div>
                </div>
            </div>
        ) : (
            <>
                <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-sm text-gray-400 mb-1">
                            Chiffre d'affaires
                        </p>
                        <p className="text-xl font-medium">
                            {formatCurrency(declaration.payment)}
                        </p>
                    </div>

                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <p className="text-sm text-blue-300 mb-1">
                            Cotisations estimées
                        </p>
                        <p className="text-2xl font-semibold">
                            {formatCurrency(declaration.amount * TAX_RATE)}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4 mt-6">
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
            </>
        )}
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