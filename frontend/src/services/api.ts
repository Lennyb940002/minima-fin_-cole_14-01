// api.js or api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/sales';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const salesApi = {
    getAllSales: async (): Promise<any> => {
        try {
            const response = await api.get('/');
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des ventes :', error);
            throw error;
        }
    },

    getSalesAnalytics: async (): Promise<any> => {
        try {
            const response = await api.get('/analytics');
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des analyses des ventes :', error);
            throw error;
        }
    },

    createSale: async (sale: any): Promise<any> => {
        try {
            const response = await api.post('/', sale);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la création de la vente :', error);
            throw error;
        }
    },

    updateSale: async (id: string, sale: Partial<any>): Promise<any> => {
        try {
            const response = await api.put(`/${id}`, sale);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la vente :', error);
            throw error;
        }
    },

    deleteSale: async (id: string): Promise<void> => {
        try {
            await api.delete(`/${id}`);
        } catch (error) {
            console.error('Erreur lors de la suppression de la vente :', error);
            throw error;
        }
    },
};