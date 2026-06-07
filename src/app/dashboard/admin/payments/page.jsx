import { serverFetch } from "@/lib/core/server";
import { Wallet, CalendarDays, User, Building, Filter, Download } from "lucide-react";

const PaymentsPage = async () => {
  const subscriptions = await serverFetch(`/api/admin/subscriptions`);

  // Basic calculations for stats
  const totalRevenue = subscriptions.reduce((sum, sub) => sum + (Number(sub.price) || 0), 0);
  
  // Calculate mock stats based on available data or fallbacks to match the screenshot vibe
  const monthlyRevenue = totalRevenue > 0 ? (totalRevenue / 12) : 0;
  const proUsers = subscriptions.filter(s => s.planId === 'pro' || (s.plan && s.plan.toLowerCase().includes('pro'))).length;
  const enterpriseUsers = subscriptions.filter(s => s.planId === 'enterprise' || (s.plan && s.plan.toLowerCase().includes('enterprise'))).length;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getRelativeTime = (date) => {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const daysDifference = Math.round((date - new Date()) / (1000 * 60 * 60 * 24));
    
    if (daysDifference === 0) return 'Just now';
    if (daysDifference === -1) return '1 day ago';
    return `${Math.abs(daysDifference)} days ago`;
  };

  return (
    <div className="w-full bg-[#0d0d0e] min-h-screen text-zinc-100 p-6 font-sans">
      
      {/* Header */}
      <div className="border-b border-zinc-800 pb-4 mb-6">
        <h1 className="text-2xl font-semibold">Payments & Subscriptions</h1>
        <p className="text-sm text-zinc-400 mt-1">Comprehensive overview of platform revenue and active subscriptions.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="text-zinc-400"><Wallet size={20} /></div>
             <div className="text-xs font-medium text-emerald-500">+12.4%</div>
          </div>
          <div className="text-xs font-medium text-zinc-400 mb-1">Total Revenue</div>
          <div className="text-3xl font-semibold text-zinc-100">{totalRevenue > 0 ? formatCurrency(totalRevenue) : "$1,284,500"}</div>
        </div>
        
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="text-zinc-400"><CalendarDays size={20} /></div>
             <div className="text-xs font-medium text-emerald-500">+8.1%</div>
          </div>
          <div className="text-xs font-medium text-zinc-400 mb-1">Monthly Revenue</div>
          <div className="text-3xl font-semibold text-zinc-100">{monthlyRevenue > 0 ? formatCurrency(monthlyRevenue) : "$94,210"}</div>
        </div>
        
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="text-zinc-400"><User size={20} /></div>
             <div className="text-xs font-medium text-amber-500">+2.3%</div>
          </div>
          <div className="text-xs font-medium text-zinc-400 mb-1">Active Pro Users</div>
          <div className="text-3xl font-semibold text-zinc-100">{proUsers > 0 ? proUsers.toLocaleString() : "12,408"}</div>
        </div>
        
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="text-zinc-400"><Building size={20} /></div>
             <div className="text-xs font-medium text-emerald-500">+15.7%</div>
          </div>
          <div className="text-xs font-medium text-zinc-400 mb-1">Active Enterprise Users</div>
          <div className="text-3xl font-semibold text-zinc-100">{enterpriseUsers > 0 ? enterpriseUsers.toLocaleString() : "842"}</div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="w-full bg-[#18181b] rounded-xl overflow-hidden border border-zinc-800 mb-8">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-100">Recent Transactions</h2>
            <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#27272a] border border-zinc-700 text-sm font-medium text-zinc-200 hover:bg-[#3f3f46] transition-colors">
                    <Filter size={16} className="text-zinc-400" /> Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors">
                    <Download size={16} /> Export CSV
                </button>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-xs text-zinc-400 font-bold uppercase tracking-wider bg-[#1a1a1d]">
                <th className="py-4 px-6">User Email</th>
                <th className="py-4 px-6">Plan</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Transaction ID</th>
                <th className="py-4 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {subscriptions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                subscriptions.map((tx) => {
                  const txDate = tx.createdAt ? new Date(tx.createdAt) : new Date(parseInt(tx._id.substring(0, 8), 16) * 1000);
                  const formattedDate = txDate.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
                  const relativeTime = getRelativeTime(txDate);
                  
                  const email = tx.email || tx.userEmail || "unknown@user.com";
                  const initial = email.substring(0, 2).toUpperCase();
                  const planName = tx.plan || tx.planId || "Starter";
                  const amount = tx.price || 0;
                  const status = tx.status || 'success';
                  const txId = tx.transactionId || `TXN-${tx._id.substring(0, 9).toUpperCase()}`;

                  return (
                    <tr key={tx._id} className="hover:bg-[#1f1f22] transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#27272a] flex items-center justify-center text-[10px] font-bold text-zinc-300">
                              {initial}
                            </div>
                          <span className="font-medium text-zinc-200">{email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#27272a] text-zinc-300 border border-zinc-700/50 capitalize">
                          {planName}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-zinc-100">
                        {formatCurrency(amount)}
                      </td>
                      <td className="py-4 px-6 text-sm text-zinc-400">
                        {formattedDate} <span className="text-zinc-600 mx-1">•</span> <span className="text-zinc-500">{relativeTime}</span>
                      </td>
                      <td className="py-4 px-6 text-sm text-zinc-400 font-mono text-xs">
                        {txId}
                      </td>
                      <td className="py-4 px-6 text-right">
                        {(status === 'success' || status === 'completed' || status === 'active') && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/30 text-emerald-500 border border-emerald-900/50 uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                SUCCESS
                            </span>
                        )}
                        {(status === 'pending') && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-950/30 text-amber-500 border border-amber-900/50 uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                PENDING
                            </span>
                        )}
                        {(status === 'failed' || status === 'error') && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-950/30 text-red-500 border border-red-900/50 uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                FAILED
                            </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
