import { serverFetch } from '@/lib/core/server';
import JobActionButtons from './JobActionButtons';
import React from 'react';

const JobsManagementPage = async() => {

    const jobs = await serverFetch('/api/admin/jobs');

    return (
        <div className="w-full bg-[#18181b] rounded-xl overflow-hidden border border-zinc-800 text-zinc-100">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-800 text-sm text-zinc-400 font-medium bg-[#1f1f22]">
                            <th className="py-4 px-6 font-medium">Title</th>
                            <th className="py-4 px-6 font-medium">Company</th>
                            <th className="py-4 px-6 font-medium">Category</th>
                            <th className="py-4 px-6 font-medium">Type</th>
                            <th className="py-4 px-6 font-medium">Date Posted</th>
                            <th className="py-4 px-6 font-medium">Status</th>
                            <th className="py-4 px-6 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {jobs.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="py-8 text-center text-zinc-500">
                                    No jobs found.
                                </td>
                            </tr>
                        ) : (
                            jobs.map((job) => {
                                const datePosted = job.createdAt 
                                    ? new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                    : new Date(parseInt(job._id.substring(0, 8), 16) * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                                
                                const refId = `HL-${job._id.slice(-5).toUpperCase()}`;
                                const companyName = job.companyName || job.company?.companyName || "Unknown";
                                const initial = companyName.charAt(0).toUpperCase();

                                return (
                                    <tr key={job._id} className="hover:bg-[#1f1f22] transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="font-semibold text-zinc-100">{job.jobTitle}</div>
                                            <div className="text-xs text-zinc-500 mt-1">Ref: {refId}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-300">
                                                    {initial}
                                                </div>
                                                <span className="text-zinc-300 font-medium">{companyName}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800/50 text-zinc-400 border border-zinc-700/50">
                                                {job.jobCategory || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-zinc-400 text-sm">
                                            {job.jobType || 'Full-time'}
                                        </td>
                                        <td className="py-4 px-6 text-zinc-400 text-sm">
                                            {datePosted}
                                        </td>
                                        <td className="py-4 px-6">
                                            {job.status === 'active' || job.status === 'approved' ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/30 text-emerald-500 border border-emerald-900/50">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                    ACTIVE
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800/50 text-zinc-400 border border-zinc-700/50">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
                                                    CLOSED
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <JobActionButtons jobId={job._id} />
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            
           
        </div>
    );
};

export default JobsManagementPage;