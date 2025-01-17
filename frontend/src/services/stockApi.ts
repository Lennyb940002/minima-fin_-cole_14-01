import axios from 'axios';
import type { StockItem, StockAnalytics } from '../components/stock/types';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour ajouter le token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const stockApi = {
    getAllStock: async (): Promise<StockItem[]> => {
        try {
            const response = await api.get('/stock');
            return response.data.map((item: any) => ({
                id: item._id,
                reference: item.reference,
                name: item.name,
                category: item.category,
                quantity: item.quantity,
                minQuantity: item.minQuantity,
                price: item.price,
                description: item.description,
                createdAt: new Date(item.createdAt),
                updatedAt: new Date(item.updatedAt),
                product: item.name,
                unitPrice: item.price,
                salePrice: item.price,
                threshold: item.minQuantity,
                lastUpdated: new Date(item.updatedAt),
            }));
        } catch (error) {
            console.error('Erreur lors de la récupération des stocks :', error);
            throw error;
        }
    },

    createStock: async (stock: Omit<StockItem, 'id'>): Promise<StockItem> => {
        try {
            // Ajoutez une vérification ici pour vous assurer que toutes les propriétés sont définies
            if (!stock.product || !stock.reference || stock.quantity === undefined || stock.unitPrice === undefined || stock.salePrice === undefined || !stock.category || stock.threshold === undefined) {
                throw new Error('Missing required fields');
            }

            const response = await api.post('/stock', stock);
            return {
                id: response.data._id,
                ...stock,
                createdAt: new Date(response.data.createdAt),
                updatedAt: new Date(response.data.updatedAt),
                lastUpdated: new Date(response.data.updatedAt),
            };
        } catch (error) {
            console.error('Erreur lors de la création du stock :', error);
            throw error;
        }
    },

    updateStock: async (id: string, updateData: Partial<StockItem>): Promise<StockItem> => {
        try {
            const response = await api.put(`/stock/${id}`, updateData);
            return {
                id: response.data._id,
                ...updateData,
                createdAt: new Date(response.data.createdAt),
                updatedAt: new Date(response.data.updatedAt),
                lastUpdated: new Date(response.data.updatedAt),
            } as StockItem;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du stock :', error);
            throw error;
        }
    },

    deleteStock: async (id: string): Promise<void> => {
        try {
            await api.delete(`/stock/${id}`);
        } catch (error) {
            console.error('Erreur lors de la suppression du stock :', error);
            throw error;
        }
    },

    getLowStock: async (): Promise<StockItem[]> => {
        try {
            const response = await api.get('/stock/low-stock');
            return response.data.map((item: any) => ({
                id: item._id,
                reference: item.reference,
                name: item.name,
                category: item.category,
                quantity: item.quantity,
                minQuantity: item.minQuantity,
                price: item.price,
                description: item.description,
                createdAt: new Date(item.createdAt),
                updatedAt: new Date(item.updatedAt),
                product: item.name,
                unitPrice: item.price,
                salePrice: item.price,
                threshold: item.minQuantity,
                lastUpdated: new Date(item.updatedAt),
            }));
        } catch (error) {
            console.error('Erreur lors de la récupération des stocks faibles :', error);
            throw error;
        }
    },

    getAnalytics: async (): Promise<StockAnalytics> => {
        try {
            const response = await api.get('/stock/analytics');
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des analytics :', error);
            throw error;
        }
    }
};