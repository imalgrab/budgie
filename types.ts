export interface Expense {
  isIncome?: boolean;
  amount: number;
  title: string;
  payedBy: string;
  payedFor: string[];
  category?: string;
  date: Date;
}

export interface Budgie {
  id: number;
  title: string;
  description?: string;
  category?: string;
  currency: string;
  members: string[];
  history: Expense[];
}
