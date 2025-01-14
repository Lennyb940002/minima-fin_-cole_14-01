import React from 'react';

interface DeclarationTabsProps {
    activeTab: 'monthly' | 'quarterly';
    onTabChange: (tab: 'monthly' | 'quarterly') => void;
}

export function DeclarationTabs({ activeTab, onTabChange }: DeclarationTabsProps) {
    return (
        <div className="flex gap-2 mb-6">
            <button
                onClick={() => onTabChange('monthly')}
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
            >
                Mensuel
            </button>
            <button
                onClick={() => onTabChange('quarterly')}
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'quarterly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
            >
                Trimestriel
            </button>
        </div>
    );
}