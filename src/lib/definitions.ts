export type Employee = {
  _id: string;
  name: string;
  email: string;
  role: string;
  position?: string;
  department: {
    _id: string;
    name: string;
  } | null;
  status: 'active' | 'inactive';
  avatarUrl?: string; 
  salary: number;
  performanceReview?: string;
};

export type Department = {
  _id: string;
  name: string;
  description?: string;
  employeeCount?: number;
};
