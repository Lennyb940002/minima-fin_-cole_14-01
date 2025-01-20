import axios from 'axios';

const API_URL = 'http://localhost:3001/api/declarations';

// Crée une instance d'axios avec une configuration de base
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Ajoute un intercepteur pour inclure le token d'authentification dans les en-têtes des requêtes
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Définition de l'API des déclarations
export const declarationApi = {
    // Récupère toutes les déclarations
    getAllDeclarations: async (): Promise<any> => {
        try {
            console.log('Fetching all declarations...');
            const response = await api.get('/');
            console.log('Fetched declarations:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des déclarations :', error);
            throw error;
        }
    },

    // Crée une nouvelle déclaration
    createDeclaration: async (declaration: any): Promise<any> => {
        try {
            console.log('Creating a new declaration with data:', declaration);
            const response = await api.post('/', declaration);
            console.log('Created declaration:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la création de la déclaration :', error);
            throw error;
        }
    },

    // Met à jour le statut d'une déclaration
    updateDeclarationStatus: async (id: string, isPaid: boolean): Promise<any> => {
        try {
            console.log(`Updating status of declaration with ID ${id} to isPaid: ${isPaid}`);
            const response = await api.put(`/${id}/status`, { isPaid });
            console.log('Updated declaration status:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut de la déclaration :', error);
            throw error;
        }
    }
};