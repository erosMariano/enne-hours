import { create } from "zustand";

import { ItemTaskList } from "@/types/types";

interface DashboardState {
  task: ItemTaskList[];
  setTask: (task: ItemTaskList[]) => void;
}

export const useTaskStore = create<DashboardState>()((set) => ({
  task: [],
  setTask: (task) => set({ task }),
}));
