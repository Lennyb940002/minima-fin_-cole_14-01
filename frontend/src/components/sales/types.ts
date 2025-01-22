export interface Sale {
  _id: string;
  product: string;
  quantity: number;
  salePrice: number;
  unitCost: number;
  margin: number;
  date: string;
  paymentStatus: 'En attente' | 'Effectué' | 'Annulé';
}

export type Period = 'All' | 'Jour' | 'Semaine' | 'Mois';

export interface SalesChartData {
  date: string;
  sales: number;
}