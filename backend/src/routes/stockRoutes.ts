// routes/stockRoutes.ts
import { Router, Response } from 'express';
import { auth } from '../middleware/auth';
import { StockService } from '../services/stockService';
import { AuthRequest } from '../types/auth';

const stockRouter = Router();

stockRouter.use(auth);

stockRouter.get('/', async (req: AuthRequest, res: Response) => {
    try {
        const stocks = await StockService.getAll(req.user!.userId);
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

stockRouter.post('/', async (req: AuthRequest, res: Response) => {
    try {
        const { name, reference, category, quantity, minQuantity, price } = req.body;
        if (!name || !reference || !category || typeof quantity !== 'number' || typeof minQuantity !== 'number' || typeof price !== 'number') {
            res.status(400).json({ error: 'Invalid data' });
        } else {
            const stock = await StockService.create(req.body, req.user!.userId);
            res.status(201).json(stock);
        }
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

stockRouter.put('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const stock = await StockService.update(req.params.id, req.body, req.user!.userId);
        if (!stock) {
            res.status(404).json({ error: 'Stock not found' });
        } else {
            res.json(stock);
        }
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

stockRouter.delete('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const stock = await StockService.delete(req.params.id, req.user!.userId);
        if (!stock) {
            res.status(404).json({ error: 'Stock not found' });
        } else {
            res.json({ message: 'Stock successfully deleted' });
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

stockRouter.get('/low-stock', async (req: AuthRequest, res: Response) => {
    try {
        const lowStock = await StockService.getLowStock(req.user!.userId);
        res.json(lowStock);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

stockRouter.get('/analytics', async (req: AuthRequest, res: Response) => {
    try {
        const analytics = await StockService.getAnalytics(req.user!.userId);
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export { stockRouter };