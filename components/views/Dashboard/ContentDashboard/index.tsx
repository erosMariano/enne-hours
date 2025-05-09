"use client";
import React, { useMemo, useState } from "react";

import ActionBar from "../ActionBar";
import TaskList from "../TaskList";

import { StatusFilter } from "@/types/types";

export interface Task {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  userName: string;
  projectName: string;
  description: string;
  startTime: Date;
  endTime: Date;
  totalTime: number;
  status: "approved" | "arresting" | "rejected" | "doing";
}

interface Project {
  id: string;
  name: string;
  createdAt: Date;
  userId: string | null;
  updatedAt: Date;
  tasks: Task[];
}

interface ContentDashboardProps {
  project: Project;
}

function ContentDashboard({ project }: ContentDashboardProps) {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");
  const [searchText, setSearchText] = useState("");

  function handleChangeStatus(status: StatusFilter) {
    setSelectedStatus(status);
  }

  function handleSearchTextChange(text: string) {
    setSearchText(text.toLowerCase());
  }

  const filteredTasks = useMemo(() => {
    return project.tasks.filter((task) => {
      const matchesSearch = task.description.toLowerCase().includes(searchText);
      const matchesStatus =
        selectedStatus === "all" || task.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [project.tasks, searchText, selectedStatus]);

  return (
    <div className="flex-1 flex flex-col gap-4">
      <ActionBar
        onAddNewTimeEntry={() => {}}
        onChangeStatus={handleChangeStatus}
        onSearchTimeEntry={handleSearchTextChange}
      />

      {project.tasks.length === 0 ? (
        <p className="text-white text-center mt-10">
          Nenhuma tarefa encontrada neste projeto.
        </p>
      ) : (
        <TaskList statusActive={selectedStatus} taskEntries={filteredTasks} />
      )}
    </div>
  );
}

export default ContentDashboard;
