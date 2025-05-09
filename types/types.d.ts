export interface FormAuthProps {
  type: "login" | "register";
  title: string;
  subtitle: {
    text: string;
    textRedirect: string;
    urlRedirect: string;
  };
  labelSubmit: string;
}

// Dashboard
export interface TimeEntry {
  imgUrl: string;
  id: number;
  user: string;
  project: string;
  description: string;
  time: string;
  date: string;
  status: StatusFilter;
}

export interface TaskListProps {
  timeEntries: TimeEntry[];
  statusActive: StatusFilter;
}
export type StatusFilter =
  | "approved"
  | "arresting"
  | "rejected"
  | "doing"
  | "all";

interface StatusOptionsProps {
  status: StatusFilter;
  label: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  image?: string | null; // Add the image property
  projects: Project[];
}

export interface Project {
  id: string;
  name: string;
  userId?: string | null;
  user?: User | null;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

// types/types.ts

export interface Task {
  title: string;
  id: string;
  projectId: string;
  userName: string;
  projectName: string;
  description: string;
  startTime: Date;
  endTime: Date;
  totalTime: number;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}
export interface TaskCreate {
  title: string;
  projectId: string;
  userName: string;
  projectName: string;
  description: string;
  startTime: string;
  endTime: string;
  totalTime: number;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface ProjectWithTasks {
  id: string;
  name: string;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
  tasks: Task[];
}

export interface ProjectUnique {
  id: string;
  name: string;
  createdAt: Date;
  userId: string | null;
  updatedAt: Date;
  tasks: Task[];
}
