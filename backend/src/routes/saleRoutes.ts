import { Router } from 'express';
import { auth } from '../middleware/auth';
import { SaleController } from '../controllers/salesController';

const saleRouter = Router();

saleRouter.use(auth);

saleRouter.get('/', SaleController.getAllSales);
saleRouter.get('/analytics', SaleController.getSalesAnalytics);
saleRouter.post('/', SaleController.createSale);
saleRouter.put('/:id', SaleController.updateSale);
saleRouter.delete('/:id', SaleController.deleteSale);

export default saleRouter;