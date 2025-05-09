import { create } from "zustand";
interface Project {
  id: string;
  name: string;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface DashboardState {
  user: User | null;
  projects: Project[];
  setUser: (user: User | null) => void;
  setProjects: (projects: Project[]) => void;
}

export const useDashboardStore = create<DashboardState>()((set) => ({
  user: null,
  projects: [],
  setUser: (user) => set({ user }),
  setProjects: (projects) => set({ projects }),
}));
