import { getServerSession } from "next-auth";

import { prisma } from "@/prisma/prisma";
import { authOptions } from "@/auth/authOptions";
import DashboardClient from "@/components/views/Dashboard/DashboardClient";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const user = {
    id: session!.user.id,
    name: session!.user.name!,
    email: session!.user.email!,
  };

  const projects = await prisma.project.findMany({
    where: { userId: user.id },
  });

  return <DashboardClient projects={projects} user={user} />;
}
