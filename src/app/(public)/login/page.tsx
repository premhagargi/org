'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { login } from '@/lib/actions';
import { Building, User } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? 'Logging in...' : 'Login'}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(login, undefined);
  const [selectedRole, setSelectedRole] = useState('organization');

  return (
    <div className="w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-12">
      <Card className="mx-auto w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Welcome Back</CardTitle>
          <CardDescription>Select your role and enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="grid gap-6">
            <div className="grid gap-3">
              <Label>Login as</Label>
              <RadioGroup
                defaultValue={selectedRole}
                name="role"
                onValueChange={setSelectedRole}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="organization" id="organization" className="peer sr-only" />
                  <Label
                    htmlFor="organization"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Building className="mb-3 h-6 w-6" />
                    Organization
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="employee" id="employee" className="peer sr-only" />
                  <Label
                    htmlFor="employee"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <User className="mb-3 h-6 w-6" />
                    Employee
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>

            {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
            <SubmitButton />
          </form>
          {selectedRole === 'organization' && (
            <div className="mt-6 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="underline font-medium">
                Sign up
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
