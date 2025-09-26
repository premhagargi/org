'use server';

/**
 * @fileOverview Summarizes employee feedback from performance reviews using AI.
 *
 * - summarizeEmployeeFeedback - A function that summarizes employee feedback.
 * - SummarizeEmployeeFeedbackInput - The input type for the summarizeEmployeeFeedback function.
 * - SummarizeEmployeeFeedbackOutput - The return type for the summarizeEmployeeFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeEmployeeFeedbackInputSchema = z.object({
  feedbackText: z
    .string()
    .describe('The employee feedback text from performance reviews.'),
});
export type SummarizeEmployeeFeedbackInput = z.infer<
  typeof SummarizeEmployeeFeedbackInputSchema
>;

const SummarizeEmployeeFeedbackOutputSchema = z.object({
  summary: z.string().describe('The summary of the employee feedback.'),
  keyAreasForImprovement: z
    .string()
    .describe('Key areas for improvement identified from the feedback.'),
});
export type SummarizeEmployeeFeedbackOutput = z.infer<
  typeof SummarizeEmployeeFeedbackOutputSchema
>;

export async function summarizeEmployeeFeedback(
  input: SummarizeEmployeeFeedbackInput
): Promise<SummarizeEmployeeFeedbackOutput> {
  return summarizeEmployeeFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeEmployeeFeedbackPrompt',
  input: {schema: SummarizeEmployeeFeedbackInputSchema},
  output: {schema: SummarizeEmployeeFeedbackOutputSchema},
  prompt: `You are an AI assistant helping managers summarize employee feedback from performance reviews.

  Summarize the feedback text provided below and identify key areas for improvement.  Be concise and focus on actionable insights for the manager.

  Feedback Text: {{{feedbackText}}}
  `,
});

const summarizeEmployeeFeedbackFlow = ai.defineFlow(
  {
    name: 'summarizeEmployeeFeedbackFlow',
    inputSchema: SummarizeEmployeeFeedbackInputSchema,
    outputSchema: SummarizeEmployeeFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
