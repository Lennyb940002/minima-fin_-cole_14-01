import React, { useState, useEffect } from 'react';
import { Link2 } from 'lucide-react';
import { ChargesSimulator } from './ChargesSimulator';
import DeclarationTabs from './DeclarationTabs';
import { DeclarationSection } from './DeclarationSection';
import { salesApi } from '../../services/api';
import { declarationApi } from '../../services/declarationApi';

interface DeclarationItem {
  date: string;
  amount: number;
  payment: number;
}

export function DeclarationView() {
  const [activeTab, setActiveTab] = useState<'monthly' | 'quarterly'>('monthly');
  const [nextDeclaration] = useState(52);
  const [declarations, setDeclarations] = useState<DeclarationItem[]>([]);
  const [paidDeclarations, setPaidDeclarations] = useState<DeclarationItem[]>([]);
  const [historyDeclarations, setHistoryDeclarations] = useState<DeclarationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [selectedDeclaration, setSelectedDeclaration] = useState<DeclarationItem | null>(null);

  useEffect(() => {
    const fetchDeclarations = async () => {
      try {
        const salesData = await salesApi.getAllSales();
        const transformedData = groupSalesByPeriod(salesData, activeTab);
        setDeclarations(transformedData as DeclarationItem[]);
      } catch (error) {
        console.error('Error fetching declarations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeclarations();
  }, [activeTab]);

  const groupSalesByPeriod = (sales: any[], period: string): DeclarationItem[] => {
    const groupedSales: { [key: string]: DeclarationItem } = {};

    sales.forEach(sale => {
      const date = new Date(sale.date);
      let periodKey;

      if (period === 'monthly') {
        periodKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      } else {
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        periodKey = `${date.getFullYear()}-Q${quarter}`;
      }

      if (!groupedSales[periodKey]) {
        groupedSales[periodKey] = { date: periodKey, amount: 0, payment: 0 };
      }

      groupedSales[periodKey].amount += sale.salePrice * sale.quantity;
      groupedSales[periodKey].payment += sale.salePrice * sale.quantity;
    });

    return Object.values(groupedSales);
  };

  const handleSimulate = (total: number) => {
    console.log('Total charges:', total);
  };

  const handleDeclare = (declaration: DeclarationItem) => {
    setSelectedDeclaration(declaration);
    setConfirmationPopup(true);
  };

  const confirmDeclare = async () => {
    if (selectedDeclaration) {
      try {
        await declarationApi.createDeclaration(selectedDeclaration);
        setDeclarations(declarations.filter(decl => decl.date !== selectedDeclaration.date));
        setPaidDeclarations([...paidDeclarations, selectedDeclaration]);
        setSelectedDeclaration(null);
        setConfirmationPopup(false);
      } catch (error) {
        console.error('Error declaring:', error);
      }
    }
  };

  const cancelDeclare = () => {
    setSelectedDeclaration(null);
    setConfirmationPopup(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center border-b border-white/10 h-20">
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
        <div className="relative pr-6">
          <DeclarationSection
            title="À Déclarer"
            items={declarations}
            onDeclare={handleDeclare}
            onSimulate={handleSimulate}
            period={activeTab}
          />
          <div className="absolute right-0 top-0 h-full border-r border-white/20"></div>
        </div>
        <div className="relative pr-6">
          <DeclarationSection
            title="Payé"
            items={paidDeclarations}
            onDeclare={handleDeclare}
            onSimulate={handleSimulate}
            period={activeTab}
          />
          <div className="absolute right-0 top-0 h-full border-r border-white/20"></div>
        </div>
        <div>
          <div className="relative pr-6">
            <DeclarationSection
              title="Historique"
              items={historyDeclarations}
              onDeclare={handleDeclare}
              onSimulate={handleSimulate}
              period={activeTab}
            />
          </div>
        </div>
      </div>

      {confirmationPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 max-w-sm w-full mx-4 backdrop-blur-xl">
            <p className="text-base text-zinc-200 mb-8">
              La déclaration a-t-elle bien été faite sur le site de l'URSSAF ?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-6 py-2.5 text-sm font-medium bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition-colors duration-150"
                onClick={cancelDeclare}
              >
                Annuler
              </button>
              <button
                className="px-6 py-2.5 text-sm font-medium bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-150"
                onClick={confirmDeclare}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}