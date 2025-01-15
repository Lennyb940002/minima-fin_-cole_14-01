export interface Sale {
  _id: string;
  product: string;
  quantity: number;
  salePrice: number;
  unitCost: number;
  margin: number;
  date: string;
  paymentMethod: 'cash' | 'card' | 'transfer';
  paymentStatus: 'En attente' | 'Terminé' | 'Annulé';
}

export type Period = 'day' | 'week' | 'month' | 'year';

export interface SalesChartData {
  date: string;
  sales: number;
}