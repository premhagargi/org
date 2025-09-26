import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // A bit of a hack to get the title from the URL segment
  // In a real app, you might use a more robust solution
  const title = "Dashboard"; // This will be dynamic in each page. For now, hardcoding.

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          {/* Header is handled within each page for dynamic titles */}
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
