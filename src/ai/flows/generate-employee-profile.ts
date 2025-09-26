'use server';

/**
 * @fileOverview An AI agent for generating draft employee profiles.
 *
 * - generateEmployeeProfile - A function that generates a draft employee profile based on a description of responsibilities and skills.
 * - GenerateEmployeeProfileInput - The input type for the generateEmployeeProfile function.
 * - GenerateEmployeeProfileOutput - The return type for the generateEmployeeProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEmployeeProfileInputSchema = z.object({
  description: z.string().describe('A short description of the employee\'s responsibilities and skills.'),
});

export type GenerateEmployeeProfileInput = z.infer<typeof GenerateEmployeeProfileInputSchema>;

const GenerateEmployeeProfileOutputSchema = z.object({
  name: z.string().describe('The employee\'s full name.'),
  email: z.string().email().describe('The employee\'s email address.'),
  role: z.string().describe('The employee\'s job title or role.'),
  department: z.string().describe('The department the employee belongs to.'),
  status: z.enum(['active', 'inactive']).describe('The employee\'s employment status.'),
  bio: z.string().describe('A short professional biography of the employee.'),
});

export type GenerateEmployeeProfileOutput = z.infer<typeof GenerateEmployeeProfileOutputSchema>;

export async function generateEmployeeProfile(input: GenerateEmployeeProfileInput): Promise<GenerateEmployeeProfileOutput> {
  return generateEmployeeProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEmployeeProfilePrompt',
  input: {schema: GenerateEmployeeProfileInputSchema},
  output: {schema: GenerateEmployeeProfileOutputSchema},
  prompt: `You are an HR expert tasked with creating draft employee profiles. Based on the description provided, generate a realistic employee profile.

Description: {{{description}}}

Profile should include the following fields:
- name
- email
- role
- department
- status (active or inactive)
- bio`,
});

const generateEmployeeProfileFlow = ai.defineFlow(
  {
    name: 'generateEmployeeProfileFlow',
    inputSchema: GenerateEmployeeProfileInputSchema,
    outputSchema: GenerateEmployeeProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
