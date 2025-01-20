import { Declaration } from '../models/Declaration';

export class DeclarationService {
    // Récupère toutes les déclarations d'un utilisateur, triées par date décroissante
    static async getAll(userId: string) {
        const declarations = await Declaration.find({ userId }).sort({ date: -1 });
        console.log('Service - Fetched declarations:', declarations);
        return declarations;
    }

    // Crée une nouvelle déclaration pour un utilisateur
    static async create(declarationData: any, userId: string) {
        const declaration = new Declaration({
            userId,
            date: declarationData.date,
            amount: declarationData.amount,
            payment: declarationData.payment,
            isPaid: false // Nouvelle déclaration est non payée par défaut
        });

        const savedDeclaration = await declaration.save();
        console.log('Service - Created new declaration:', savedDeclaration);
        return savedDeclaration;
    }

    // Met à jour le statut d'une déclaration (payée ou non)
    static async updateStatus(declarationId: string, isPaid: boolean) {
        const updateData: any = { isPaid };
        if (isPaid) {
            updateData.paidAt = new Date();
        }
        const updatedDeclaration = await Declaration.findByIdAndUpdate(declarationId, updateData, { new: true });
        console.log('Service - Updated declaration status:', updatedDeclaration);
        return updatedDeclaration;
    }

    // Déplace les déclarations payées dans l'historique si elles ont été payées il y a plus de 24 heures
    static async moveToHistory() {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const result = await Declaration.updateMany(
            { isPaid: true, paidAt: { $lte: twentyFourHoursAgo } },
            { $set: { isPaid: false, movedToHistory: true } }
        );
        console.log('Service - Moved declarations to history:', result);
        return result;
    }
}