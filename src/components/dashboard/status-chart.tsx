'use client';

import { Pie, PieChart, ResponsiveContainer, Cell, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Employee } from '@/lib/definitions';

interface StatusChartProps {
  employees: Employee[];
}

const COLORS = ['#16a34a', '#dc2626']; // Green for active, Red for inactive

export function StatusChart({ employees }: StatusChartProps) {
  const activeCount = employees.filter((e) => e.status === 'active').length;
  const inactiveCount = employees.length - activeCount;

  const data = [
    { name: 'Active', value: activeCount },
    { name: 'Inactive', value: inactiveCount },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active vs. Inactive Employees</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={120} fill="#8884d8" dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
