import { serverFetch } from "@/lib/core/server";
import { Filter, Plus, ClipboardList, CheckCircle2, Ban } from "lucide-react";
import CompanyActionButtons from "./CompanyActionButtons";

const CompanyManagementPage = async () => {
  const companies = await serverFetch(`/api/admin/companies`);

  // Basic calculations for stats
  const pendingCount = companies.filter(c => c.status === 'pending' || !c.status).length;
  const approvedCount = companies.filter(c => c.status === 'approved').length;
  const rejectedCount = companies.filter(c => c.status === 'rejected').length;

  return (
    <div className="w-full bg-[#0d0d0e] min-h-screen text-zinc-100 p-6 font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Company Registrations</h1>
          <p className="text-sm text-zinc-400 mt-1">Review and manage corporate entity access requests for the HireLoop ecosystem.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#27272a] border border-zinc-700 text-sm font-medium text-zinc-200 hover:bg-[#3f3f46] transition-colors">
            <Filter size={16} className="text-zinc-400" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors">
            <Plus size={16} /> Register New
          </button>
        </div>
      </div>

      {/* Companies Table */}
      <div className="w-full bg-[#18181b] rounded-xl overflow-hidden border border-zinc-800 mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-sm text-zinc-400 font-medium bg-[#1f1f22]">
                <th className="py-4 px-6 font-medium">Company Name</th>
                <th className="py-4 px-6 font-medium">Recruiter Email</th>
                <th className="py-4 px-6 font-medium">Industry</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Date Submitted</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {companies.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-500">
                    No companies found.
                  </td>
                </tr>
              ) : (
                companies.map((company) => {
                  const submitDate = company.createdAt
                    ? new Date(company.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
                    : new Date(parseInt(company._id.substring(0, 8), 16) * 1000).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
                  
                  const initial = (company.name || company.companyName || "C").substring(0, 2).toUpperCase();
                  const status = company.status || 'pending';

                  return (
                    <tr key={company._id} className="hover:bg-[#1f1f22] transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {company.logo ? (
                            <img src={company.logo} alt={company.name} className="w-8 h-8 rounded object-cover border border-zinc-700" />
                          ) : (
                            <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300">
                              {initial}
                            </div>
                          )}
                          <span className="font-semibold text-zinc-200">{company.name || company.companyName || "Unknown Company"}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-zinc-400">
                        {company.email || company.recruiterEmail || "N/A"}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#27272a] text-zinc-400 border border-zinc-700/50">
                          {company.industry || 'Technology'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {status === 'pending' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-amber-500">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                Pending
                            </span>
                        )}
                        {status === 'approved' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-emerald-500">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Approved
                            </span>
                        )}
                        {status === 'rejected' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-red-500">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                Rejected
                            </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm text-zinc-400">
                        {submitDate}
                      </td>
                      <td className="py-4 px-6">
                        <CompanyActionButtons companyId={company._id} currentStatus={status} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="text-amber-500"><ClipboardList size={20} /></div>
             <div className="text-xs font-medium text-emerald-500">+12% vs last week</div>
          </div>
          <div className="text-xs font-bold text-zinc-400 tracking-wider mb-1 uppercase">Pending Review</div>
          <div className="text-3xl font-semibold text-zinc-100">{pendingCount}</div>
        </div>
        
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="text-emerald-500"><CheckCircle2 size={20} /></div>
             <div className="text-xs font-medium text-emerald-500">+5% vs last week</div>
          </div>
          <div className="text-xs font-bold text-zinc-400 tracking-wider mb-1 uppercase">Approved Partners</div>
          <div className="text-3xl font-semibold text-zinc-100">{approvedCount}</div>
        </div>
        
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="text-red-500"><Ban size={20} /></div>
             <div className="text-xs font-medium text-zinc-400">Stable</div>
          </div>
          <div className="text-xs font-bold text-zinc-400 tracking-wider mb-1 uppercase">Total Rejections</div>
          <div className="text-3xl font-semibold text-zinc-100">{rejectedCount}</div>
        </div>
      </div>

    </div>
  );
};

export default CompanyManagementPage;