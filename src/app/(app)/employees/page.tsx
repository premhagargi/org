import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { AppHeader } from '@/components/app-header';
import { EmployeeTable } from '@/components/employees/employee-table';
import { AddEmployeeButton } from '@/components/employees/add-employee-button';
import { cookies } from 'next/headers';
import config from '@/lib/config.json';
import { redirect } from 'next/navigation';
import type { Employee } from '@/lib/definitions';

async function getEmployees(): Promise<Employee[]> {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const response = await fetch(`${config.apiBaseUrl}/api/employees`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 401) {
        redirect('/login');
      }
      console.error('Failed to fetch employees:', response.statusText);
      return [];
    }

    const result = await response.json();
    return result.data.employees || [];
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
}


export default async function EmployeesPage() {
  const employees = await getEmployees();
  const token = cookies().get('token')?.value;
  
  return (
    <div className="flex flex-col h-full">
       <AppHeader title="Employees" />
       <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl font-bold font-headline">Employee Directory</h1>
            <p className="text-muted-foreground">
              Browse, filter, and manage all employee profiles in your organization. This view is for Admin/HR roles only.
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <AddEmployeeButton token={token} />
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
