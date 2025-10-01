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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogDescription>Fill in the details for the new employee.</DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
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
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
