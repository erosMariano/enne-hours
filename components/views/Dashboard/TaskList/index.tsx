"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { toastError, toastSuccess } from "@/utils/toast";

const statusDetails = {
  approved: {
    text: "Aprovado",
    color: "bg-green-800",
  },
  arresting: {
    text: "Pendente",
    color: "bg-yellow-800",
  },
  rejected: {
    text: "Rejeitado",
    color: "bg-red-800",
  },
  doing: {
    text: "Andamento",
    color: "bg-blue-800",
  },
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" });

interface Task {
  title: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  projectName: string;
  description: string;
  startTime: Date;
  endTime: Date;
  totalTime: number;
  status: keyof typeof statusDetails | string;
}

interface TaskListProps {
  taskEntries: Task[];
  statusActive: string;
}

function TaskList({ taskEntries }: TaskListProps) {
  const router = useRouter();

  async function handleDeleteTask(id: string) {
    const response = await fetch("/api/project", {
      body: JSON.stringify({ taskId: id }),
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok) {
      toastError(result.message);

      return;
    }

    toastSuccess(result.message);
    router.refresh();
    try {
    } catch (error) {
      toastError(String(error));
    }
  }

  return (
    <section>
      <div className="relative overflow-x-auto shadow-md mt-8">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-white">
            <tr>
              <th className="px-6 py-3 font-normal" scope="col">
                Título
              </th>
              <th className="px-6 py-3 font-normal" scope="col">
                Projeto
              </th>
              <th className="px-6 py-3 font-normal" scope="col">
                Descrição
              </th>
              <th className="px-6 py-3 font-normal" scope="col">
                Tempo Registrado
              </th>
              <th className="px-6 py-3 font-normal" scope="col">
                Data
              </th>
              <th className="px-6 py-3 font-normal" scope="col">
                Status
              </th>
              <th className="px-6 py-3 font-normal" scope="col">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {taskEntries.map((task) => {
              const statusInfo = statusDetails[
                task.status as keyof typeof statusDetails
              ] || {
                text: task.status,
                color: "bg-gray-700",
              };

              return (
                <tr
                  key={task.id}
                  className="odd:bg-[#1b1b1b] even:bg-transparent border-b border-white/15"
                >
                  <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                    {task.title}
                  </td>
                  <td className="px-6 py-4 text-white">{task.projectName}</td>
                  <td className="px-6 py-4 text-white">{task.description}</td>
                  <td className="px-6 py-4 text-white">
                    {Math.floor(task.totalTime / 60)}h
                    {Math.floor(task.totalTime % 60)}min
                  </td>
                  <td className="px-6 py-4 text-white">
                    {dateFormatter.format(new Date(task.createdAt))}
                  </td>
                  <td className="px-6 py-4 text-white">
                    <span
                      className={`text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full ${statusInfo.color}`}
                    >
                      {statusInfo.text}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">
                    <Dropdown>
                      <DropdownTrigger>
                        <EllipsisVertical
                          className="hover:bg-white/10 p-1 rounded cursor-pointer transition-all"
                          size={28}
                        />
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="edit">Editar Tarefa</DropdownItem>
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Deletar
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TaskList;
