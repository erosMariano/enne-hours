import { withAccelerate } from "@prisma/extension-accelerate";

import { PrismaClient, Prisma } from "@/app/generated/prisma";

const prisma = new PrismaClient().$extends(withAccelerate());

const userData: Prisma.UserCreateInput[] = [
  {
    email: "teste@gmail.com",
    name: "Eros Mariano",
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
