export interface Declaration {
  id: string;
  type: string;
  dueDate: string;
  amount: number;
  status: 'pending' | 'submitted' | 'late';
  submissionDate?: string;
}

export interface Obligation {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}