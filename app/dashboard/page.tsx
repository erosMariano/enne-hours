import ContentDashboard from "@/components/views/Dashboard/ContentDashboard";
import HeaderDashboard from "@/components/views/Dashboard/Header";
import Sidebar from "@/components/views/Dashboard/Sidebar";
import { TimeEntry } from "@/types/types";
import React from "react";

function Dashboard() {
  const timeEntries: TimeEntry[] = [
    {
      imgUrl: "US",
      id: 1,
      user: "João Silva",
      project: "Site ACME",
      description: "Desenvolvimento do layout da homepage",
      time: "3h 45min",
      date: "2025-05-01",
      status: "approved",
    },
    {
      imgUrl: "US",

      id: 2,
      user: "Maria Souza",
      project: "App Financeiro",
      description: "Correção de bugs na tela de login",
      time: "2h 10min",
      date: "2025-04-30",
      status: "arresting",
    },
    {
      imgUrl: "US",

      id: 3,
      user: "Carlos Mendes",
      project: "Portal RH",
      description: "Implementação da API de autenticação",
      time: "5h 00min",
      date: "2025-04-29",
      status: "approved",
    },
    {
      imgUrl: "US",

      id: 4,
      user: "Ana Lima",
      project: "Sistema Interno",
      description: "Documentação das funcionalidades",
      time: "1h 30min",
      date: "2025-04-28",
      status: "rejected",
    },
    {
      imgUrl: "US",
      id: 5,
      user: "João Silva",
      project: "Site ACME",
      description: "Ajustes finais no rodapé",
      time: "0h 45min",
      date: "2025-04-30",
      status: "approved",
    },
  ];

  return (
    <main className="min-h-screen flex">
      <div className="p-4 min-h-screen flex items-start justify-between gap-4 flex-1">
        <Sidebar />

        <div className="flex-1 flex flex-col gap-4">
          <HeaderDashboard />
          <ContentDashboard timeEntries={timeEntries} />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
