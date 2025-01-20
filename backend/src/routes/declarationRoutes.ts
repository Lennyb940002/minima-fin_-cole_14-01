import { Router, Response } from 'express';
import { auth } from '../middleware/auth';
import { DeclarationService } from '../services/declarationService';
import { AuthRequest } from '../types/auth';

// Initialisation du routeur
export const declarationRouter = Router();

// Middleware d'authentification
declarationRouter.use(auth);

// Route pour récupérer toutes les déclarations d'un utilisateur
declarationRouter.get('/', async (req: AuthRequest, res: Response) => {
    try {
        const declarations = await DeclarationService.getAll(req.user!.userId);
        res.json(declarations);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Route pour créer une nouvelle déclaration
declarationRouter.post('/', async (req: AuthRequest, res: Response) => {
    try {
        const declaration = await DeclarationService.create(req.body, req.user!.userId);
        res.status(201).json(declaration);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Route pour mettre à jour le statut d'une déclaration
declarationRouter.put('/:id/status', async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { isPaid } = req.body;
        const updatedDeclaration = await DeclarationService.updateStatus(id, isPaid);

        if (!updatedDeclaration) {
            res.status(404).send({ error: 'Declaration not found' });
            return;
        }
        res.status(200).json(updatedDeclaration);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Route pour déplacer les déclarations payées dans l'historique
declarationRouter.put('/move-to-history', async (_req: AuthRequest, res: Response) => {
    try {
        const result = await DeclarationService.moveToHistory();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});