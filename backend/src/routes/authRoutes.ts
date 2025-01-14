// src/routes/authRoutes.ts
import { AuthService } from '../services/authService';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.register(email, password);
        res.status(201).json(result);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erreur lors de l\'inscription:', error.message);
            res.status(400).json({ error: error.message });
        } else {
            console.error('Erreur inconnue lors de l\'inscription:', error);
            res.status(400).json({ error: 'Erreur inconnue' });
        }
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.login(email, password);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erreur lors de la connexion:', error.message);
            res.status(401).json({ error: error.message });
        } else {
            console.error('Erreur inconnue lors de la connexion:', error);
            res.status(401).json({ error: 'Erreur inconnue' });
        }
    }
});


export { authRouter };