import { AppHeader } from '@/components/app-header';
import { DepartmentList } from '@/components/departments/department-list';
import { AddDepartmentButton } from '@/components/departments/add-department-button';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import config from '@/lib/config.json';
import type { Department } from '@/lib/definitions';

async function getDepartments(): Promise<Department[]> {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  if (!token) redirect('/login');

  try {
    const response = await fetch(`${config.apiBaseUrl}/api/departments`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 401) redirect('/login');
      console.error('Failed to fetch departments:', response.statusText);
      return [];
    }

    const result = await response.json();
    return result.departments || [];
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
}

export default async function DepartmentsPage() {
  const departments = await getDepartments();
  const token = cookies().get('token')?.value;

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Departments" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl font-bold font-headline">Department Management</h1>
            <p className="text-muted-foreground">
              Create, view, and manage departments to structure your organization. This view is for Admin/HR roles only.
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <AddDepartmentButton token={token} />
          </div>
        </div>
        <DepartmentList departments={departments} />
      </main>
    </div>
  );
}
