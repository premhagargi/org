'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { updateLeaveStatus } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Check, X } from 'lucide-react';

export function UpdateLeaveStatusButtons({ employeeId, leaveRequestId }: { employeeId: string; leaveRequestId: string }) {
  let [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAction = (status: 'approved' | 'rejected') => {
    const formData = new FormData();
    formData.append('status', status);
    formData.append('employeeId', employeeId);
    formData.append('leaveRequestId', leaveRequestId);
    
    startTransition(async () => {
      const result = await updateLeaveStatus(formData);
      if (result?.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      } else {
         toast({
          title: 'Success',
          description: `Leave request has been ${status}.`,
        });
      }
    });
  };

  return (
    <div className="flex gap-2 justify-end">
      <Button
        size="icon"
        variant="outline"
        className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700 border-green-600"
        onClick={() => handleAction('approved')}
        disabled={isPending}
      >
        <Check className="h-4 w-4" />
        <span className="sr-only">Approve</span>
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-600"
        onClick={() => handleAction('rejected')}
        disabled={isPending}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Reject</span>
      </Button>
    </div>
  );
}
