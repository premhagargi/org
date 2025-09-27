'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['organization', 'employee']),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: 'Invalid email, password, or role.',
    };
  }
  
  const { role } = validatedFields.data;

  if (role === 'organization') {
    redirect('/dashboard');
  } else {
    // In a real app, you'd find the employee's ID and redirect to their specific page
    redirect('/employees/1');
  }
}

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function register(prevState: any, formData: FormData) {
   const validatedFields = registerSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: 'Invalid registration data.',
    };
  }
  
  // In a real app, you'd create a new user here
  redirect('/dashboard');
}

export async function logout() {
  // In a real app, you'd sign the user out here
  redirect('/login');
}
