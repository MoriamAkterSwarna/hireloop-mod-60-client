"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function NewUsersChart({ data }) {
  return (
    <div className="w-full h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#71717a', fontSize: 10 }}
            dy={10}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#f4f4f5' }}
            itemStyle={{ color: '#f4f4f5' }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#f4f4f5" 
            strokeWidth={3}
            dot={{ fill: '#18181b', stroke: '#f4f4f5', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#f4f4f5' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
