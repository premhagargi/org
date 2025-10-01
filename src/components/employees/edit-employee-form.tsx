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
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { updateEmployee } from '@/lib/actions';
import type { Employee } from '@/lib/definitions';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving Changes...' : 'Save Changes'}
    </Button>
  );
}

export function EditEmployeeForm({ employee }: { employee: Employee }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [state, formAction] = useActionState(updateEmployee, undefined);

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
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Employee: {employee.name}</DialogTitle>
          <DialogDescription>Update the employee's details below.</DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <ScrollArea className="h-[70vh] p-4">
            <div className="grid gap-6">
              <input type="hidden" name="id" value={employee._id} />

              <h3 className="font-semibold text-lg border-b pb-2">Core Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" defaultValue={employee.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" defaultValue={employee.email} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" name="position" defaultValue={employee.position} />
                </div>
              </div>

              <h3 className="font-semibold text-lg border-b pb-2">Personal Details</h3>
               <div className="grid md:grid-cols-3 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input id="dateOfBirth" name="dateOfBirth" type="date" defaultValue={employee.personalDetails?.dateOfBirth?.split('T')[0]} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Input id="gender" name="gender" defaultValue={employee.personalDetails?.gender} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="maritalStatus">Marital Status</Label>
                        <Input id="maritalStatus" name="maritalStatus" defaultValue={employee.personalDetails?.maritalStatus} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="nationality">Nationality</Label>
                        <Input id="nationality" name="nationality" defaultValue={employee.personalDetails?.nationality} />
                    </div>
                     <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="languages">Languages Spoken (comma-separated)</Label>
                        <Input id="languages" name="languages" defaultValue={employee.personalDetails?.languagesSpoken?.join(', ')} />
                    </div>
                </div>
                 <h4 className="font-medium text-md">Address</h4>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="grid gap-2 md:col-span-3">
                        <Label htmlFor="street">Street</Label>
                        <Input id="street" name="street" defaultValue={employee.personalDetails?.address?.street} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" defaultValue={employee.personalDetails?.address?.city} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" name="state" defaultValue={employee.personalDetails?.address?.state} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input id="postalCode" name="postalCode" defaultValue={employee.personalDetails?.address?.postalCode} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" name="country" defaultValue={employee.personalDetails?.address?.country} />
                    </div>
                </div>


              <h3 className="font-semibold text-lg border-b pb-2">Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Numbers (comma-separated)</Label>
                  <Input id="phone" name="phone" defaultValue={employee.contacts?.phone?.join(', ')} />
                </div>
              </div>
              
              <h4 className="font-medium text-md">Emergency Contact</h4>
               <div className="grid md:grid-cols-3 gap-4">
                 <div className="grid gap-2">
                  <Label htmlFor="emergencyContactName">Name</Label>
                  <Input id="emergencyContactName" name="emergencyContactName" defaultValue={employee.contacts?.emergencyContact?.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="emergencyContactRelationship">Relationship</Label>
                  <Input id="emergencyContactRelationship" name="emergencyContactRelationship" defaultValue={employee.contacts?.emergencyContact?.relationship} />
                </div>
                 <div className="grid gap-2">
                  <Label htmlFor="emergencyContactPhone">Phone</Label>
                  <Input id="emergencyContactPhone" name="emergencyContactPhone" defaultValue={employee.contacts?.emergencyContact?.phone} />
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
