import { cookies } from 'next/headers';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { AppHeader } from '@/components/app-header';
import { DepartmentChart } from '@/components/dashboard/department-chart';
import { StatusChart } from '@/components/dashboard/status-chart';
import { SalaryChart } from '@/components/dashboard/salary-chart';
import config from '@/lib/config.json';
import { redirect } from 'next/navigation';

async function getDashboardData() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const response = await fetch(`${config.apiBaseUrl}/api/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store', // Ensure fresh data on every request
    });

    if (!response.ok) {
      if (response.status === 401) {
         redirect('/login');
      }
      console.error('Failed to fetch dashboard data:', response.statusText);
      return null;
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return null;
  }
}


export default async function DashboardPage() {
  const data = await getDashboardData();
  
  if (!data) {
     return (
       <div className="flex flex-col h-full">
        <AppHeader title="Dashboard" />
        <div className="flex-1 flex items-center justify-center text-center p-4 md:p-8">
          <div>
             <h1 className="text-2xl font-bold font-headline">Could not load dashboard data</h1>
             <p className="text-muted-foreground">
              There was an issue connecting to the server. Please try again later.
             </p>
          </div>
        </div>
      </div>
     )
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Dashboard" />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 overflow-y-auto">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-headline">Admin/HR Dashboard</h1>
          <p className="text-muted-foreground">
            View reports, manage employees, and oversee operations. This view is for Admin/HR roles only.
          </p>
        </div>
        <StatsCards 
          totalEmployees={data.totalEmployees} 
          activeEmployees={data.activeEmployees}
          totalDepartments={data.totalDepartments} 
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4">
             <DepartmentChart departments={data.departments} />
          </div>
          <div className="lg:col-span-3">
            <StatusChart 
              activeCount={data.activeEmployees}
              inactiveCount={data.inactiveEmployees}
            />
          </div>
          <div className="lg:col-span-7">
            <SalaryChart salaryDistribution={data.salaryDistribution} />
          </div>
        </div>
      </div>
    </div>
  );
}
