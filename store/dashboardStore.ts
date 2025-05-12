// dashboardStore.ts
import { DashboardClientProject, DashboardClientUser } from "@/types/types";
import { create } from "zustand";

interface DashboardState {
  user: DashboardClientUser | null;
  projects: DashboardClientProject[];
  setUser: (
    user:
      | DashboardClientUser
      | null
      | ((prev: DashboardClientUser | null) => DashboardClientUser | null)
  ) => void;
  setProjects: (
    projects:
      | DashboardClientProject[]
      | ((prev: DashboardClientProject[]) => DashboardClientProject[])
  ) => void;
}

export const useDashboardStore = create<DashboardState>()((set, get) => ({
  user: null,
  projects: [],
  setUser: (user) =>
    set((state) => ({
      user: typeof user === "function" ? user(state.user) : user,
    })),
  setProjects: (projects) =>
    set((state) => ({
      projects:
        typeof projects === "function" ? projects(state.projects) : projects,
    })),
}));
