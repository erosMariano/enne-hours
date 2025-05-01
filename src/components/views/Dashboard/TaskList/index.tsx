import { Pen } from "lucide-react";
import React from "react";

interface TimeEntry {
  imgUrl: string;
  id: number;
  usuario: string;
  projeto: string;
  descricao: string;
  tempoRegistrado: string;
  data: string;
  status: "approved" | "arresting" | "rejected";
}
function TaskList() {
  const timeEntries: TimeEntry[] = [
    {
      imgUrl: "US",
      id: 1,
      usuario: "João Silva",
      projeto: "Site ACME",
      descricao: "Desenvolvimento do layout da homepage",
      tempoRegistrado: "3h 45min",
      data: "2025-05-01",
      status: "approved",
    },
    {
      imgUrl: "US",

      id: 2,
      usuario: "Maria Souza",
      projeto: "App Financeiro",
      descricao: "Correção de bugs na tela de login",
      tempoRegistrado: "2h 10min",
      data: "2025-04-30",
      status: "arresting",
    },
    {
      imgUrl: "US",

      id: 3,
      usuario: "Carlos Mendes",
      projeto: "Portal RH",
      descricao: "Implementação da API de autenticação",
      tempoRegistrado: "5h 00min",
      data: "2025-04-29",
      status: "approved",
    },
    {
      imgUrl: "US",

      id: 4,
      usuario: "Ana Lima",
      projeto: "Sistema Interno",
      descricao: "Documentação das funcionalidades",
      tempoRegistrado: "1h 30min",
      data: "2025-04-28",
      status: "rejected",
    },
    {
      imgUrl: "US",
      id: 5,
      usuario: "João Silva",
      projeto: "Site ACME",
      descricao: "Ajustes finais no rodapé",
      tempoRegistrado: "0h 45min",
      data: "2025-04-30",
      status: "approved",
    },
  ];

  const statusDetails = {
    approved: {
      text: "Aprovado",
      color: "bg-green-600",
    },
    arresting: {
      text: "Pendente",
      color: "bg-yellow-600",
    },
    rejected: {
      text: "Rejeitado",
      color: "bg-red-600",
    },
  };
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
            {timeEntries.map((entry) => (
              <tr
                className="odd:bg-white/5  even:bg-transparent  border-b "
                key={entry.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-white"
                >
                  {entry.usuario}
                </th>
                <td className="px-6 py-4 text-white">{entry.projeto}</td>
                <td className="px-6 py-4 text-white">{entry.descricao}</td>
                <td className="px-6 py-4 text-white">
                  {entry.tempoRegistrado}
                </td>
                <td className="px-6 py-4 text-white">
                  {Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(
                    new Date(entry.data)
                  )}
                </td>
                <td className={`px-6 py-4 text-white `}>
                  <span
                    className={`text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full text-white ${
                      statusDetails[entry.status].color
                    }`}
                  >
                    {statusDetails[entry.status].text}
                  </span>
                </td>
                <td className="px-6 py-4 text-white">
                  <Pen size={14} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TaskList;
