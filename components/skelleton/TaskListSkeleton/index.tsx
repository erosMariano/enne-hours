import React from "react";

function TaskListSkeleton() {
  return (
    <section>
      <div className="relative overflow-x-auto shadow-md mt-8">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-white">
            <tr>
              <th className="px-6 py-3 font-normal">Título</th>
              <th className="px-6 py-3 font-normal">Projeto</th>
              <th className="px-6 py-3 font-normal">Descrição</th>
              <th className="px-6 py-3 font-normal">Tempo Registrado</th>
              <th className="px-6 py-3 font-normal">Data</th>
              <th className="px-6 py-3 font-normal">Status</th>
              <th className="px-6 py-3 font-normal">Ações</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr
                key={i}
                className="odd:bg-[#1b1b1b] even:bg-transparent border-b border-white/15 animate-pulse"
              >
                {Array.from({ length: 7 }).map((_, j) => (
                  <td key={j} className="px-6 py-4">
                    <div className="h-4 bg-gray-700 rounded w-3/4" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TaskListSkeleton;
