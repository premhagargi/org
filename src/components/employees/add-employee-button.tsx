'use client';

import { useState, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createEmployee } from '@/lib/actions';
import type { Department } from '@/lib/definitions';
import config from '@/lib/config.json';
import { ScrollArea } from '../ui/scroll-area';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save Employee'}
    </Button>
  );
}

export function AddEmployeeButton({ token }: { token?: string }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [departments, setDepartments] = useState<Department[]>([]);
  
  const [state, formAction] = useActionState(createEmployee, undefined);

  useEffect(() => {
    async function fetchDepartments() {
      if (!token) return;
      
      try {
        const response = await fetch(`${config.apiBaseUrl}/api/departments`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        });
        if (response.ok) {
          const result = await response.json();
          setDepartments(result.departments || []);
        } else {
           console.error('Failed to fetch departments:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      }
    }
    if (open) {
      fetchDepartments();
    }
  }, [open, token]);

  useEffect(() => {
    if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'destructive',
      });
    }
    if (state?.message) {
      toast({
        title: 'Success',
        description: state.message,
      });
      setOpen(false);
    }
  }, [state, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Employee</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription>Fill in the details for the new employee. All fields are optional except core information.</DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <ScrollArea className="h-[70vh] p-4">
             <div className="grid gap-6">
                <h3 className="font-semibold text-lg border-b pb-2">Core Information</h3>
                 <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" placeholder="e.g. John Doe" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="e.g. john@example.com" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" placeholder="Enter a secure password" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="position">Position</Label>
                        <Input id="position" name="position" placeholder="e.g. Software Engineer" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="department">Department</Label>
                        <Select name="department">
                            <SelectTrigger>
                            <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                            <SelectContent>
                            {departments.map((dept) => (
                                <SelectItem key={dept._id} value={dept._id}>{dept.name}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="salary">Salary</Label>
                        <Input id="salary" name="salary" type="number" placeholder="e.g. 50000" />
                    </div>
                </div>

                <h3 className="font-semibold text-lg border-b pb-2">Personal Details</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input id="dateOfBirth" name="dateOfBirth" type="date" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Input id="gender" name="gender" placeholder="e.g. female" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="maritalStatus">Marital Status</Label>
                        <Input id="maritalStatus" name="maritalStatus" placeholder="e.g. married" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="nationality">Nationality</Label>
                        <Input id="nationality" name="nationality" placeholder="e.g. Indian" />
                    </div>
                     <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="languages">Languages Spoken (comma-separated)</Label>
                        <Input id="languages" name="languages" placeholder="e.g. Hindi, English" />
                    </div>
                </div>
                 <h4 className="font-medium text-md">Address</h4>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="grid gap-2 md:col-span-3">
                        <Label htmlFor="street">Street</Label>
                        <Input id="street" name="street" placeholder="e.g. 456 Oak Avenue" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" placeholder="e.g. Bengaluru" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" name="state" placeholder="e.g. Karnataka" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input id="postalCode" name="postalCode" placeholder="e.g. 560001" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" name="country" placeholder="e.g. India" />
                    </div>
                </div>

                <h3 className="font-semibold text-lg border-b pb-2">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Numbers (comma-separated)</Label>
                        <Input id="phone" name="phone" placeholder="e.g. +919876543210" />
                    </div>
                </div>
                <h4 className="font-medium text-md">Emergency Contact</h4>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="emergencyContactName">Name</Label>
                        <Input id="emergencyContactName" name="emergencyContactName" placeholder="e.g. Ravi Sharma" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="emergencyContactRelationship">Relationship</Label>
                        <Input id="emergencyContactRelationship" name="emergencyContactRelationship" placeholder="e.g. Spouse" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="emergencyContactPhone">Phone</Label>
                        <Input id="emergencyContactPhone" name="emergencyContactPhone" placeholder="e.g. +919012345678" />
                    </div>
                </div>
             </div>
          </ScrollArea>
          <DialogFooter className="pt-6 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
