import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Users } from 'lucide-react';
import type { Department, Employee } from '@/lib/definitions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DepartmentListProps {
  departments: Department[];
  employees: Employee[];
}

export function DepartmentList({ departments, employees }: DepartmentListProps) {
  const getEmployeeCount = (departmentName: string) => {
    return employees.filter((emp) => emp.department === departmentName).length;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {departments.map((dept) => (
        <Card key={dept.id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
             <div>
              <CardTitle className="font-headline">{dept.name}</CardTitle>
              <CardDescription className="flex items-center gap-1 text-xs">
                <Users className="h-3 w-3" />
                {getEmployeeCount(dept.name)} Employees
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit Department</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete Department</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            {/* Can add more department details here */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
