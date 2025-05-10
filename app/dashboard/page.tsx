import React from "react";
import { getServerSession } from "next-auth";

import { prisma } from "@/prisma/prisma";
import { authOptions } from "@/auth/authOptions";
import DashboardClient from "@/components/views/Dashboard/DashboardClient";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const userSession = session?.user;

  // Verifica se todos os campos necessários existem
  const isUserValid =
    userSession?.id && userSession?.name && userSession?.email;

  if (!isUserValid) {
    return <div className="text-white p-8">Você precisa estar logado.</div>;
  }

  const user = {
    id: userSession.id,
    name: userSession.name ?? "Unknown Name",
    email: userSession.email ?? "Unknown Email",
  };

  const projects = await prisma.project.findMany({
    where: { userId: user.id },
  });

  return <DashboardClient projects={projects} user={user} />;
}
