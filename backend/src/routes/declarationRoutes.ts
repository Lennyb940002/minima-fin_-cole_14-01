// src/routes/declarationRoutes.ts
import { Router, Response } from 'express';
import { auth } from '../middleware/auth';
import { DeclarationService } from '../services/declarationService';
import { AuthRequest } from '../types/auth';

export const declarationRouter = Router();

declarationRouter.use(auth);

declarationRouter.get('/', async (req: AuthRequest, res: Response) => {
    try {
        const declarations = await DeclarationService.getAll(req.user!.userId);
        res.json(declarations);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

declarationRouter.post('/', async (req: AuthRequest, res: Response) => {
    try {
        const declaration = await DeclarationService.create(req.body, req.user!.userId);
        res.status(201).json(declaration);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});