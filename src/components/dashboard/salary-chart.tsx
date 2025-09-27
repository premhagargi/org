'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Employee } from '@/lib/definitions';

interface SalaryChartProps {
  employees: Employee[];
}

export function SalaryChart({ employees }: SalaryChartProps) {
  const salaryRanges = [
    { name: '<$80k', range: [0, 79999] },
    { name: '$80-100k', range: [80000, 100000] },
    { name: '$100-120k', range: [100001, 120000] },
    { name: '>$120k', range: [120001, Infinity] },
  ];

  const data = salaryRanges.map((range) => ({
    name: range.name,
    total: employees.filter(
      (emp) => emp.salary >= range.range[0] && emp.salary <= range.range[1]
    ).length,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salary Distribution</CardTitle>
        <CardDescription>Number of employees in different salary ranges.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
              }}
               formatter={(value) => [`${value} employees`, 'Count']}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
