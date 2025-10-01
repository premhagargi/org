export type Education = {
  degree: string;
  institution: string;
  fieldOfStudy: string;
  startYear: number;
  endYear: number;
  grade?: string;
};

export type WorkExperience = {
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  location: string;
};

export type Employee = {
  _id: string;
  name: string;
  email: string;
  role: string;
  position?: string;
  department: {
    _id: string;
    name: string;
    description?: string;
  } | null;
  status: 'active' | 'inactive';
  avatarUrl?: string; 
  salary: number;
  performanceReview?: string;
  personalDetails?: {
    dateOfBirth?: string;
    gender?: string;
    maritalStatus?: string;
    nationality?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      country?: string;
    };
    languagesSpoken?: string[];
    educationHistory?: Education[];
    previousWorkExperience?: WorkExperience[];
  };
  contacts?: {
    phone?: string[];
    emergencyContact?: {
      name?: string;
      relationship?: string;
      phone?: string;
    };
  };
};

export type Department = {
  _id: string;
  name: string;
  description?: string;
  employeeCount?: number;
};

export type LeaveRequest = {
  _id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
};
