export interface ExpenseType {
  id: number;
  isIncome?: boolean;
  amount: number;
  title: string;
  paidBy: string;
  paidFor: string[];
  category?: string;
  date: Date;
}

export interface BudgieType {
  id: number;
  title: string;
  description?: string;
  category?: string;
  currency: string;
  members: string[];
  history: {
    id: number;
    expenses: ExpenseType[];
  };
}
