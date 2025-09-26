export type Employee = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  avatarUrl: string;
  salary: number;
  performanceReview: string;
};

export type Department = {
  id: string;
  name: string;
};
