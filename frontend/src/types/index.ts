export interface StockItem {
  _id: string; // Changez 'id' en '_id'
  product: string;
  reference: string;
  quantity: number;
  unitPrice: number;
  salePrice: number;
  category: string;
  description?: string;
  threshold: number;
  lastUpdated: Date;
}
