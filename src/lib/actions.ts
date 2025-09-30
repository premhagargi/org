'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { cookies } from 'next/headers';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  role: z.enum(['organization', 'employee']),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: 'Invalid email or password.',
    };
  }

  const { email, password, role } = validatedFields.data;

  try {
    const response = await fetch('https://org-backend-499h.onrender.com/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.message || 'Login failed. Please check your credentials.',
      };
    }

    if (data.token && data.user) {
      cookies().set('token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      
      cookies().set('user', JSON.stringify(data.user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

      if (role === 'organization') {
        redirect('/dashboard');
      } else if (role === 'employee') {
        redirect('/profile');
      }
    } else {
       return {
        error: 'Invalid response from server.',
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    return {
      error: 'An unexpected error occurred. Please try again.',
    };
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
  cookies().delete('token');
  cookies().delete('user');
  redirect('/login');
}
