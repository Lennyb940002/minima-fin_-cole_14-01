import React from 'react';
import { ArrowRight } from 'lucide-react';

interface DeclarationItem {
    date: string;
    amount: number;
    payment: number;
}

interface DeclarationSectionProps {
    title: string;
    items: DeclarationItem[];
    onDeclare: (item: DeclarationItem) => void;
}

export function DeclarationSection({ title, items, onDeclare }: DeclarationSectionProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">{title}</h3>
            {items.map((item, index) => (
                <React.Fragment key={item.date}>
                    <div
                        className="bg-white/5 p-4 rounded-lg border border-white/10"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-white font-mono">{item.date}</p>
                                <p className="text-white/60 text-sm">
                                    Versement : {item.payment} €
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-white font-mono">{item.amount} €</p>
                                <button
                                    onClick={() => onDeclare(item)}
                                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm mt-1"
                                >
                                    Déclarer <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {index < items.length - 1 && (
                        <hr className="border-t border-white/20 my-4" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
