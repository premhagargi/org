'use client';

import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
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
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateEmployeeProfile, type GenerateEmployeeProfileOutput } from '@/ai/flows/generate-employee-profile';
import { createEmployee } from '@/lib/actions';
import type { Department } from '@/lib/definitions';
import config from '@/lib/config.json';
import { getCookie } from 'cookies-next';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save Employee'}
    </Button>
  );
}

export function AddEmployeeButton() {
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [description, setDescription] = useState('');
  const [generatedData, setGeneratedData] = useState<Partial<GenerateEmployeeProfileOutput>>({});
  const { toast } = useToast();
  const [departments, setDepartments] = useState<Department[]>([]);
  
  const [state, formAction] = useFormState(createEmployee, undefined);

  useEffect(() => {
    async function fetchDepartments() {
      const token = getCookie('token');
      if (!token) return;
      
      try {
        const response = await fetch(`${config.apiBaseUrl}/api/employees`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const result = await response.json();
          setDepartments(result.data.departments || []);
        }
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      }
    }
    if (open) {
      fetchDepartments();
    }
  }, [open]);

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

  const handleGenerate = async () => {
    if (!description) {
      toast({
        title: 'Description needed',
        description: 'Please enter a description to generate a profile.',
        variant: 'destructive',
      });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateEmployeeProfile({ description });
      // The AI returns 'role', let's map it to 'position' for the form
      const dataWithPosition = { ...result, position: result.role };
      setGeneratedData(dataWithPosition);
      toast({
        title: 'Profile Generated',
        description: 'AI has filled in some details for you.',
      });
    } catch (error) {
      console.error('Failed to generate employee profile:', error);
      toast({
        title: 'Generation Failed',
        description: 'An error occurred while generating the profile.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Employee</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogDescription>Fill in the details for the new employee. Use AI to speed up the process.</DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right col-span-4 text-left">
                Describe the employee to auto-fill
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-4"
                placeholder="e.g., 'Senior frontend developer with 5 years of experience in React and TypeScript, working in the engineering team.'"
              />
              <Button type="button" onClick={handleGenerate} disabled={isGenerating} className="col-span-4">
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isGenerating ? 'Generating...' : 'Generate with AI'}
              </Button>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" defaultValue={generatedData.name} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={generatedData.email} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">Position</Label>
              <Input id="position" name="position" defaultValue={(generatedData as any).position} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">Department</Label>
               <Select name="department">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept._id} value={dept._id}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salary">Salary</Label>
              <Input id="salary" name="salary" type="number" defaultValue={generatedData.salary as any} required className="col-span-3" />
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
