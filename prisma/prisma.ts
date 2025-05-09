import { withAccelerate } from "@prisma/extension-accelerate";

import { PrismaClient } from "@/app/generated/prisma";

declare global {
  var prismaGlobal: PrismaClient | undefined;
  var prismaAcceleratedGlobal: ReturnType<PrismaClient["$extends"]> | undefined;
}

const prismaClient = globalThis.prismaGlobal ?? new PrismaClient();
const prismaAcceleratedClient =
  globalThis.prismaAcceleratedGlobal ?? prismaClient.$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") {
  console.log(process.env.NODE_ENV);
  globalThis.prismaGlobal = prismaClient;
  globalThis.prismaAcceleratedGlobal = prismaAcceleratedClient;
}

export const prisma = prismaClient;
export const prismaAccelerated = prismaAcceleratedClient;
