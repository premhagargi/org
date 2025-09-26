'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { summarizeEmployeeFeedback, type SummarizeEmployeeFeedbackOutput } from '@/ai/flows/summarize-employee-feedback';
import { useToast } from '@/hooks/use-toast';

interface FeedbackSummaryProps {
  initialFeedback: string;
}

export function FeedbackSummary({ initialFeedback }: FeedbackSummaryProps) {
  const [feedbackText, setFeedbackText] = useState(initialFeedback);
  const [summary, setSummary] = useState<SummarizeEmployeeFeedbackOutput | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!feedbackText) {
      toast({
        title: 'No feedback text',
        description: 'Please provide feedback text to summarize.',
        variant: 'destructive',
      });
      return;
    }
    setIsSummarizing(true);
    setSummary(null);
    try {
      const result = await summarizeEmployeeFeedback({ feedbackText });
      setSummary(result);
    } catch (error) {
      console.error('Failed to summarize feedback:', error);
      toast({
        title: 'Summarization Failed',
        description: 'An error occurred while summarizing the feedback.',
        variant: 'destructive',
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Review Feedback</CardTitle>
        <CardDescription>Use AI to summarize the feedback and identify key areas for improvement.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter performance review feedback here..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          rows={8}
        />
        <Button onClick={handleSummarize} disabled={isSummarizing}>
          <Sparkles className="mr-2 h-4 w-4" />
          {isSummarizing ? 'Summarizing...' : 'Summarize with AI'}
        </Button>
        {summary && (
          <div className="space-y-4 pt-4 border-t">
            <div>
              <h3 className="font-semibold">Summary</h3>
              <p className="text-sm text-muted-foreground">{summary.summary}</p>
            </div>
            <div>
              <h3 className="font-semibold">Key Areas for Improvement</h3>
              <p className="text-sm text-muted-foreground">{summary.keyAreasForImprovement}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
