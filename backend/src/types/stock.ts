// types/stock.ts
export interface IStock {
    reference: string;
    name: string;
    description?: string;
    quantity: number;
    minQuantity: number;
    price: number;
    category: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IStockAnalytics {
    totalItems: number;
    totalValue: number;
    lowStockItems: number;
    categoryCounts: Record<string, number>;
    averagePrice: number;
}
