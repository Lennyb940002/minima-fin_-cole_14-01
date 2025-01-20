import React, { useState, useEffect } from 'react';
import { Link2 } from 'lucide-react';
import { ChargesSimulator } from './ChargesSimulator';
import DeclarationTabs from './DeclarationTabs';
import { DeclarationSection } from './DeclarationSection';
import { declarationApi } from '../../services/declarationApi';
import { Declaration } from './types';

export function DeclarationView() {
  const [activeTab, setActiveTab] = useState<'monthly' | 'quarterly'>('monthly');
  const [nextDeclaration] = useState(52);
  const [declarations, setDeclarations] = useState<Declaration[]>([]);
  const [paidDeclarations, setPaidDeclarations] = useState<Declaration[]>([]);
  const [historyDeclarations, setHistoryDeclarations] = useState<Declaration[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [selectedDeclaration, setSelectedDeclaration] = useState<Declaration | null>(null);

  useEffect(() => {
    const fetchDeclarations = async () => {
      try {
        const declarationsData = await declarationApi.getAllDeclarations();
        const paid = declarationsData.filter((d: Declaration) => d.isPaid);
        const notPaid = declarationsData.filter((d: Declaration) => !d.isPaid);

        setDeclarations([...new Map(notPaid.map(item => [item._id, item])).values()]);
        setPaidDeclarations([...new Map(paid.map(item => [item._id, item])).values()]);
      } catch (error) {
        console.error('Error fetching declarations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeclarations();
  }, []);

  const handleSimulate = (declaration: Declaration) => {
    console.log('Total charges:', declaration.amount);
  };

  const handleDeclare = (declaration: Declaration) => {
    console.log('Declaration selected:', declaration);
    if (declaration && declaration._id) {
      setSelectedDeclaration(declaration);
      setConfirmationPopup(true);
    } else {
      console.error('Invalid declaration:', declaration);
    }
  };

  const confirmDeclare = async () => {
    if (selectedDeclaration && selectedDeclaration._id) {
      console.log('Confirming declaration with ID:', selectedDeclaration._id);
      try {
        await declarationApi.updateDeclarationStatus(selectedDeclaration._id, true);

        // Mettre à jour les déclarations après confirmation
        setDeclarations(prevDeclarations => prevDeclarations.filter(decl => decl._id !== selectedDeclaration._id));

        // Ajouter uniquement si l'ID n'existe pas déjà dans paidDeclarations
        setPaidDeclarations(prevPaidDeclarations => {
          const updatedPaidDeclarations = new Map(prevPaidDeclarations.map(item => [item._id, item]));
          updatedPaidDeclarations.set(selectedDeclaration._id, { ...selectedDeclaration, isPaid: true });
          return [...updatedPaidDeclarations.values()];
        });

        setSelectedDeclaration(null);
        setConfirmationPopup(false);
      } catch (error) {
        console.error('Error declaring:', error);
      }
    } else {
      console.error('Selected declaration is null or has an undefined ID');
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
            items={declarations.filter(decl => !paidDeclarations.some(paidDecl => paidDecl._id === decl._id))}
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