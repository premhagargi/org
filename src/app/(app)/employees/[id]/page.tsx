import { notFound } from 'next/navigation';
import Image from 'next/image';
import { employees } from '@/lib/data';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Briefcase, Building, DollarSign, UserCheck, UserX, FileText } from 'lucide-react';
import { FeedbackSummary } from '@/components/employees/feedback-summary';

export default function EmployeeProfilePage({ params }: { params: { id: string } }) {
  const employee = employees.find((e) => e.id === params.id);

  if (!employee) {
    notFound();
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Employee Profile" />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="space-y-2 mb-4">
          <h1 className="text-2xl font-bold font-headline">Employee Dashboard</h1>
          <p className="text-muted-foreground">
            View your profile, track your tasks, and manage your leave.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Image
                  src={employee.avatarUrl}
                  alt={employee.name}
                  width={128}
                  height={128}
                  className="rounded-full mb-4"
                />
                <h1 className="text-2xl font-bold font-headline">{employee.name}</h1>
                <p className="text-muted-foreground">{employee.role}</p>
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
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">(contact number not available)</span>
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
                  <span className="text-sm">{employee.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{employee.department}</span>
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
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold">${employee.salary.toLocaleString()} / year</span>
                </div>
                 <div className="flex items-center gap-2 text-blue-600 hover:underline cursor-pointer">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">View Payslip</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <FeedbackSummary initialFeedback={employee.performanceReview} />
          </div>
        </div>
      </main>
    </div>
  );
}
