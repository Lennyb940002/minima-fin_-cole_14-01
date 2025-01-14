// routes/productRoutes.ts
import { Router, Response } from 'express';
import { auth } from '../middleware/auth';
import { ProductService } from '../services/productService';
import { AuthRequest } from '../types/auth';

const productRouter = Router();

productRouter.use(auth);

productRouter.get('/', async (req: AuthRequest, res: Response) => {
    try {
        const products = await ProductService.getAll(req.user!.userId);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

productRouter.post('/', async (req: AuthRequest, res: Response) => {
    try {
        const product = await ProductService.create(req.body, req.user!.userId);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

productRouter.put('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const product = await ProductService.update(req.params.id, req.body, req.user!.userId);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

productRouter.delete('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const product = await ProductService.delete(req.params.id, req.user!.userId);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json({ message: 'Product successfully deleted' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export { productRouter };