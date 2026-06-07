
import { serverFetch } from "@/lib/core/server";
import { User, Building, ChevronDown } from "lucide-react";
import UserActionButtons from "../UserActionButtons";


const UserManagementPage = async () => {
  const users = await serverFetch(`/api/admin/users`);
  console.log(users,"users data")
  
  // Basic calculations for stats
  const activeUsers = users.filter(u => u.status !== 'suspended' && u.status !== 'deleted').length;
  const suspendedUsers = users.filter(u => u.status === 'suspended').length;
  const recruiterCount = users.filter(u => u.role === 'recruiter').length;
  
  // Calculate percentage (mocking total if 0 to avoid NaN)
  const totalUsers = users.length || 1;
  const suspendedPercentage = ((suspendedUsers / totalUsers) * 100).toFixed(1);

  return (
    <div className="w-full bg-[#0d0d0e] min-h-screen text-zinc-100 p-6 font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">User Management</h1>
          <p className="text-sm text-zinc-400 mt-1">Review, filter, and manage platform access for all users.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#18181b] border border-zinc-800 text-sm font-medium hover:bg-[#1f1f22] transition-colors">
            All Roles <ChevronDown size={16} className="text-zinc-500" />
          </button>
          <button className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors">
            Export List
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="text-xs font-medium text-zinc-400 mb-2">Total Active Users</div>
          <div className="text-3xl font-semibold mb-2">{activeUsers.toLocaleString()}</div>
          <div className="text-xs font-medium text-emerald-500">+12% vs last month</div>
        </div>
        
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="text-xs font-medium text-zinc-400 mb-2">Recruiter Growth</div>
          <div className="text-3xl font-semibold mb-2">{recruiterCount.toLocaleString()}</div>
          <div className="text-xs font-medium text-emerald-500">High demand</div>
        </div>
        
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="text-xs font-medium text-zinc-400 mb-2">Suspended Accounts</div>
          <div className="text-3xl font-semibold mb-2">{suspendedUsers}</div>
          <div className="text-xs font-medium text-zinc-500">{suspendedPercentage}% of total</div>
        </div>
        
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="text-xs font-medium text-zinc-400 mb-2">New Signups (24h)</div>
          <div className="text-3xl font-semibold mb-2">42</div>
          <div className="text-xs font-medium text-amber-500">Steady activity</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="w-full bg-[#18181b] rounded-xl overflow-hidden border border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-sm text-zinc-400 font-medium bg-[#1f1f22]">
                <th className="py-4 px-6 font-medium">User Name</th>
                <th className="py-4 px-6 font-medium">Email Address</th>
                <th className="py-4 px-6 font-medium">Role</th>
                <th className="py-4 px-6 font-medium">Join Date</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const joinDate = user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
                    : new Date(parseInt(user._id.substring(0, 8), 16) * 1000).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
                  
                  const initial = (user.name || user.email || "U").charAt(0).toUpperCase();
                  const isRecruiter = user.role === 'recruiter';
                  const isSuspended = user.status === 'suspended';

                  return (
                    <tr key={user._id} className="hover:bg-[#1f1f22] transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {user.image ? (
                            <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-zinc-700" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-300">
                              {initial}
                            </div>
                          )}
                          <span className="font-medium text-zinc-200">{user.name || "Unknown User"}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-zinc-400">
                        {user.email}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#27272a] text-zinc-300 border border-zinc-700/50">
                          {isRecruiter ? <Building size={12} className="text-zinc-400" /> : <User size={12} className="text-zinc-400" />}
                          {isRecruiter ? 'Recruiter' : 'Seeker'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-zinc-400">
                        {joinDate}
                      </td>
                      <td className="py-4 px-6">
                        {isSuspended ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-950/30 text-red-500 border border-red-900/50">
                                <span className="w-1 h-1 rounded-full bg-red-500"></span>
                                Suspended
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/30 text-emerald-500 border border-emerald-900/50">
                                <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                                Active
                            </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <UserActionButtons userId={user._id} currentRole={user.role || 'seeker'} currentStatus={user.status || 'active'} />
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

export default UserManagementPage;