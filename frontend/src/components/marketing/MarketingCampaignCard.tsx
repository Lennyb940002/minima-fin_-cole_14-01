import React from 'react';
import { Pencil, Trash, Calendar, DollarSign, Clock, Target } from 'lucide-react';

interface MarketingCampaignCardProps {
    campaign: any;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const platformStyles: { [key: string]: string } = {
    insta: 'bg-black border-pink-500',
    tiktok: 'bg-black border-purple-500',
    facebook: 'bg-black border-blue-600',
    youtube: 'bg-black border-red-600',
    twitter: 'bg-black border-gray-600',
};

const platformNames: { [key: string]: string } = {
    insta: 'Instagram',
    tiktok: 'TikTok',
    facebook: 'Facebook',
    youtube: 'YouTube',
    twitter: 'Twitter',
};

export const MarketingCampaignCard: React.FC<MarketingCampaignCardProps> = ({ campaign, onEdit, onDelete }) => {
    const campaignId = campaign.id ? campaign.id.toString() : campaign._id?.toString();

    if (!campaignId) {
        console.error("Campaign ID is undefined", campaign);
        return null;
    }

    const platformStyle = platformStyles[campaign.platform];
    const platformName = platformNames[campaign.platform];

    return (
        <div
            className={`relative flex flex-col rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${platformStyle} border overflow-hidden`}
            style={{ height: '500px', width: '100%', maxWidth: '400px' }}
        >
            {/* En-tête */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-10" />

            {/* Header Content */}
            <div className="relative z-20 p-6">
                <div className="flex justify-between items-start">
                    {/* Platform Badge */}
                    <span className="px-3 py-1.5 bg-black/40 backdrop-blur-sm text-sm font-medium text-white rounded-lg border border-white/10">
                        {platformName}
                    </span>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(campaignId)}
                            className="p-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 transition-all"
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(campaignId)}
                            className="p-2 text-white/80 hover:text-white bg-black/40 hover:bg-red-600/60 backdrop-blur-sm rounded-lg border border-white/10 transition-all"
                        >
                            <Trash className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Campaign Title */}
                <h3 className="text-xl font-semibold text-white mt-4 mb-2">{campaign.name}</h3>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 pt-0 overflow-y-auto">
                {/* Description */}
                <div className="space-y-4">
                    <div className="text-white/90">
                        <p className="line-clamp-3">
                            {campaign.type === 'reel' ? campaign.script : campaign.content}
                        </p>
                    </div>

                    {/* Hashtags */}
                    {campaign.hashtags && (
                        <div className="pb-4 border-b border-white/10">
                            <p className="text-blue-400/90 line-clamp-2">{campaign.hashtags}</p>
                        </div>
                    )}

                    {/* Campaign Info */}
                    {campaign.isAd && (
                        <div className="grid grid-cols-2 gap-4 text-sm text-white/80">
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                <span>{campaign.adBudget}€</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{campaign.adDuration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{campaign.postDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{campaign.postTime}</span>
                            </div>
                        </div>
                    )}

                    {campaign.type === 'campaign' && (
                        <div className="flex items-center gap-2 text-white/80">
                            <Target className="w-4 h-4" />
                            <span>{campaign.objective}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            {campaign.isAd && (
                <div className="p-6 pt-0 border-t border-white/10 bg-black/20">
                    <div className="flex gap-3">
                        <button className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors">
                            Terminer
                        </button>
                        <button className="flex-1 py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg transition-colors">
                            Prolonger
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};