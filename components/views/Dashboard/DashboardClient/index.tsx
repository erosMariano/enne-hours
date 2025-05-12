"use client";

import React, { useEffect } from "react";

import HeaderDashboard from "@/components/views/Dashboard/Header";
import Sidebar from "@/components/views/Dashboard/Sidebar";
import ProjectInterface from "@/components/views/Dashboard/Project";
import { useDashboardStore } from "@/store/dashboardStore";
import { DashboardClientProps } from "@/types/types";

export default function DashboardClient({
  projects,
  user,
}: DashboardClientProps) {
  const { setProjects, setUser } = useDashboardStore();

  useEffect(() => {
    setUser((prev) => {
      if (!user || (prev && prev.id === user.id)) return prev;
      return user;
    });

    setProjects((prev) => {
      const sameProjects =
        prev.length === projects.length &&
        prev.every((p, i) => p.id === projects[i].id);
      return sameProjects ? prev : projects;
    });
  }, [user, projects, setUser, setProjects]);

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
