export interface Sale {
  _id: string;
  product: string;
  quantity: number;
  salePrice: number;
  unitCost: number;
  margin: number;
  date: string;
  client?: string;
  paymentMethod: 'cash' | 'card' | 'transfer';
  paymentStatus: 'pending' | 'completed' | 'cancelled';
  notes?: string;
}

export type Period = 'day' | 'week' | 'month' | 'year';

export interface SalesChartData {
  date: string;
  sales: number;
}