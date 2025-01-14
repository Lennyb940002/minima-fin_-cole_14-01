import { Stock } from '../models/Stock';

export class StockService {
    static async getAll(userId: string) {
        return await Stock.find({ userId }).sort({ createdAt: -1 });
    }

    static async create(stockData: any, userId: string) {
        const stock = new Stock({
            ...stockData,
            userId
        });
        return await stock.save();
    }

    static async update(id: string, stockData: any, userId: string) {
        return await Stock.findOneAndUpdate(
            { _id: id, userId },
            stockData,
            { new: true }
        );
    }

    static async delete(id: string, userId: string) {
        return await Stock.findOneAndDelete({ _id: id, userId });
    }

    static async getLowStock(userId: string) {
        return await Stock.find({
            userId,
            $expr: {
                $lte: ["$quantity", "$minQuantity"]
            }
        });
    }

    static async getAnalytics(userId: string) {
        const totalItems = await Stock.countDocuments({ userId });
        const totalValue = await Stock.aggregate([
            { $match: { userId } },
            { $group: { _id: null, total: { $sum: { $multiply: ["$quantity", "$price"] } } } }
        ]);
        const lowStockItems = await Stock.countDocuments({ userId, $expr: { $lte: ["$quantity", "$minQuantity"] } });
        return {
            totalItems,
            totalValue: totalValue[0]?.total || 0,
            lowStockItems
        };
    }
}