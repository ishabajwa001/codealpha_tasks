
import { Customer, Account, Transaction, TransactionType } from '../types';

// Mock DB stored in localStorage for persistence during the session
class MockBackendService {
  private customers: Customer[];
  private accounts: Account[];
  private transactions: Transaction[];

  constructor() {
    this.customers = JSON.parse(localStorage.getItem('arbor_bank_customers_v2') || '[]');
    this.accounts = JSON.parse(localStorage.getItem('arbor_bank_accounts_v2') || '[]');
    this.transactions = JSON.parse(localStorage.getItem('arbor_bank_transactions_v2') || '[]');

    if (this.customers.length === 0) {
      this.seedInitialData();
    }
  }

  private seedInitialData() {
    console.log("Seeding initial banking data...");
    // Initial data cleared as per request
    this.customers = [];
    this.accounts = [];
    this.transactions = [];
    this.save();
  }

  private save() {
    localStorage.setItem('arbor_bank_customers_v2', JSON.stringify(this.customers));
    localStorage.setItem('arbor_bank_accounts_v2', JSON.stringify(this.accounts));
    localStorage.setItem('arbor_bank_transactions_v2', JSON.stringify(this.transactions));
  }

  async createCustomer(data: Omit<Customer, 'id'>): Promise<Customer> {
    const newCustomer = { ...data, id: `CUST-${Date.now()}` };
    this.customers.push(newCustomer);
    this.save();
    return newCustomer;
  }

  async createAccount(data: Omit<Account, 'accountNumber' | 'balance'>): Promise<Account> {
    const newAccount: Account = {
      ...data,
      accountNumber: `ACC-${Math.floor(100000 + Math.random() * 900000)}`,
      balance: 0
    };
    this.accounts.push(newAccount);
    this.save();
    return newAccount;
  }

  async getCustomers(): Promise<Customer[]> {
    return [...this.customers];
  }

  async getAccountsByCustomer(customerId: string): Promise<Account[]> {
    return this.accounts.filter(a => a.customerId === customerId);
  }

  async getAccountByNumber(accountNumber: string): Promise<Account | undefined> {
    return this.accounts.find(a => a.accountNumber === accountNumber);
  }

  async deposit(accountNumber: string, amount: number): Promise<Transaction> {
    const account = this.accounts.find(a => a.accountNumber === accountNumber);
    if (!account) throw new Error("Account not found");
    if (amount <= 0) throw new Error("Invalid amount");

    account.balance += amount;
    const tx: Transaction = {
      id: `TX-${Date.now()}`,
      accountNumber,
      amount,
      type: TransactionType.DEPOSIT,
      timestamp: new Date().toISOString(),
      description: 'Cash Deposit'
    };
    this.transactions.push(tx);
    this.save();
    return tx;
  }

  async withdraw(accountNumber: string, amount: number): Promise<Transaction> {
    const account = this.accounts.find(a => a.accountNumber === accountNumber);
    if (!account) throw new Error("Account not found");
    if (amount <= 0) throw new Error("Invalid amount");
    if (account.balance < amount) throw new Error("Insufficient funds");

    account.balance -= amount;
    const tx: Transaction = {
      id: `TX-${Date.now()}`,
      accountNumber,
      amount,
      type: TransactionType.WITHDRAWAL,
      timestamp: new Date().toISOString(),
      description: 'Atm Withdrawal'
    };
    this.transactions.push(tx);
    this.save();
    return tx;
  }

  async transfer(fromNumber: string, toNumber: string, amount: number): Promise<Transaction[]> {
    const fromAcc = this.accounts.find(a => a.accountNumber === fromNumber);
    const toAcc = this.accounts.find(a => a.accountNumber === toNumber);

    if (!fromAcc || !toAcc) throw new Error("One or both accounts not found");
    if (fromAcc.accountNumber === toAcc.accountNumber) throw new Error("Cannot transfer to the same account");
    if (amount <= 0) throw new Error("Invalid amount");
    if (fromAcc.balance < amount) throw new Error("Insufficient funds");

    fromAcc.balance -= amount;
    toAcc.balance += amount;

    const txFrom: Transaction = {
      id: `TX-${Date.now()}-A`,
      accountNumber: fromNumber,
      amount,
      type: TransactionType.TRANSFER,
      timestamp: new Date().toISOString(),
      relatedAccount: toNumber,
      description: `Transfer to ${toNumber}`
    };

    const txTo: Transaction = {
      id: `TX-${Date.now()}-B`,
      accountNumber: toNumber,
      amount,
      type: TransactionType.TRANSFER,
      timestamp: new Date().toISOString(),
      relatedAccount: fromNumber,
      description: `Transfer from ${fromNumber}`
    };

    this.transactions.push(txFrom, txTo);
    this.save();
    return [txFrom, txTo];
  }

  async getTransactions(accountNumber: string): Promise<Transaction[]> {
    return this.transactions
      .filter(t => t.accountNumber === accountNumber)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }
}

export const mockBackend = new MockBackendService();
