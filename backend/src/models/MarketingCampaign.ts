import mongoose, { Document, Schema } from 'mongoose';

export interface IMarketingCampaign extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    type: string;
    script?: string;
    hashtags: string;
    isAd: boolean;
    adBudget?: number;
    adDuration?: string;
    postDate?: string;
    postTime?: string;
    platform: string;
    content?: string;
    objective?: string;
    createdAt: Date;
    updatedAt: Date;
}

const marketingCampaignSchema = new Schema<IMarketingCampaign>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    script: {
        type: String
    },
    hashtags: {
        type: String,
        required: true
    },
    isAd: {
        type: Boolean,
        required: true
    },
    adBudget: {
        type: Number
    },
    adDuration: {
        type: String
    },
    postDate: {
        type: String
    },
    postTime: {
        type: String
    },
    platform: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    objective: {
        type: String
    }
}, {
    timestamps: true,  // This will automatically add `createdAt` and `updatedAt` fields
    collection: 'marketing' // Name of the collection in MongoDB
});

export const MarketingCampaign = mongoose.model<IMarketingCampaign>('MarketingCampaign', marketingCampaignSchema);