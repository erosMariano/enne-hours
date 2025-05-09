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

export interface Task {
  id: string;
  projectId: string;
  project: Project;
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
