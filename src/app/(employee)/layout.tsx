import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { EmployeeSidebar } from '@/components/employee-sidebar';

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <EmployeeSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
