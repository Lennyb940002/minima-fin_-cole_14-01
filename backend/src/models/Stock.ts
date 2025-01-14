import mongoose, { Document, Schema } from 'mongoose';

export interface IStock extends Document {
    userId: mongoose.Types.ObjectId;
    reference: string;
    name: string;
    category: string;
    quantity: number;
    minQuantity: number;
    price: number;
    description?: string;
}

const stockSchema = new Schema<IStock>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    minQuantity: {
        type: Number,
        required: true,
        default: 5
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

stockSchema.index({ userId: 1, reference: 1 }, { unique: true });

export const Stock = mongoose.model<IStock>('Stock', stockSchema);