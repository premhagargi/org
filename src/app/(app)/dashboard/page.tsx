import { StatsCards } from '@/components/dashboard/stats-cards';
import { AppHeader } from '@/components/app-header';
import { DepartmentChart } from '@/components/dashboard/department-chart';
import { StatusChart } from '@/components/dashboard/status-chart';
import { employees, departments } from '@/lib/data';

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Dashboard" />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 overflow-y-auto">
        <StatsCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4">
             <DepartmentChart employees={employees} departments={departments} />
          </div>
          <div className="lg:col-span-3">
            <StatusChart employees={employees} />
          </div>
        </div>
      </div>
    </div>
  );
}
