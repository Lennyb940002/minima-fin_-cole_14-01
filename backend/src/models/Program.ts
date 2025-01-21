// models/Program.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IProgram extends Document {
    userId: mongoose.Types.ObjectId;
    days: Array<{
        day: string;
        exercises: Array<{
            name: string;
            xp: number;
        }>
    }>;
    createdAt: Date;
}

const programSchema = new Schema<IProgram>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    days: [{
        day: {
            type: String,
            required: true
        },
        exercises: [{
            name: {
                type: String,
                required: true
            },
            xp: {
                type: Number,
                required: true
            }
        }]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Program = mongoose.model<IProgram>('Program', programSchema);