// services/declarationService.ts
import { Declaration } from '../models/Declaration';

export class DeclarationService {
    static async getAll(userId: string) {
        return await Declaration.find({ userId }).sort({ date: -1 });
    }

    static async create(declarationData: any, userId: string) {
        const declaration = new Declaration({
            userId,
            date: declarationData.date,
            amount: declarationData.amount,
            payment: declarationData.payment
        });

        return await declaration.save();
    }
}