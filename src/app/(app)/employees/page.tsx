import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { AppHeader } from '@/components/app-header';
import { EmployeeTable } from '@/components/employees/employee-table';
import { AddEmployeeButton } from '@/components/employees/add-employee-button';
import { employees } from '@/lib/data';

export default function EmployeesPage() {
  return (
    <div className="flex flex-col h-full">
       <AppHeader title="Employees" />
       <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl font-bold font-headline">Employee Directory</h1>
            <p className="text-muted-foreground">
              Browse, filter, and manage all employee profiles in your organization.
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <AddEmployeeButton />
          </div>
        </div>
        <Card>
          <CardContent className="p-0">
            <EmployeeTable employees={employees} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
