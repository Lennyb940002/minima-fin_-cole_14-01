import { Sale } from '../models/Sale';

export class SaleService {
    static async getAll(userId: string) {
        return await Sale.find({ userId }).sort({ date: -1 });
    }

    static async create(saleData: any, userId: string) {
        try {
            const sale = new Sale({
                userId,
                product: saleData.product,
                quantity: saleData.quantity,
                salePrice: saleData.salePrice,
                unitCost: saleData.unitCost,
                client: saleData.client || 'Client anonyme',
                paymentMethod: saleData.paymentMethod,
                paymentStatus: saleData.paymentStatus,
                notes: saleData.notes || '',
                date: saleData.date || new Date(),
                margin: (saleData.salePrice - saleData.unitCost) * saleData.quantity
            });

            const savedSale = await sale.save();
            console.log('Sale saved:', savedSale);
            return savedSale;
        } catch (error) {
            console.error('Error in SaleService.create:', error);
            throw error;
        }
    }

    static async update(id: string, saleData: any, userId: string) {
        try {
            const updatedSale = await Sale.findOneAndUpdate(
                { _id: id, userId },
                {
                    ...saleData,
                    margin: (saleData.salePrice - saleData.unitCost) * saleData.quantity
                },
                { new: true }
            );
            console.log('Sale updated:', updatedSale);
            return updatedSale;
        } catch (error) {
            console.error('Error in SaleService.update:', error);
            throw error;
        }
    }

    static async delete(id: string, userId: string) {
        return await Sale.findOneAndDelete({ _id: id, userId });
    }
}