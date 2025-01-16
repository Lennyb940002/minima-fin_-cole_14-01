import mongoose, { Document, Schema } from 'mongoose';

export interface IDeclaration extends Document {
    userId: mongoose.Types.ObjectId;
    date: string;
    amount: number;
    payment: number;
}

const declarationSchema = new Schema<IDeclaration>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payment: {
        type: Number,
        required: true
    }
});

export const Declaration = mongoose.model<IDeclaration>('Declaration', declarationSchema);