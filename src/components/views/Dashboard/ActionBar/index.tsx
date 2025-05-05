"use client";

import { StatusFilter, TimeEntry } from "@/types/types";
import { Play, Plus, Settings } from "lucide-react";
import React, { useState } from "react";
import NewTaskForm from "../NewTaskForm";

interface ActionBarProps {
  onChangeStatus: (status: StatusFilter) => void;
  onAddNewTimeEntry: (newTimeEntry: TimeEntry) => void;
  onSearchTimeEntry: (text: string) => void;
}

interface StatusOptionsProps {
  status: StatusFilter;
  label: string;
}
const statusOptions: StatusOptionsProps[] = [
  { status: "all", label: "Todos" },
  { status: "approved", label: "Aprovado" },
  { status: "arresting", label: "Pendente" },
  { status: "rejected", label: "Rejeitado" },
  { status: "doing", label: "Andamento" },
];

function ActionBar({
  onChangeStatus,
  onAddNewTimeEntry,
  onSearchTimeEntry,
}: ActionBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleStatusChange = (status: StatusFilter) => {
    const found = statusOptions.find((item) => item.status == status);
    if (!found) return;

    setSelectedStatus(found);
    onChangeStatus(status);
    setDropdownOpen(false);
  };

  const handleAddTimeEntry = () => {
    onAddNewTimeEntry({
      imgUrl: "US",
      id: 1212,
      user: "Eros Mariano Silva",
      project: "Site ACME",
      description: "Ajustes finais no rodapé",
      time: "0h 45min",
      date: "2025-04-30",
      status: "doing",
    });
  };

  return (
    <>
      <div className="flex-1 flex items-center gap-4">
        <input
          onChange={(el) => onSearchTimeEntry(el.target.value)}
          type="text"
          placeholder="Procure por projeto"
          className="outline-none h-10 text-sm focus:border-white bg-[#1b1b1b] text-white placeholder:text-white/40 rounded-md border border-transparent transition-all p-2 w-full max-w-64 cursor-pointer hover:border-white"
        />

        <div className="relative z-10">
          <button
            onClick={toggleDropdown}
            className="gap-2 flex outline-none h-10 text-sm focus:border-white bg-[#1b1b1b] text-white placeholder:text-white/40 rounded-md border border-transparent transition-all p-2 w-full max-w-32 justify-between items-center cursor-pointer hover:border-white"
          >
            {selectedStatus.label} <Play className="rotate-90" size={14} />
          </button>

          <div
            className={`absolute bg-[#1b1b1b] z-100 rounded p-2 text-white top-14  transition-all ${
              dropdownOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {statusOptions.map((el) => (
              <button
                onClick={() => handleStatusChange(el.status)}
                key={el.status}
                className="cursor-pointer px-10 py-2.5 border border-transparent rounded transition-all hover:border-white w-full text-sm"
              >
                {el.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex outline-none h-10 text-sm focus:border-white bg-[#1b1b1b] text-white  hover:border-white rounded-md border border-transparent transition-all px-2 gap-2 justify-between items-center cursor-pointer">
          <Settings /> Gerenciar Tarefas
        </button>
        <button
          onClick={handleAddTimeEntry}
          className="h-10 flex items-center justify-center gap-2 text-sm text-black bg-white rounded-md px-4 transition-all border border-transparent  hover:bg-[#1b1b1b] hover:text-white hover:border-white cursor-pointer"
        >
          <Plus /> Nova Tarefa
        </button>

        <NewTaskForm />
      </div>
    </>
  );
}

export default ActionBar;
