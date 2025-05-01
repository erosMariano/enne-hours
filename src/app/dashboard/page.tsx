import Sidebar from "@/components/views/Dashboard/Sidebar";
import React from "react";

function Dashboard() {
  return (
    <main className="min-h-screen flex">
      <div className="p-4 min-h-screen flex items-start justify-between gap-4">
        <Sidebar />
        <div className="flex-1 bg-white/5 rounded p-4">
          <h1 className="text-white font-bold text-2xl">Dashboard</h1>
          <p className="text-white/60 text-sm mb-9">
            Aqui você pode visualizar suas informações
          </p>
          <div className="bg-white/10 h-full rounded p-4">
            <h2 className="text-white font-bold text-xl">Projetos</h2>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
