// components/stock/types
export interface StockItem {
  id: string;
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

export interface StockAnalytics {
  totalProducts: number;
  totalValue: number;
  lowStockCount: number;
}

export interface StockFilter {
  searchTerm: string;
  category: string;
  showLowStock: boolean;
}
