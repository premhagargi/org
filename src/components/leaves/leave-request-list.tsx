import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import config from '@/lib/config.json';
import type { LeaveRequest } from '@/lib/definitions';
import { UpdateLeaveStatusButtons } from './update-leave-status-buttons';
import { cn } from "@/lib/utils";

async function getLeaveRequests(employeeId: string, isAdmin: boolean): Promise<LeaveRequest[]> {
  const cookieStore = cookies();
  const token = isAdmin ? cookieStore.get('token')?.value : cookieStore.get('employee_token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const response = await fetch(`${config.apiBaseUrl}/api/employees/leave-requests/${employeeId}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

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

const statusVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
  approved: 'default',
  pending: 'secondary',
  rejected: 'destructive',
};

const statusColorMap: { [key: string]: string } = {
    approved: 'bg-green-600',
    pending: 'bg-yellow-500',
    rejected: 'bg-red-600',
}

export async function LeaveRequestList({ employeeId, isAdmin }: { employeeId: string, isAdmin: boolean }) {
  const requests = await getLeaveRequests(employeeId, isAdmin);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave Requests</CardTitle>
        <CardDescription>A history of all leave requests.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              {isAdmin && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length > 0 ? requests.map((req) => (
              <TableRow key={req._id}>
                <TableCell>{format(new Date(req.startDate), 'LLL dd, y')}</TableCell>
                <TableCell>{format(new Date(req.endDate), 'LLL dd, y')}</TableCell>
                <TableCell className="max-w-[200px] truncate">{req.reason}</TableCell>
                <TableCell>
                  <Badge 
                    variant={statusVariantMap[req.status]}
                    className={cn('capitalize', statusColorMap[req.status])}
                  >
                    {req.status}
                  </Badge>
                </TableCell>
                {isAdmin && (
                  <TableCell className="text-right">
                    {req.status === 'pending' && (
                        <UpdateLeaveStatusButtons employeeId={employeeId} leaveRequestId={req._id} />
                    )}
                  </TableCell>
                )}
              </TableRow>
            )) : (
                <TableRow>
                    <TableCell colSpan={isAdmin ? 5 : 4} className="h-24 text-center">
                        No leave requests found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
