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

// Usuário
export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  image?: string | null;
  projects?: Project[];
}

// Projeto
export interface Project {
  id: string;
  name: string;
  userId?: string | null;
  user?: User | null;
  tasks?: Task[];
  createdAt: Date;
  updatedAt: Date;
}

// Tarefa
export interface Task {
  id?: string;
  title: string;
  projectId: string;
  projectName: string;
  description: string;
  startTime: Date | string;
  endTime: Date | string;
  totalTime: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  status: StatusFilter | string;
}

// Entrada de Tempo
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

// Filtro de Status
export type StatusFilter =
  | "approved"
  | "arresting"
  | "rejected"
  | "doing"
  | "all";

// Opções de Status
export interface StatusOptionsProps {
  status: StatusFilter;
  label: string;
}

// Lista de Tarefas
export interface TaskListProps {
  timeEntries: TimeEntry[];
  statusActive: StatusFilter;
}

// Componentes do Dashboard
export interface DashboardClientProps {
  projects: Project[];
  user: User;
}

export interface ButtonLogOutProps {
  sidebarActive: boolean;
}

export interface ContentDashboardProps {
  project: Project;
}

export interface ItemsSideBarProps {
  sidebarActive: boolean;
}
