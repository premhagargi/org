'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Employee, Department } from '@/lib/definitions';

interface DepartmentChartProps {
  employees: Employee[];
  departments: Department[];
}

export function DepartmentChart({ employees, departments }: DepartmentChartProps) {
  const data = departments.map((dept) => ({
    name: dept.name,
    total: employees.filter((emp) => emp.department === dept.name).length,
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
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
              }}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
