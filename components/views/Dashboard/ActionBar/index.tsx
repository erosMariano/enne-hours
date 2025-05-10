"use client";

import { Play, Plus, Settings } from "lucide-react";
import React, { useState } from "react";

import NewTaskForm from "../NewTaskForm";

import { ProjectUnique, StatusFilter } from "@/types/types";
import { statusOptionsWithAll } from "@/utils/constants";

interface ActionBarProps {
  onChangeStatus: (status: StatusFilter) => void;
  onSearchTimeEntry: (text: string) => void;
  project: ProjectUnique;
  onOpenModal: () => void;
  activeModal: boolean;
  onEditMode: boolean;
  handleEditMode: (value: boolean) => void;
}

function ActionBar({
  onChangeStatus,
  onSearchTimeEntry,
  project,
  onOpenModal,
  activeModal,
  onEditMode,
  handleEditMode,
}: ActionBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(statusOptionsWithAll[0]);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleStatusChange = (status: StatusFilter) => {
    const found = statusOptionsWithAll.find((item) => item.status == status);

    if (!found) return;

    setSelectedStatus(found);
    onChangeStatus(status);
    setDropdownOpen(false);
  };

  function handleNewTask() {
    handleEditMode(false);
    onOpenModal();
  }

  return (
    <div className="flex">
      <div className="flex-1 flex items-center gap-4 ">
        <input
          className="outline-none h-10 text-sm focus:border-white bg-[#1b1b1b] text-white placeholder:text-white/40 rounded-md border border-transparent transition-all p-2 w-full max-w-64 cursor-pointer hover:border-white"
          placeholder="Procure por projeto"
          type="text"
          onChange={(el) => onSearchTimeEntry(el.target.value)}
        />

        <div className="relative z-10">
          <button
            className="gap-2 flex outline-none h-10 text-sm focus:border-white bg-[#1b1b1b] text-white placeholder:text-white/40 rounded-md border border-transparent transition-all p-2 w-full max-w-32 justify-between items-center cursor-pointer hover:border-white"
            onClick={toggleDropdown}
          >
            {selectedStatus.label} <Play className="rotate-90" size={14} />
          </button>

          <div
            className={`absolute bg-[#1b1b1b] z-20 rounded p-2 text-white top-14  transition-all ${
              dropdownOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {statusOptionsWithAll.map((el) => (
              <button
                key={el.status}
                className="cursor-pointer px-10 py-2.5 border border-transparent rounded transition-all hover:border-white w-full text-sm"
                onClick={() => handleStatusChange(el.status)}
              >
                {el.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        <button className="flex outline-none h-10 text-sm focus:border-white bg-[#1b1b1b] text-white  hover:border-white rounded-md border border-transparent transition-all px-2 gap-2 justify-between items-center cursor-pointer">
          <Settings /> Gerenciar Tarefas
        </button>
        <button
          className="h-10 flex items-center justify-center gap-2 text-sm text-black bg-white rounded-md px-4 transition-all border border-transparent  hover:bg-[#1b1b1b] hover:text-white hover:border-white cursor-pointer"
          onClick={handleNewTask}
        >
          <Plus /> Nova Tarefa
        </button>

        <NewTaskForm
          project={project}
          onChangeOpenModal={onOpenModal}
          onEditMode={onEditMode}
          onOpenModal={activeModal}
        />
      </div>
    </div>
  );
}

export default ActionBar;
