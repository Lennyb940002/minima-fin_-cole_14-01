import mongoose, { Document, Schema } from 'mongoose';

export interface ISale extends Document {
    userId: mongoose.Types.ObjectId;
    product: string;
    quantity: number;
    salePrice: number;
    unitCost: number;
    paymentStatus: string;
    date: Date;
    margin: number;
    decStatus: string;
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
    paymentStatus: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    margin: {
        type: Number,
        required: true
    },
    decStatus: {
        type: String,
        default: '1.0.0'
    }
});

export const Sale = mongoose.model<ISale>('Sale', saleSchema);