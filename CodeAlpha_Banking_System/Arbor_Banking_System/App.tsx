
import React, { useState, useEffect, useCallback } from 'react';
import {
  Building2,
  Users,
  Wallet,
  ArrowLeftRight,
  History,
  Code2,
  Plus,
  ArrowUpCircle,
  ArrowDownCircle,
  Menu,
  X,
  CreditCard,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Activity,
  ArrowRight
} from 'lucide-react';
import { Customer, Account, Transaction, TransactionType } from './types';
import { mockBackend } from './services/MockBackendService';


// --- Components ---

const Navbar: React.FC<{ onMenuToggle: () => void }> = ({ onMenuToggle }) => (
  <nav className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 border-b border-emerald-800">
    <div className="flex items-center gap-3">
      <div className="bg-white p-2 rounded-lg">
        <Building2 className="w-6 h-6 text-emerald-900" />
      </div>
      <h1 className="text-xl font-bold tracking-tight">ARBOR BANKING</h1>
    </div>
    <div className="flex items-center gap-6">
      <div className="hidden md:flex items-center gap-2 text-emerald-100 text-sm">
        <ShieldCheck className="w-4 h-4" />
        <span>Secure Session</span>
      </div>
      <button
        onClick={onMenuToggle}
        className="p-2 hover:bg-emerald-800 rounded-lg md:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>
    </div>
  </nav>
);

