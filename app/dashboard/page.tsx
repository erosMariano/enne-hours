import React from "react";
import { getServerSession } from "next-auth";

import HeaderDashboard from "@/components/views/Dashboard/Header";
import Sidebar from "@/components/views/Dashboard/Sidebar";
import { authOptions } from "@/auth/authOptions";
import ProjectInterface from "@/components/views/Dashboard/Project";
import { prisma } from "@/prisma/prisma";

async function Dashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const projects = user?.id
    ? await prisma.project.findMany({
        where: { userId: user.id },
      })
    : [];

  return (
    <main className="min-h-screen flex">
      <div className="h-auto p-4 min-h-screen flex items-start justify-between gap-4 flex-1">
        <Sidebar />

        <div className="flex-1 flex flex-col gap-4">
          <HeaderDashboard />
          <ProjectInterface project={projects} user={user} />
          {/* <ContentDashboard timeEntries={timeEntries} /> */}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
