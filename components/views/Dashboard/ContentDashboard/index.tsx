"use client";
import React, { useMemo, useState } from "react";

import ActionBar from "../ActionBar";
import TaskList from "../TaskList";

import { ProjectUnique, StatusFilter } from "@/types/types";

interface ContentDashboardProps {
  project: ProjectUnique;
}

function ContentDashboard({ project }: ContentDashboardProps) {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");
  const [searchText, setSearchText] = useState("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => setOpenModal((prev) => !prev);
  const handleEditMode = (value: boolean) => setEditMode(value);

  const [editMode, setEditMode] = useState<boolean>(false);

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
        activeModal={openModal}
        handleEditMode={handleEditMode}
        project={project}
        onChangeStatus={handleChangeStatus}
        onEditMode={editMode}
        onOpenModal={handleOpenModal}
        onSearchTimeEntry={handleSearchTextChange}
      />

      {project.tasks.length === 0 ? (
        <p className="text-white text-center mt-10">
          Nenhuma tarefa encontrada neste projeto.
        </p>
      ) : (
        <>
          <TaskList
            handleEditMode={handleEditMode}
            statusActive={selectedStatus}
            taskEntries={filteredTasks}
            onOpenModal={handleOpenModal}
          />
        </>
      )}
    </div>
  );
}

export default ContentDashboard;
