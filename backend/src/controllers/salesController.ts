import { Request, Response } from 'express';
import { SaleService } from '../services/saleService';

export class SaleController {
    static async getAllSales(req: Request, res: Response) {
        try {
            const sales = await SaleService.getAll(req.user!.userId);
            res.status(200).json(sales);
        } catch (error) {
            console.error('Error fetching sales:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getSalesAnalytics(req: Request, res: Response) {
        try {
            const analytics = await SaleService.getAnalytics(req.user!.userId);
            res.status(200).json(analytics);
        } catch (error) {
            console.error('Error fetching sales analytics:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async createSale(req: Request, res: Response) {
        try {
            const sale = await SaleService.create(req.body, req.user!.userId);
            res.status(201).json(sale);
        } catch (error) {
            console.error('Error creating sale:', error);
            res.status(400).json({ error: 'Bad Request' });
        }
    }

    static async updateSale(req: Request, res: Response) {
        try {
            const sale = await SaleService.update(req.params.id, req.body, req.user!.userId);
            if (!sale) {
                res.status(404).json({ error: 'Sale not found' });
                return;
            }
            res.status(200).json(sale);
        } catch (error) {
            console.error('Error updating sale:', error);
            res.status(400).json({ error: 'Bad Request' });
        }
    }

    static async deleteSale(req: Request, res: Response) {
        try {
            const sale = await SaleService.delete(req.params.id, req.user!.userId);
            if (!sale) {
                res.status(404).json({ error: 'Sale not found' });
                return;
            }
            res.status(200).json({ message: 'Sale successfully deleted' });
        } catch (error) {
            console.error('Error deleting sale:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}