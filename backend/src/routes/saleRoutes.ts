//routes/saleRoutes.ts
import { Router, Response } from 'express';
import { auth } from '../middleware/auth';
import { SaleService } from '../services/saleService';
import { AuthRequest } from '../types/auth';

export const saleRouter = Router();

saleRouter.use(auth);

saleRouter.get('/', async (req: AuthRequest, res: Response) => {
    try {
        const sales = await SaleService.getAll(req.user!.userId);
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

saleRouter.post('/', async (req: AuthRequest, res: Response) => {
    try {
        console.log('Received sale data:', req.body);
        console.log('Authenticated user:', req.user); // Log the user

        const sale = await SaleService.create(req.body, req.user!.userId);
        res.status(201).json(sale);
    } catch (error) {
        console.error('Error creating sale:', error);
        res.status(400).json({ error: (error as Error).message });
    }
});

saleRouter.put('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const sale = await SaleService.update(req.params.id, req.body, req.user!.userId);
        if (!sale) {
            res.status(404).json({ error: 'Sale not found' });
            return;
        }
        res.json(sale);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

saleRouter.delete('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const sale = await SaleService.delete(req.params.id, req.user!.userId);
        if (!sale) {
            res.status(404).json({ error: 'Sale not found' });
            return;
        }
        res.json({ message: 'Sale successfully deleted' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});