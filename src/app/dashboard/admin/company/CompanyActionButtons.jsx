'use client';

import { useRouter } from 'next/navigation';
import { toast } from '@heroui/react';
import { serverUpdate } from '@/lib/core/server';

export default function CompanyActionButtons({ companyId, currentStatus }) {
    const router = useRouter();

    const handleUpdate = async (status) => {
        try {
            const result = await serverUpdate(`/api/admin/companies/${companyId}`, { status });
            if (result.modifiedCount || result.matchedCount) {
                toast.success(`Company ${status} successfully!`);
                router.refresh();
            } else {
                toast.error(`Failed to ${status} company.`);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred.");
        }
    };

    return (
        <div className="flex items-center justify-end gap-3 text-sm font-medium">
            {(currentStatus === 'pending' || currentStatus === 'rejected' || !currentStatus) && (
                <button 
                    onClick={() => handleUpdate('approved')}
                    className="px-4 py-1.5 rounded bg-emerald-950/20 text-emerald-500 border border-emerald-900/50 hover:bg-emerald-950/40 transition-colors"
                >
                    Approve
                </button>
            )}

            {(currentStatus === 'pending' || currentStatus === 'approved' || !currentStatus) && (
                <button 
                    onClick={() => handleUpdate('rejected')}
                    className="px-4 py-1.5 rounded bg-red-950/20 text-red-500 border border-red-900/50 hover:bg-red-950/40 transition-colors"
                >
                    Reject
                </button>
            )}
        </div>
    );
}
