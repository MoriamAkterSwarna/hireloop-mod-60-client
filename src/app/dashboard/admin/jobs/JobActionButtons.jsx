'use client';

import { Eye, Check, X, Ban } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from '@heroui/react'; // Ensure toast is available, or use standard alert if not
import { serverUpdate } from '@/lib/core/server';

export default function JobActionButtons({ jobId, currentStatus }) {
    const router = useRouter();

    const handleAction = async (action) => {
        const status = await serverUpdate(`/api/admin/jobs/${jobId}`, { status: action });
        if(status.modifiedCount){
            toast.success(`Job ${action}d!`);
            router.refresh();
        }else{
            toast.error(`Failed to ${action} job!`);
        }
    };

    return (
        <div className="flex items-center justify-end gap-2 text-zinc-500">
            <button 
                className="hover:text-zinc-300 transition-colors p-1"
                aria-label="View Job"
                title="View"
            >
                <Eye size={16} />
            </button>
            
            {currentStatus !== 'active' && currentStatus !== 'approved' && (
                <button 
                    onClick={() => handleAction('approve')}
                    className="hover:text-emerald-500 transition-colors p-1"
                    aria-label="Approve Job"
                    title="Approve"
                >
                    <Check size={16} />
                </button>
            )}

            {currentStatus !== 'rejected' && (
                <button 
                    onClick={() => handleAction('reject')}
                    className="hover:text-red-500 transition-colors p-1"
                    aria-label="Reject Job"
                    title="Reject"
                >
                    <X size={16} />
                </button>
            )}

            {currentStatus !== 'disabled' && (
                <button 
                    onClick={() => handleAction('disable')}
                    className="hover:text-orange-500 transition-colors p-1"
                    aria-label="Disable Job"
                    title="Disable"
                >
                    <Ban size={16} />
                </button>
            )}
        </div>
    );
}
