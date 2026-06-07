// src/app/dashboard/admin/stats/page.jsx
// Premium admin statistics dashboard

import React from "react";
import { serverFetch } from "@/lib/core/server";

export default async function AdminStatsPage() {

  const stats = await serverFetch("/api/admin/stats")


    
  return (
    <section className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-foreground">
        Admin Dashboard – Overview
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Jobs" value={stats.totalJobs} />
        <StatCard title="Total Applications" value={stats.totalApplications} />
        <StatCard title="Pending Jobs" value={stats.pendingJobs} />
        <StatCard title="Revenue" value={`$${stats.totalRevenue}`} />
      </div>
    </section>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-xl bg-default p-4 shadow-sm">
      <h2 className="text-sm font-medium text-muted">{title}</h2>
      <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
    </div>
  );
}
