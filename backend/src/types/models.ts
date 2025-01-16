// types/models.ts
import { Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    role: 'admin' | 'user';
    createdAt: Date;
    updatedAt: Date;
    comparePassword(password: string): Promise<boolean>;
}

export interface ISale extends Document {
    userId: string;
    productName: string;
    quantity: number;
    sellingPrice: number;
    purchasePrice: number;
    status: 'En attente' | 'Effectué' | 'Annulé';
    paymentMethod: 'cash' | 'card' | 'transfer';
    customerName?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IStock extends Document {
    userId: string;
    reference: string;
    name: string;
    description?: string;
    quantity: number;
    minQuantity: number;
    price: number;
    category: string;
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
