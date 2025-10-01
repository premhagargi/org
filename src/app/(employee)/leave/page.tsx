import { AppHeader } from '@/components/app-header';
import { LeaveRequestList } from '@/components/leaves/leave-request-list';
import { AddLeaveRequestButton } from '@/components/leaves/add-leave-request-button';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import config from '@/lib/config.json';
import type { LeaveRequest } from '@/lib/definitions';

async function getLeaveRequests(
  employeeId: string,
  token: string
): Promise<LeaveRequest[]> {
  try {
    const response = await fetch(
      `${config.apiBaseUrl}/api/employees/leave-requests/${employeeId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      if (response.status === 401) redirect('/login');
      console.error('Failed to fetch leave requests:', response.statusText);
      return [];
    }

    const result = await response.json();
    return result.leaveRequests || [];
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    return [];
  }
}

export default async function LeavePage() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get('employee_user')?.value;
  const token = cookieStore.get('employee_token')?.value;

  if (!userCookie || !token) {
    redirect('/login');
  }

  const user = JSON.parse(userCookie);
  const employeeId = user?.id;

  if (!employeeId) {
    redirect('/login');
  }

  const requests = await getLeaveRequests(employeeId, token);

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Leave Requests" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl font-bold font-headline">
              Manage Your Leave
            </h1>
            <p className="text-muted-foreground">
              View your leave history and request new time off.
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <AddLeaveRequestButton />
          </div>
        </div>
        <LeaveRequestList requests={requests} isAdmin={false} />
      </main>
    </div>
  );
}
