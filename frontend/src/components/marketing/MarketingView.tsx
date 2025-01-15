import React, { useState, useEffect } from 'react';
import { Plus, Info } from 'lucide-react';
import { MarketingModal } from './MarketingModal';
import { MarketingCampaignCard } from './MarketingCampaignCard';
import { MarketingCriteriaModal } from './MarketingCriteriaModal';
import { MarketingFilters } from './MarketingFilters';

export function MarketingView() {
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [filters, setFilters] = useState({ category: '', status: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCriteriaModalOpen, setIsCriteriaModalOpen] = useState(false);
    const [campaignToEdit, setCampaignToEdit] = useState<any | null>(null);
    const [filteredCampaigns, setFilteredCampaigns] = useState<any[]>([]);

    useEffect(() => {
        setFilteredCampaigns(
            campaigns.filter((campaign) =>
                (!filters.category || campaign.category === filters.category) &&
                (!filters.status || campaign.status === filters.status)
            )
        );
    }, [campaigns, filters]);

    const handleCreateOrUpdate = (campaign: any) => {
        if (campaignToEdit) {
            setCampaigns(campaigns.map(c => c.id === campaignToEdit.id ? campaign : c));
        } else {
            setCampaigns([...campaigns, { ...campaign, id: Date.now() }]);
        }
        setCampaignToEdit(null);
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        setCampaigns(campaigns.filter(campaign => campaign.id !== id));
    };

    const resetFilters = () => {
        setFilters({ category: '', status: '' });
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <header className="bg-black/50 backdrop-blur-lg border-b border-white/10 p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Marketing Lab</h1>
                <div className="flex items-center space-x-2">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus size={16} />
                        <span>Faire un Poste</span>
                    </button>
                </div>
            </header>

            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl max-w-4xl mx-auto mt-8">
                <div className="flex space-x-4">
                    <select
                        className="flex-1 bg-white/10 border border-white/10 rounded-xl p-3 text-white"
                        onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
                    >
                        <option className="text-black" value="">Toutes les catégories</option>
                        <option className="text-black" value="digital">Digital</option>
                        <option className="text-black" value="print">Print</option>
                        <option className="text-black" value="social">Social Media</option>
                    </select>

                    <select
                        className="flex-1 bg-white/10 border border-white/10 rounded-xl p-3 text-white"
                        onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
                    >
                        <option className="text-black" value="">Tous les statuts</option>
                        <option className="text-black" value="draft">Brouillon</option>
                        <option className="text-black" value="in-progress">En cours</option>
                        <option className="text-black" value="validated">Validé</option>
                        <option className="text-black" value="rejected">Rejeté</option>
                    </select>
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        onClick={resetFilters}
                    >
                        Réinitialiser
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto mt-8">
                {filteredCampaigns.map((campaign) => {
                    const campaignId = campaign.id ? campaign.id.toString() : campaign._id?.toString();
                    if (!campaignId) {
                        console.error("Campaign ID is undefined", campaign);
                        return null;
                    }
                    return (
                        <MarketingCampaignCard
                            key={campaignId} // Ensure a unique key for each component
                            campaign={campaign}
                            onEdit={() => {
                                setCampaignToEdit(campaign);
                                setIsModalOpen(true);
                            }}
                            onDelete={() => handleDelete(campaignId)} // Convert ID to string
                        />
                    );
                })}
            </div>

            <MarketingModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setCampaignToEdit(null);
                }}
                onSubmit={handleCreateOrUpdate}
                initialData={campaignToEdit || undefined}
            />

            <MarketingCriteriaModal
                isOpen={isCriteriaModalOpen}
                onClose={() => setIsCriteriaModalOpen(false)}
            />
        </div>
    );
}

export default MarketingView;