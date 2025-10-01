import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Briefcase, Building, IndianRupee, UserCheck, UserX, FileText, Home, Languages, HeartHandshake, ShieldAlert } from 'lucide-react';
import { FeedbackSummary } from '@/components/employees/feedback-summary';
import { cookies } from 'next/headers';
import config from '@/lib/config.json';
import type { Employee, LeaveRequest } from '@/lib/definitions';
import { LeaveRequestList } from '@/components/leaves/leave-request-list';
import { EducationHistoryCard } from '@/components/employees/education-history-card';
import { WorkExperienceCard } from '@/components/employees/work-experience-card';

async function getEmployeeData(id: string): Promise<{employee: Employee | null, leaveRequests: LeaveRequest[]}> {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        redirect('/login');
    }
    
    const headers = { Authorization: `Bearer ${token}` };

    try {
        const [employeeResponse, leaveResponse] = await Promise.all([
            fetch(`${config.apiBaseUrl}/api/employees/${id}`, { headers, cache: 'no-store' }),
            fetch(`${config.apiBaseUrl}/api/employees/leave-requests/${id}`, { headers, cache: 'no-store' })
        ]);

        if (!employeeResponse.ok) {
            if (employeeResponse.status === 401) redirect('/login');
            if (employeeResponse.status === 404) return { employee: null, leaveRequests: [] };
            console.error(`Failed to fetch employee ${id}:`, employeeResponse.statusText);
            return { employee: null, leaveRequests: [] };
        }

        if (!leaveResponse.ok) {
             if (leaveResponse.status === 401) redirect('/login');
             console.error('Failed to fetch leave requests:', leaveResponse.statusText);
        }

        const employeeResult = await employeeResponse.json();
        const leaveResult = leaveResponse.ok ? await leaveResponse.json() : { leaveRequests: [] };
        
        return {
          employee: employeeResult.employee || null,
          leaveRequests: leaveResult.leaveRequests || []
        };
    } catch (error) {
        console.error(`Error fetching employee data for ${id}:`, error);
        return { employee: null, leaveRequests: [] };
    }
}


export default async function EmployeeProfilePage({ params }: { params: { id: string } }) {
  const { employee, leaveRequests } = await getEmployeeData(params.id);

  if (!employee) {
    notFound();
  }

  const address = employee.personalDetails?.address;
  const fullAddress = address ? [address.street, address.city, address.state, address.postalCode, address.country].filter(Boolean).join(', ') : 'Not available';

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Employee Profile" />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="space-y-2 mb-4">
          <h1 className="text-2xl font-bold font-headline">Employee Profile</h1>
          <p className="text-muted-foreground">
            Detailed view of an employee's information.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Image
                  src={`https://picsum.photos/seed/${employee._id}/128/128`}
                  alt={employee.name}
                  width={128}
                  height={128}
                  className="rounded-full mb-4"
                />
                <h1 className="text-2xl font-bold font-headline">{employee.name}</h1>
                <p className="text-muted-foreground">{employee.position}</p>
                <Badge 
                  variant={employee.status === 'active' ? 'default' : 'destructive'} 
                  className={`mt-2 ${employee.status === 'active' ? 'bg-green-600' : ''}`}
                >
                  {employee.status === 'active' ? (
                    <UserCheck className="mr-1 h-3 w-3" />
                  ) : (
                    <UserX className="mr-1 h-3 w-3" />
                  )}
                  {employee.status}
                </Badge>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Contact & Personal Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground mt-1" />
                  <span className="text-sm">{employee.email}</span>
                </div>
                 <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground mt-1" />
                   <span className="text-sm">
                    {employee.contacts?.phone && employee.contacts.phone.length > 0
                      ? employee.contacts.phone.join(', ')
                      : 'Not available'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Home className="h-4 w-4 text-muted-foreground mt-1" />
                  <span className="text-sm">{fullAddress}</span>
                </div>
                 <div className="flex items-start gap-2">
                  <Languages className="h-4 w-4 text-muted-foreground mt-1" />
                  <span className="text-sm">
                     {employee.personalDetails?.languagesSpoken && employee.personalDetails.languagesSpoken.length > 0
                      ? employee.personalDetails.languagesSpoken.join(', ')
                      : 'Not available'}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5"/>
                    Emergency Contact
                  </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                 <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{employee.contacts?.emergencyContact?.name || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{employee.contacts?.emergencyContact?.relationship || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{employee.contacts?.emergencyContact?.phone || 'N/A'}</span>
                </div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Professional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                 <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{employee.position}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{employee.department?.name || 'N/A'}</span>
                </div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Salary Information</CardTitle>
                <CardDescription>This is a confidential document.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                 <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold">₹{employee.salary.toLocaleString('en-IN')} / year</span>
                </div>
                 <div className="flex items-center gap-2 text-blue-600 hover:underline cursor-pointer">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">View Payslip</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2 space-y-6">
            <FeedbackSummary initialFeedback={employee.performanceReview || ''} />
            <LeaveRequestList employeeId={employee._id} requests={leaveRequests} isAdmin={true} />
            <WorkExperienceCard experience={employee.personalDetails?.previousWorkExperience} />
            <EducationHistoryCard education={employee.personalDetails?.educationHistory} />
          </div>
        </div>
      </main>
    </div>
  );
}
