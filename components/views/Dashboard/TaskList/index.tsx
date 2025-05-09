"use client";

import { Pen } from "lucide-react";
import React from "react";

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
  status: keyof typeof statusDetails;
}

interface TaskListProps {
  taskEntries: Task[];
  statusActive: string;
}

function TaskList({ taskEntries }: TaskListProps) {
  return (
    <section>
      <div className="relative overflow-x-auto shadow-md mt-8">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-white">
            <tr>
              <th className="px-6 py-3 font-normal" scope="col">
                Usuário
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
              const statusInfo = statusDetails[task.status] || {
                text: task.status,
                color: "bg-gray-700",
              };

              return (
                <tr
                  key={task.id}
                  className="odd:bg-[#1b1b1b] even:bg-transparent border-b border-white/15"
                >
                  <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                    {task.userName}
                  </td>
                  <td className="px-6 py-4 text-white">{task.projectName}</td>
                  <td className="px-6 py-4 text-white">{task.description}</td>
                  <td className="px-6 py-4 text-white">
                    {(task.totalTime / 60).toFixed(2)}h
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
                    <Pen size={14} />
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
