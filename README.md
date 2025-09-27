# OrgHQ - Human Resource Management System

This is a Next.js application built in Firebase Studio. OrgHQ is an all-in-one platform designed to help organizations manage their employees, departments, and view insightful analytics. It features a role-based system with distinct experiences for HR/Admins and regular employees.

## Key Features

- **Role-Based Access Control (RBAC):** Separate dashboards and permissions for Admin/HR (Organization) and Employees.
- **Admin Dashboard:** A comprehensive overview of the organization with key statistics and charts, including Employees per Department, Active vs. Inactive status, and Salary Distribution.
- **Employee Management:** Admins can view a filterable list of all employees and access their detailed profiles.
- **Department Management:** Admins can create and manage organizational departments.
- **Detailed Employee Profiles:** A complete view of employee information, including contact details, professional info, confidential salary data, and performance feedback.
- **Employee Self-Service:** Employees can log in to a dedicated portal to view their own profile and information.
- **AI-Powered Tools:**
  - **Generate Employee Profiles:** HR Admins can use AI to quickly draft a new employee profile from a simple text description.
  - **Summarize Feedback:** AI helps summarize lengthy performance reviews into concise points and key areas for improvement.

## Application Flow

The application provides two distinct user experiences based on the selected role at login.

### 1. Admin/HR (Organization) Flow

- **Login:** Select the "Organization" role on the login page.
- **Dashboard (`/dashboard`):** After logging in, you are directed to the main admin dashboard. Here you can see high-level analytics about the company.
- **Employees (`/employees`):** View a table of all employees. You can navigate to an individual employee's profile from this page.
- **Departments (`/departments`):** View and manage all company departments.
- **Employee Profile (`/employees/[id]`):** View and manage a specific employee's complete profile, including their performance feedback summary.

### 2. Employee Flow

- **Login:** Select the "Employee" role on the login page.
- **Profile (`/profile`):** After logging in, you are directed straight to your personal profile page. This page displays your professional details, contact information, and salary. The sidebar provides navigation exclusive to employees.

## Getting Started

To get started, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result. You can start by navigating to the login or register pages.
