export type Employee = {
  _id: string;
  name: string;
  email: string;
  role: string;
  department: {
    _id: string;
    name: string;
  } | null;
  status: 'active' | 'inactive';
  avatarUrl?: string; // Made optional as it's not in the API response
  salary: number;
  performanceReview?: string; // Made optional
};

export type Department = {
  _id: string;
  name: string;
  description?: string;
  employeeCount?: number;
};
