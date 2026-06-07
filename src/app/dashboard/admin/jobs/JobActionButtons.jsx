'use client';

import { Eye, Trash2 } from 'lucide-react';

export default function JobActionButtons({ jobId }) {
    // Handlers would be implemented here to view or delete jobs
    
    return (
        <div className="flex items-center justify-end gap-3 text-zinc-500">
            <button 
                className="hover:text-zinc-300 transition-colors p-1"
                aria-label="View Job"
            >
                <Eye size={16} />
            </button>
            <button 
                className="hover:text-danger transition-colors p-1"
                aria-label="Delete Job"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
}
