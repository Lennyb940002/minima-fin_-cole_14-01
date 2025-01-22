import { Sale } from '../models/Sale';

export class SaleService {
    static async getAll(userId: string) {
        try {
            return await Sale.find({ userId }).sort({ date: -1 });
        } catch (error) {
            console.error('Erreur dans SaleService.getAll:', error);
            throw error;
        }
    }

    static async create(saleData: any, userId: string) {
        try {
            console.log('Données de vente reçues dans create:', saleData);
            const sale = new Sale({
                userId,
                product: saleData.product,
                quantity: saleData.quantity,
                salePrice: saleData.salePrice,
                unitCost: saleData.unitCost,
                paymentStatus: saleData.paymentStatus,
                date: saleData.date || new Date(),
                margin: (saleData.salePrice - saleData.unitCost) * saleData.quantity,
                decStatus: saleData.decStatus || '1.0.0'  // Appliquer la valeur par défaut pour decStatus
            });

            const savedSale = await sale.save();
            console.log('Sale saved:', savedSale);
            return savedSale;
        } catch (error) {
            console.error('Erreur dans SaleService.create:', error);
            throw error;
        }
    }

    static async update(id: string, saleData: any, userId: string) {
        try {
            console.log('Données de vente reçues dans update:', saleData);
            const updatedSale = await Sale.findOneAndUpdate(
                { _id: id, userId },
                {
                    product: saleData.product,
                    quantity: saleData.quantity,
                    salePrice: saleData.salePrice,
                    unitCost: saleData.unitCost,
                    paymentStatus: saleData.paymentStatus,
                    date: saleData.date || new Date(),
                    margin: (saleData.salePrice - saleData.unitCost) * saleData.quantity,
                    decStatus: saleData.decStatus || '1.0.0'  // Appliquer la valeur par défaut pour decStatus
                },
                { new: true }
            );
            console.log('Sale updated:', updatedSale);
            return updatedSale;
        } catch (error) {
            console.error('Erreur dans SaleService.update:', error);
            throw error;
        }
    }

    static async delete(id: string, userId: string) {
        try {
            const deletedSale = await Sale.findOneAndDelete({ _id: id, userId });
            if (deletedSale) {
                console.log('Sale deleted:', deletedSale);
            }
            return deletedSale;
        } catch (error) {
            console.error('Erreur dans SaleService.delete:', error);
            throw error;
        }
    }
}