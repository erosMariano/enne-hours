import React from "react";

import HeaderDashboard from "@/components/views/Dashboard/Header";
import Sidebar from "@/components/views/Dashboard/Sidebar";
import ProjetoWrapper from "@/components/views/Dashboard/ProjetoWrapper";
import { prisma } from "@/prisma/prisma";

export default async function Projeto({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { tasks: true },
  });

  return (
    <main className="dark min-h-screen flex">
      <div className="h-auto p-4 min-h-screen flex items-start justify-between gap-4 flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-4">
          <HeaderDashboard />
          <ProjetoWrapper project={project} />
        </div>
      </div>
    </main>
  );
}
