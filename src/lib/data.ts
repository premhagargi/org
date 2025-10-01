import type { Employee, Department } from './definitions';

export const departments: Department[] = [
  { _id: '1', name: 'Engineering' },
  { _id: '2', name: 'Marketing' },
  { _id: '3', name: 'Sales' },
  { _id: '4', name: 'Human Resources' },
  { _id: '5', name: 'Product' },
];

export const employees: Employee[] = [
  {
    _id: '1',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    role: 'Lead Software Engineer',
    department: { _id: '1', name: 'Engineering' },
    status: 'active',
    avatarUrl: 'https://picsum.photos/seed/1/200/200',
    salary: 9500000,
    performanceReview:
      "Alice has consistently demonstrated exceptional leadership and technical skills. Her work on the flagship project was instrumental to its success. Areas for improvement include delegating more tasks to junior developers to foster their growth.",
  },
  {
    _id: '2',
    name: 'Bob Williams',
    email: 'bob.w@example.com',
    role: 'Marketing Manager',
    department: { _id: '2', name: 'Marketing' },
    status: 'active',
    avatarUrl: 'https://picsum.photos/seed/2/200/200',
    salary: 7500000,
    performanceReview:
      "Bob's campaign strategies have significantly increased our market reach. He is a creative and effective manager. He could benefit from incorporating more data-driven analytics into his campaign planning.",
  },
  {
    _id: '3',
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    role: 'Sales Representative',
    department: { _id: '3', name: 'Sales' },
    status: 'active',
    avatarUrl: 'https://picsum.photos/seed/3/200/200',
    salary: 6400000,
    performanceReview:
      'Charlie consistently meets and exceeds his sales targets. He has excellent client relationships. To further improve, Charlie should work on his post-sales follow-up process.',
  },
  {
    _id: '4',
    name: 'Diana Prince',
    email: 'diana.p@example.com',
    role: 'HR Generalist',
    department: { _id: '4', name: 'Human Resources' },
    status: 'inactive',
    avatarUrl: 'https://picsum.photos/seed/4/200/200',
    salary: 5600000,
    performanceReview:
      "Diana was a valuable member of the HR team, known for her empathy and efficiency. Her departure is a loss for the company. The feedback from her exit interview noted a desire for more growth opportunities.",
  },
  {
    _id: '5',
    name: 'Ethan Hunt',
    email: 'ethan.h@example.com',
    role: 'Product Manager',
    department: { _id: '5', name: 'Product' },
    status: 'active',
    avatarUrl: 'https://picsum.photos/seed/5/200/200',
    salary: 8800000,
    performanceReview:
      "Ethan has a strong vision for the product and excels at roadmap planning. His communication with the engineering team is effective. He could improve stakeholder management by providing more frequent updates.",
  },
  {
    _id: '6',
    name: 'Fiona Glenanne',
    email: 'fiona.g@example.com',
    role: 'Frontend Developer',
    department: { _id: '1', name: 'Engineering' },
    status: 'active',
    avatarUrl: 'https://picsum.photos/seed/6/200/200',
    salary: 7200000,
    performanceReview:
      "Fiona is a highly skilled frontend developer who produces high-quality, clean code. She is a great team player. Fiona is encouraged to take more ownership of feature development from conception to deployment.",
  },
  {
    _id: '7',
    name: 'George Costanza',
    email: 'george.c@example.com',
    role: 'Sales Associate',
    department: { _id: '3', name: 'Sales' },
    status: 'active',
    avatarUrl: 'https://picsum.photos/seed/7/200/200',
    salary: 6000000,
    performanceReview:
      "George has shown steady improvement in his sales numbers this quarter. He is persistent and has a good sense of humor with clients. He needs to work on his organizational skills and timely reporting.",
  },
  {
    _id: '8',
    name: 'Hannah Abbott',
    email: 'hannah.a@example.com',
    role: 'UI/UX Designer',
    department: { _id: '5', name: 'Product' },
    status: 'active',
    avatarUrl: 'https://picsum.photos/seed/8/200/200',
    salary: 6800000,
    performanceReview:
      "Hannah's designs are both beautiful and user-friendly. She takes feedback well and iterates quickly. To grow, Hannah should engage more in user research to better inform her design decisions.",
  },
  {
    _id: '9',
    name: 'Ian Malcolm',
    email: 'ian.m@example.com',
    role: 'Data Scientist',
    department: { _id: '1', name: 'Engineering' },
    status: 'active',
    avatarUrl: 'https://picsum.photos/seed/9/200/200',
    salary: 9200000,
    performanceReview:
      'Ian brings a unique and valuable perspective to our data analysis efforts. His insights have led to several key product improvements. He should focus on making his findings more accessible to non-technical stakeholders.',
  },
  {
    _id: '10',
    name: 'Jane Smith',
    email: 'jane.s@example.com',
    role: 'Content Strategist',
    department: { _id: '2', name: 'Marketing' },
    status: 'inactive',
    avatarUrl: 'https://picsum.photos/seed/10/200/200',
    salary: 6200000,
    performanceReview:
      "Jane's content was consistently high-quality and engaging. She was a creative force on the team. Her exit feedback mentioned a lack of clear career progression paths in her role.",
  },
];
