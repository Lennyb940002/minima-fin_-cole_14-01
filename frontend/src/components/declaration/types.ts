export interface Sale {
  _id: string;
  userId: string;
  product: string;
  quantity: number;
  salePrice: number;
  unitCost?: number;
  paymentStatus: string;
  date: string;
  margin: number;
  decStatus: string;
  __v?: number;
}

export interface Declaration {
  _id: string;
  date: string;
  amount: number;
  payment: number;
  isPaid: boolean;
  sales: Sale[];
  status?: string;
  lastModified?: Date;
  type?: string;
  dueDate?: Date;
}