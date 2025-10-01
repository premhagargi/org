import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Users } from 'lucide-react';
import type { Department } from '@/lib/definitions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DepartmentListProps {
  departments: Department[];
}

export function DepartmentList({ departments }: DepartmentListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {departments.map((dept) => (
        <Card key={dept._id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
             <div>
              <CardTitle className="font-headline">{dept.name}</CardTitle>
              <CardDescription className="flex items-center gap-1 text-xs pt-2">
                <Users className="h-3 w-3" />
                {dept.employeeCount} {dept.employeeCount === 1 ? 'Employee' : 'Employees'}
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
            <p className="text-sm text-muted-foreground">{dept.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
