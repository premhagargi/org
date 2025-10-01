'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { cookies } from 'next/headers';
import config from './config.json';
import { revalidatePath } from 'next/cache';

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
    const response = await fetch(`${config.apiBaseUrl}/api/users/login`, {
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
      const cookieStore = cookies();
      cookieStore.set('token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      
      // The user object from the API has an 'id' field, not '_id'.
      // The API response for employee login is {"user": {"id": "..."}}
      // We will store this and reference it as `user.id` in our server components.
      // For admin login, the API returns `user._id`.
      const userToStore = data.user.id ? { ...data.user, _id: data.user.id } : data.user;

      cookieStore.set('user', JSON.stringify(userToStore), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

    } else {
       return {
        error: 'Invalid response from server.',
      };
    }
  } catch (error) {
    if ((error as any)?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    console.error('Login error:', error);
    return {
      error: 'An unexpected error occurred. Please try again.',
    };
  }

  if (role === 'organization') {
    redirect('/dashboard');
  } else if (role === 'employee') {
    redirect('/profile');
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
  const cookieStore = cookies();
  cookieStore.delete('token');
  cookieStore.delete('user');
  redirect('/login');
}


const createEmployeeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  position: z.string().min(1, 'Position is required'),
  department: z.string().min(1, 'Department is required'),
  salary: z.coerce.number().min(1, 'Salary is required'),
});


export async function createEmployee(prevState: any, formData: FormData) {
  const validatedFields = createEmployeeSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    console.error('Validation Errors:', validatedFields.error.flatten().fieldErrors);
    return {
      error: 'Invalid data. Please check all fields.',
    };
  }
  
  const { name, email, password, position, department, salary } = validatedFields.data;
  const token = cookies().get('token')?.value;

  if (!token) {
    return { error: 'Authentication required.' };
  }

  try {
    const response = await fetch(`${config.apiBaseUrl}/api/users/create-employee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, email, password, position, department, salary }),
    });

    const data = await response.json();

    if (!response.ok) {
       return { error: data.message || 'Failed to create employee.' };
    }
    
    revalidatePath('/employees');
    return { message: 'Employee created successfully' };

  } catch (error) {
    console.error('Create employee error:', error);
    return { error: 'An unexpected error occurred.' };
  }
}

const createLeaveRequestSchema = z.object({
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  reason: z.string().min(1, 'Reason is required'),
});

export async function createLeaveRequest(prevState: any, formData: FormData) {
  const validatedFields = createLeaveRequestSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: 'Invalid data. Please check all fields.',
    };
  }

  const token = cookies().get('token')?.value;
  if (!token) {
    return { error: 'Authentication required.' };
  }

  try {
    const response = await fetch(`${config.apiBaseUrl}/api/employees/leave-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(validatedFields.data),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'Failed to create leave request.' };
    }

    revalidatePath('/leave');
    revalidatePath('/profile');
    return { message: 'Leave request created successfully.' };
  } catch (error) {
    console.error('Create leave request error:', error);
    return { error: 'An unexpected error occurred.' };
  }
}

const updateLeaveStatusSchema = z.object({
  status: z.enum(['approved', 'rejected']),
  employeeId: z.string(),
  leaveRequestId: z.string(),
});

export async function updateLeaveStatus(formData: FormData) {
  const validatedFields = updateLeaveStatusSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  
  if (!validatedFields.success) {
    console.error('Validation failed', validatedFields.error.flatten().fieldErrors);
    return { error: 'Invalid data.' };
  }
  
  const { status, employeeId, leaveRequestId } = validatedFields.data;
  const token = cookies().get('token')?.value;
  
  if (!token) {
    return { error: 'Authentication required.' };
  }
  
  try {
    const response = await fetch(`${config.apiBaseUrl}/api/employees/leave-requests/${employeeId}/${leaveRequestId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
       const data = await response.json();
       return { error: data.message || 'Failed to update leave status.' };
    }
    
    revalidatePath(`/employees/${employeeId}`);
    return { message: 'Leave status updated.' };

  } catch (error) {
     console.error('Update leave status error:', error);
     return { error: 'An unexpected error occurred.' };
  }
}
