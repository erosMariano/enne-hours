"use client";

import React, { useEffect } from "react";

import HeaderDashboard from "@/components/views/Dashboard/Header";
import Sidebar from "@/components/views/Dashboard/Sidebar";
import ProjectInterface from "@/components/views/Dashboard/Project";
import { useDashboardStore } from "@/store/dashboardStore";

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
interface DashboardProps {
  projects: Project[];
  user: User;
}

export default function DashboardClient({ projects, user }: DashboardProps) {
  const { setProjects, setUser } = useDashboardStore();

  useEffect(() => {
    setUser(user);
    setProjects(projects);
  }, [user, projects, setProjects, setUser]);

  return (
    <main className="dark min-h-screen flex">
      <div className="h-auto p-4 min-h-screen flex items-start justify-between gap-4 flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-4">
          <HeaderDashboard />
          <ProjectInterface />
        </div>
      </div>
    </main>
  );
}
