'use client';

import { useRouter } from 'next/navigation';
import { toast } from '@heroui/react';
import { serverUpdate } from '@/lib/core/server';

export default function UserActionButtons({ userId, currentRole, currentStatus }) {
    const router = useRouter();

    const handleUpdate = async (updates, successMessage) => {
        try {
            const result = await serverUpdate(`/api/admin/users/${userId}`, updates);
            if (result.modifiedCount || result.matchedCount) {
                toast.success(successMessage);
                router.refresh();
            } else {
                toast.error("Failed to update user.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred.");
        }
    };

    const isSuspended = currentStatus === 'suspended';

    return (
        <div className="flex items-center justify-end gap-4 text-sm font-medium">
            {!isSuspended && (
                <button 
                    onClick={() => handleUpdate({ role: currentRole === 'recruiter' ? 'seeker' : 'recruiter' }, `User role updated to ${currentRole === 'recruiter' ? 'seeker' : 'recruiter'}!`)}
                    className="text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                    {currentRole === 'recruiter' ? 'Make Seeker' : 'Make Recruiter'}
                </button>
            )}

            {isSuspended ? (
                <>
                    <button 
                        onClick={() => handleUpdate({ status: 'active' }, "User activated!")}
                        className="text-emerald-500 hover:text-emerald-400 transition-colors"
                    >
                        Activate
                    </button>
                    <button 
                        onClick={() => handleUpdate({ status: 'deleted' }, "User deleted!")}
                        className="text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                        Delete
                    </button>
                </>
            ) : (
                <button 
                    onClick={() => handleUpdate({ status: 'suspended' }, "User suspended!")}
                    className="text-red-500 hover:text-red-400 transition-colors"
                >
                    Suspend
                </button>
            )}
        </div>
    );
}
