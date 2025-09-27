import { AppHeader } from '@/components/app-header';
import { DepartmentList } from '@/components/departments/department-list';
import { AddDepartmentButton } from '@/components/departments/add-department-button';
import { departments, employees } from '@/lib/data';

export default function DepartmentsPage() {
  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Departments" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl font-bold font-headline">Department Management</h1>
            <p className="text-muted-foreground">
              Create, view, and manage departments to structure your organization.
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <AddDepartmentButton />
          </div>
        </div>
        <DepartmentList departments={departments} employees={employees} />
      </main>
    </div>
  );
}
