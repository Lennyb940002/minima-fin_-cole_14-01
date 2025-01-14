import mongoose, { Document, Schema } from 'mongoose';

export interface ISale extends Document {
    userId: mongoose.Types.ObjectId;
    product: string;
    quantity: number;
    salePrice: number;
    unitCost: number;
    client: string;
    paymentMethod: string;
    paymentStatus: string;
    notes: string;
    date: Date;
    margin: number;
}

const saleSchema = new Schema<ISale>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    unitCost: {
        type: Number,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    margin: {
        type: Number,
        required: true
    }
});

export const Sale = mongoose.model<ISale>('Sale', saleSchema);