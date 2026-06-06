import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import Link from 'next/link';

const ApplyPage = async ({ params }) => {
    const { id } = await params;

    const user = await getUserSession();
    console.log('Current User Session:', user);
    if (!user) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }

    if (user.role !== 'seeker') {
        return (
            <div className="w-full min-h-screen bg-zinc-950 flex flex-col justify-center items-center text-white p-6">
                <p className="text-zinc-400 text-lg">Only job seekers can apply for positions. Please sign in with a seeker account to proceed.</p>
            </div>
        );
    }

    const applications = await getApplicationsByApplicant(user.id);

    const plan = {
        name: 'Free',
        maxApplicationsPerMonth: 3
    }
    const job = await getJobById(id);


    return (
        <div>
            <h2> You have applied so far: {applications.length} out of {plan.maxApplicationsPerMonth} this month </h2>
            <p>Purchase plan to apply for more positions. <Link href="/plans">View Plans</Link> </p>
            {
                applications.length < plan.maxApplicationsPerMonth && (
                    <JobApply applicant={user} job={job} />
                )}
        </div>
    );
};

export default ApplyPage;