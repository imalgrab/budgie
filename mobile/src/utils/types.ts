export interface ExpenseType {
  _id: string;
  isIncome?: boolean;
  amount: number;
  title: string;
  paidBy: string;
  paidFor: string[];
  category?: string;
  date: Date;
}

export interface BudgieType {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  currency: string;
  members: string[];
  userIds: string[];
  expenses: ExpenseType[];
}
