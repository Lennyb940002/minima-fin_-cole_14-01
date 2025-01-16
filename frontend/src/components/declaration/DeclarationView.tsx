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

const questions = [
  {
    question: 'Quel est votre régime fiscal ?',
    options: ['12,5% (services)', '21,5% (activités commerciales)', '22,5% (activités artisanales)']
  },
  {
    question: "Votre secteur d'activité principal ?",
    options: [
      'Vente de détail', 'Prestations artisanales', 'Services aux entreprises',
      'Services aux particuliers', 'Profession libérale', 'Conseil et formation',
      'Création et design', 'Autre'
    ]
  },
  {
    question: 'Votre mode de déclaration de revenus ?',
    options: ['Mensuel', 'Trimestriel', 'Annuel']
  },
  {
    question: "Votre tranche de chiffre d'affaires ?",
    options: ['0-20 000€', '20 000-50 000€', '50 000-72 600€', 'Plus de 72 600€']
  }
];

const Questionnaire: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
      <div className="max-w-xl w-full mx-4 p-8 rounded-2xl bg-gray-900 border border-gray-800">
        <p className="text-3xl font-semibold mb-8 leading-tight text-center">
          {questions[currentQuestionIndex].question}
        </p>

        <div className="space-y-4 mb-8">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <label
              key={option}
              className="flex items-center p-4 rounded-lg border border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors duration-200"
            >
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={answers[currentQuestionIndex] === option}
                onChange={(e) => handleOptionChange(e, currentQuestionIndex)}
                className="hidden"
              />
              <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center
                ${answers[currentQuestionIndex] === option
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-600'}`}
              >
                {answers[currentQuestionIndex] === option && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="text-lg">{option}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium text-lg"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Suivant' : 'Soumettre'}
          </button>
        </div>
      </div>
    </div>
  );
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
  const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

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

  const handleQuestionnaireComplete = () => {
    setTransitioning(true);
    setTimeout(() => {
      setHasCompletedQuestionnaire(true);
    }, 1000); // Correspond à la durée de la transition
  };

  if (!hasCompletedQuestionnaire) {
    return <Questionnaire onComplete={handleQuestionnaireComplete} />;
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <div className={`p-6 space-y-6 transition-opacity duration-1000 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
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