const Sidebar: React.FC<{ activeView: string, setActiveView: (v: string) => void, isOpen: boolean, onClose: () => void }> = ({ activeView, setActiveView, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Wallet },
    { id: 'management', label: 'Management', icon: Users },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'history', label: 'Activity Logs', icon: History },
  ];

  return (
    <div className={`
      fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out md:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:relative md:flex md:flex-col pt-20 md:pt-6
    `}>
      <div className="px-6 mb-8 hidden md:block">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Navigation</p>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { setActiveView(item.id); onClose(); }}
            className={`
              w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
              ${activeView === item.id ? 'bg-emerald-600/20 text-emerald-400 font-medium' : 'hover:bg-slate-800 hover:text-white'}
            `}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 mt-auto border-t border-slate-800">
        <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-emerald-950 font-bold">
            IJ
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">Isha Javed</p>
            <p className="text-xs text-slate-400 truncate">System Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardView: React.FC<{ accounts: Account[], customers: Customer[], onNavigate: (view: string) => void }> = ({ accounts, customers, onNavigate }) => {
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    mockBackend.getAllTransactions().then(txs => setAllTransactions(txs.slice(0, 10)));
  }, [accounts]);

  // Only show the 5 most recent accounts
  const recentAccounts = accounts.slice(-5).reverse();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <CreditCard className="w-32 h-32 text-emerald-900" />
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">Total Assets Under Management</h3>
          <p className="text-4xl font-bold text-slate-900">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          <div className="mt-6 flex gap-4">
            <div className="flex-1 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <p className="text-xs text-emerald-700 font-medium uppercase">Active Accounts</p>
              <p className="text-2xl font-bold text-emerald-900">{accounts.length}</p>
            </div>
            <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-700 font-medium uppercase">Total Customers</p>
              <p className="text-2xl font-bold text-slate-900">{customers.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Accounts Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Most Recent Accounts</h3>
            <button
              onClick={() => onNavigate('management')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-1"
            >
              Management <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-slate-100 flex-1">
            {recentAccounts.length === 0 ? (
              <div className="p-12 text-center">
                <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-slate-400 italic text-sm">No accounts found.</p>
                <button
                  onClick={() => onNavigate('management')}
                  className="mt-4 text-emerald-600 font-bold text-xs uppercase tracking-wider"
                >
                  Create Your First Account
                </button>
              </div>
            ) : (
              recentAccounts.map(acc => {
                const owner = customers.find(c => c.id === acc.customerId);
                return (
                  <div key={acc.accountNumber} className="p-5 hover:bg-slate-50 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${acc.accountType === 'SAVINGS' ? 'bg-amber-50' : 'bg-emerald-50'}`}>
                        <Wallet className={`w-6 h-6 ${acc.accountType === 'SAVINGS' ? 'text-amber-600' : 'text-emerald-600'}`} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm tracking-tight">{acc.accountNumber}</p>
                        <p className="text-xs text-slate-500 font-medium uppercase">{acc.accountType} • {owner?.name || 'Unknown'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">${acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 uppercase">
                        Verified
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {accounts.length > 5 && (
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
              <button
                onClick={() => onNavigate('history')}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Viewing 5 of {accounts.length} accounts
              </button>
            </div>
          )}
        </div>

        {/* Recent System Events Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              Real-time Audit Log
            </h3>
            <button
              onClick={() => onNavigate('history')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1"
            >
              Full Log <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-slate-100 flex-1">
            {allTransactions.length === 0 ? (
              <div className="p-12 text-center text-slate-400 italic text-sm">No system events logged.</div>
            ) : (
              allTransactions.map(tx => (
                <div key={tx.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${tx.type === TransactionType.DEPOSIT ? 'bg-emerald-50' : 'bg-slate-100'}`}>
                      {tx.type === TransactionType.DEPOSIT ? (
                        <ArrowUpCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <ArrowDownCircle className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{tx.description || tx.type}</p>
                      <p className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">{tx.accountNumber} • {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${tx.type === TransactionType.DEPOSIT ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {tx.type === TransactionType.DEPOSIT ? '+' : '-'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ManagementView: React.FC<{ onRefresh: () => void }> = ({ onRefresh }) => {
  const [activeTab, setActiveTab] = useState<'customer' | 'account'>('customer');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [customerData, setCustomerData] = useState({ name: '', email: '', phone: '' });
  const [accountData, setAccountData] = useState({ customerId: '', accountType: 'SAVINGS' as 'SAVINGS' | 'CHECKING' });

  useEffect(() => {
    mockBackend.getCustomers().then(setCustomers);
  }, []);

  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await mockBackend.createCustomer(customerData);
      setSuccessMsg('Customer successfully onboarded');
      setCustomerData({ name: '', email: '', phone: '' });
      const updated = await mockBackend.getCustomers();
      setCustomers(updated);
      onRefresh();
    } catch (err) {
      alert("Error creating customer");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountData.customerId) return alert("Select a customer");
    setLoading(true);
    try {
      await mockBackend.createAccount(accountData);
      setSuccessMsg('Account successfully provisioned');
      setAccountData({ customerId: '', accountType: 'SAVINGS' });
      onRefresh();
    } catch (err) {
      alert("Error creating account");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex gap-1 bg-slate-200 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('customer')}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'customer' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          New Customer
        </button>
        <button
          onClick={() => setActiveTab('account')}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'account' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Open Account
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8">
          {activeTab === 'customer' ? (
            <form onSubmit={handleCreateCustomer} className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Onboard New Client</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="e.g. Alice Smith"
                    value={customerData.name}
                    onChange={e => setCustomerData({ ...customerData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="alice@example.com"
                    value={customerData.email}
                    onChange={e => setCustomerData({ ...customerData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <input
                    required
                    type="tel"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                    value={customerData.phone}
                    onChange={e => setCustomerData({ ...customerData, phone: e.target.value })}
                  />
                </div>
              </div>
              <button
                disabled={loading}
                className="bg-emerald-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Register Customer'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleCreateAccount} className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Open New Financial Account</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Select Customer</label>
                  <select
                    required
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    value={accountData.customerId}
                    onChange={e => setAccountData({ ...accountData, customerId: e.target.value })}
                  >
                    <option value="">Choose a customer...</option>
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Account Type</label>
                  <select
                    required
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    value={accountData.accountType}
                    onChange={e => setAccountData({ ...accountData, accountType: e.target.value as 'SAVINGS' | 'CHECKING' })}
                  >
                    <option value="SAVINGS">Savings Account (Yield)</option>
                    <option value="CHECKING">Checking Account (Transact)</option>
                  </select>
                </div>
              </div>
              <button
                disabled={loading}
                className="bg-emerald-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Provision Account'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const TransactionView: React.FC<{ accounts: Account[], onRefresh: () => void }> = ({ accounts, onRefresh }) => {
  const [type, setType] = useState<TransactionType>(TransactionType.DEPOSIT);
  const [fromAcc, setFromAcc] = useState('');
  const [toAcc, setToAcc] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return setStatus({ type: 'error', message: "Invalid amount provided." });

    setLoading(true);
    setStatus(null);
    try {
      if (type === TransactionType.DEPOSIT) {
        await mockBackend.deposit(fromAcc, val);
      } else if (type === TransactionType.WITHDRAWAL) {
        await mockBackend.withdraw(fromAcc, val);
      } else {
        await mockBackend.transfer(fromAcc, toAcc, val);
      }
      setAmount('');
      onRefresh();
      setStatus({ type: 'success', message: `Transaction of $${val.toLocaleString()} successful.` });
      setTimeout(() => setStatus(null), 5000);
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || "Transaction failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-emerald-50 p-3 rounded-xl">
            <ArrowLeftRight className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Secure Capital Transfer</h2>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Authorized Operations Only</p>
          </div>
        </div>

        {status && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${status.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
            <span className="font-medium text-sm">{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Operation Category</label>
            <div className="grid grid-cols-3 gap-2">
              {[TransactionType.DEPOSIT, TransactionType.WITHDRAWAL, TransactionType.TRANSFER].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { setType(t); setStatus(null); }}
                  className={`py-3 rounded-lg text-xs font-bold transition-all border ${type === t ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                {type === TransactionType.TRANSFER ? 'Funding Account' : 'Target Account'}
              </label>
              <select
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-900"
                value={fromAcc}
                onChange={e => setFromAcc(e.target.value)}
              >
                <option value="">Choose account...</option>
                {accounts.map(acc => (
                  <option key={acc.accountNumber} value={acc.accountNumber}>
                    {acc.accountNumber} — Available: ${acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </option>
                ))}
              </select>
            </div>

            {type === TransactionType.TRANSFER && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <label className="text-sm font-medium text-slate-700">Recipient Account</label>
                <select
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-900"
                  value={toAcc}
                  onChange={e => setToAcc(e.target.value)}
                >
                  <option value="">Choose recipient...</option>
                  {accounts.map(acc => (
                    <option key={acc.accountNumber} value={acc.accountNumber}>
                      {acc.accountNumber}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Transaction Amount ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0.01"
                  className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-lg font-bold text-slate-900"
                  placeholder="0.00"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-emerald-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-800 transition-all shadow-md shadow-emerald-900/10 disabled:opacity-50"
          >
            {loading ? 'Validating SSL Connection...' : 'Confirm & Execute'}
          </button>
        </form>
      </div>
    </div>
  );
};

const HistoryView: React.FC<{ accounts: Account[] }> = ({ accounts }) => {
  const [selectedAcc, setSelectedAcc] = useState('');
  const [txHistory, setTxHistory] = useState<Transaction[]>([]);

  useEffect(() => {
    if (selectedAcc) {
      mockBackend.getTransactions(selectedAcc).then(setTxHistory);
    }
  }, [selectedAcc, accounts]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Account Audit Trail</h2>
          <p className="text-slate-500 text-sm">Select an account to view full transaction records</p>
        </div>
        <select
          className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none w-full md:w-64 focus:ring-2 focus:ring-emerald-500 transition-all"
          value={selectedAcc}
          onChange={e => setSelectedAcc(e.target.value)}
        >
          <option value="">Select account...</option>
          {accounts.map(acc => (
            <option key={acc.accountNumber} value={acc.accountNumber}>{acc.accountNumber} (${acc.balance.toLocaleString()})</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Timestamp</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Transaction ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Type</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Description</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {!selectedAcc ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">Please select an account to view history.</td>
              </tr>
            ) : txHistory.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">No transactions recorded for this account.</td>
              </tr>
            ) : (
              txHistory.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-500">{new Date(tx.timestamp).toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-mono text-slate-600">{tx.id}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tx.type === TransactionType.DEPOSIT ? 'bg-emerald-50 text-emerald-700' :
                      tx.type === TransactionType.WITHDRAWAL ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{tx.description || tx.type}</td>
                  <td className={`px-6 py-4 text-sm font-bold text-right ${tx.type === TransactionType.DEPOSIT ? 'text-emerald-600' : 'text-slate-900'
                    }`}>
                    {tx.type === TransactionType.DEPOSIT ? '+' : '-'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const refreshData = useCallback(async () => {
    const custs = await mockBackend.getCustomers();
    setCustomers(custs);

    const allAccs: Account[] = [];
    for (const c of custs) {
      const accs = await mockBackend.getAccountsByCustomer(c.id);
      allAccs.push(...accs);
    }
    setAccounts(allAccs);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView accounts={accounts} customers={customers} onNavigate={setActiveView} />;
      case 'management': return <ManagementView onRefresh={refreshData} />;
      case 'transactions': return <TransactionView accounts={accounts} onRefresh={refreshData} />;
      case 'history': return <HistoryView accounts={accounts} />;
      default: return <DashboardView accounts={accounts} customers={customers} onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 relative">
        {/* Overlay for mobile menu */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:p-10 max-w-7xl mx-auto w-full">
          <header className="mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 capitalize tracking-tight">{activeView.replace('-', ' ')}</h2>
            <p className="text-slate-500 mt-2 font-medium">
              {activeView === 'dashboard' && 'Holistic view of current banking status and system health.'}
              {activeView === 'management' && 'Onboard new clients and provision financial products.'}
              {activeView === 'transactions' && 'Securely process capital movement between internal accounts.'}
              {activeView === 'history' && 'Auditable records of all financial events within the system.'}
            </p>
          </header>

          {renderView()}
        </main>
      </div>

      <footer className="bg-white border-t border-slate-200 py-6 px-10 text-center text-slate-500 text-xs">
        <p>&copy; {new Date().getFullYear()} Arbor Banking Infrastructure. Built with High-Integrity C++ Backend Architecture.</p>
      </footer>
    </div>
  );
}
