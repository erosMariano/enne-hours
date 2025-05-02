"use client";

import { StatusFilter, TimeEntry } from "@/types/types";
import { Pen } from "lucide-react";
import React from "react";

interface TaskListProps {
  timeEntries: TimeEntry[];
  statusActive: StatusFilter;
}

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
  all: {
    text: "Todos",
    color: "bg-red-800",
  },
};
const dateFormatter = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" });

function TaskList({ timeEntries }: TaskListProps) {
  return (
    <section>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-white">
            <tr>
              <th scope="col" className="px-6 py-3 font-normal">
                Usuário
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Projeto
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Descrição
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Tempo Registrado
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Data
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Status
              </th>
              <th scope="col" className="px-6 py-3 font-normal">
                Acões
              </th>
            </tr>
          </thead>
          <tbody>
            {timeEntries.map(
              ({ date, description, id, project, status, time, user }) => (
                <tr
                  className="odd:bg-[#1b1b1b]  even:bg-transparent  border-b "
                  key={id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                  >
                    {user}
                  </th>
                  <td className="px-6 py-4 text-white">{project}</td>
                  <td className="px-6 py-4 text-white">{description}</td>
                  <td className="px-6 py-4 text-white">{time}</td>
                  <td className="px-6 py-4 text-white">
                    {dateFormatter.format(new Date(date))}
                  </td>
                  <td className={`px-6 py-4 text-white `}>
                    <span
                      className={`text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full text-white ${statusDetails[status].color}`}
                    >
                      {statusDetails[status].text}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">
                    <Pen size={14} />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TaskList;
