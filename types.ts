export interface Budgie {
  title: string;
  description?: string;
  category?: 'trip' | 'house' | 'couple' | 'party' | 'project' | 'other';
  currency: 'PLN' | 'EUR' | 'GBP' | 'USD' | 'CHF';
  members: string[];
}
