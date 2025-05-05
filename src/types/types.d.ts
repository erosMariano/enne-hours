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
