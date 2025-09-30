'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface SalaryChartProps {
  salaryDistribution: {
    [range: string]: number;
  };
}

export function SalaryChart({ salaryDistribution }: SalaryChartProps) {
  
  const formatRange = (range: string) => {
    if (range.includes('-')) {
      const [start, end] = range.split('-');
      return `₹${parseInt(start) / 1000}k-₹${parseInt(end) / 1000}k`;
    }
    return `₹${parseInt(range) / 1000}k+`;
  }

  const data = Object.entries(salaryDistribution).map(([range, count]) => ({
    name: formatRange(range),
    total: count,
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
