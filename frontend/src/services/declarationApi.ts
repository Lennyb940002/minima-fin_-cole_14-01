// src/services/declarationApi.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/declarations';

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

export const declarationApi = {
    getAllDeclarations: async (): Promise<any> => {
        try {
            const response = await api.get('/');
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des déclarations :', error);
            throw error;
        }
    },

    createDeclaration: async (declaration: any): Promise<any> => {
        try {
            const response = await api.post('/', declaration);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la création de la déclaration :', error);
            throw error;
        }
    }
};