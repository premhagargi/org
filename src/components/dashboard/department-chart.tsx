'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Department {
  _id: string;
  name: string;
  employeeCount: number;
}

interface DepartmentChartProps {
  departments: Department[];
}

export function DepartmentChart({ departments }: DepartmentChartProps) {
  console.log('DepartmentChart data:', departments);
  const data = departments.map((dept) => ({
    name: dept.name,
    total: dept.employeeCount,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employees per Department</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false}/>
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
