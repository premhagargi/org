'use client';

import { useState } from 'react';
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

export function AddEmployeeButton() {
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [description, setDescription] = useState('');
  const [generatedData, setGeneratedData] = useState<Partial<GenerateEmployeeProfileOutput>>({});
  const { toast } = useToast();

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
      setGeneratedData(result);
      toast({
        title: 'Profile Generated',
        description: 'AI has filled in the details for you.',
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
             <Button onClick={handleGenerate} disabled={isGenerating} className="col-span-4">
                <Sparkles className="mr-2 h-4 w-4" />
                {isGenerating ? 'Generating...' : 'Generate with AI'}
            </Button>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" defaultValue={generatedData.name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">Email</Label>
            <Input id="email" type="email" defaultValue={generatedData.email} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">Role</Label>
            <Input id="role" defaultValue={generatedData.role} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="department" className="text-right">Department</Label>
            <Input id="department" defaultValue={generatedData.department} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">Status</Label>
            <Select defaultValue={generatedData.status}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Employee</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
