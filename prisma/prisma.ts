import { withAccelerate } from "@prisma/extension-accelerate";

import { PrismaClient } from "@/app/generated/prisma";

export const prisma = new PrismaClient().$extends(withAccelerate());
