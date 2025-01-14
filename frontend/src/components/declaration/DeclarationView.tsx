import React, { useState } from 'react';
import { Link2 } from 'lucide-react';
import { ChargesSimulator } from './ChargesSimulator';
import { DeclarationTabs } from './DeclarationTabs';
import { DeclarationSection } from './DeclarationSection';

const mockDeclarations = [
  { date: '31/01/2025', amount: 300, payment: 36 },
  { date: '30/04/2025', amount: 0, payment: 0 },
];

export function DeclarationView() {
  const [activeTab, setActiveTab] = useState<'monthly' | 'quarterly'>('monthly');
  const [nextDeclaration] = useState(52); // days until next declaration

  const handleSimulate = (total: number) => {
    console.log('Total charges:', total);
  };

  const handleDeclare = (declaration: { date: string; amount: number; payment: number }) => {
    console.log('Declaring:', declaration);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Mes Déclarations</h1>
          <p className="text-white/60 mt-1">
            Prochaine déclaration dans {nextDeclaration} jours
          </p>
        </div>
        <Link2 className="text-blue-400 w-6 h-6" />
      </div>

      <ChargesSimulator onSimulate={handleSimulate} />

      <DeclarationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="grid grid-cols-3 gap-6">
        <div>
          <DeclarationSection
            title="À Déclarer"
            items={mockDeclarations}
            onDeclare={handleDeclare}
          />
        </div>
        <div>
          <DeclarationSection
            title="Payé"
            items={[]}
            onDeclare={handleDeclare}
          />
        </div>
        <div>
          <DeclarationSection
            title="Historique"
            items={[]}
            onDeclare={handleDeclare}
          />
        </div>
      </div>
    </div>
  );
}