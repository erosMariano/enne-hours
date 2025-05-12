import React from "react";
import { notFound } from "next/navigation";

import { prisma } from "@/prisma/prisma";
import HeaderDashboard from "@/components/views/Dashboard/Header";
import Sidebar from "@/components/views/Dashboard/Sidebar";
import ProjetoWrapper from "@/components/views/Dashboard/ProjetoWrapper";

interface ProjetoProps {
  params: { id: string };
}

export default async function Projeto({ params }: ProjetoProps) {
  const { id } = params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { tasks: true },
  });

  //
  if (!project) {
    notFound();

    return null;
  }

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
