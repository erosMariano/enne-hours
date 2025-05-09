import ContentDashboard from "@/components/views/Dashboard/ContentDashboard";
import HeaderDashboard from "@/components/views/Dashboard/Header";
import Sidebar from "@/components/views/Dashboard/Sidebar";
import { prisma } from "@/prisma/prisma";
import React from "react";

export default async function Projeto({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      tasks: true,
    },
  });

  return (
    <main className="min-h-screen flex">
      <div className="h-auto p-4 min-h-screen flex items-start justify-between gap-4 flex-1">
        <Sidebar />

        <div className="flex-1 flex flex-col gap-4">
          <HeaderDashboard />
          {project ? (
            <ContentDashboard project={project} />
          ) : (
            <p>Projeto não encontrato</p>
          )}
        </div>
      </div>
    </main>
  );
}
