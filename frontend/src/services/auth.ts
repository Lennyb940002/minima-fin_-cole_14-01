// services/auth.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const authApi = {
    login: async (email: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user._id);
            return { token, user };
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            throw error;
        }
    },

    register: async (email: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user._id);
            return { token, user };
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            console.error('Erreur lors de l\'inscription:', error.response?.data || error.message);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    getToken: () => {
        return localStorage.getItem('token');
    }
};

// Configurer axios pour inclure le token dans toutes les requêtes
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Intercepteur pour gérer les erreurs d'authentification
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            authApi.logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);