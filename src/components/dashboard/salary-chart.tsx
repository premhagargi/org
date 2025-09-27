'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Employee } from '@/lib/definitions';

interface SalaryChartProps {
  employees: Employee[];
}

export function SalaryChart({ employees }: SalaryChartProps) {
  const salaryRanges = [
    { name: '<₹60L', range: [0, 5999999] },
    { name: '₹60-80L', range: [6000000, 8000000] },
    { name: '₹80-1Cr', range: [8000001, 10000000] },
    { name: '>₹1Cr', range: [10000001, Infinity] },
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
        <CardDescription>Number of employees in different salary ranges (in INR).</CardDescription>
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
