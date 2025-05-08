import { prisma } from "@/prisma/prisma";

export async function POST() {
  const data = await prisma.user.create({
    data: {
      email: "erosmariano2@gmail.com",
      name: "Eros Mariano",
    },
  });

  console.log(data);

  return Response.json({ data });
}
