
export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER = 'TRANSFER'
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Account {
  accountNumber: string;
  accountType: 'SAVINGS' | 'CHECKING';
  balance: number;
  customerId: string;
}

export interface Transaction {
  id: string;
  accountNumber: string;
  type: TransactionType;
  amount: number;
  timestamp: string;
  relatedAccount?: string;
  description?: string;
}

export interface BackendCodeFile {
  name: string;
  language: string;
  content: string;
}
