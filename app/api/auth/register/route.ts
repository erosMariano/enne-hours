import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";

import { prisma } from "@/prisma/prisma";

const userSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  name: z.string().min(1, "Nome é obrigatório"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = userSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    const { email, name, password } = parsed.data;

    if (!email || !name || !password) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return Response.json({ error: "Email já cadastrado" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
      },
    });

    return NextResponse.json(
      { message: "Usuário criado com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar usuário:", error);

    return NextResponse.json(
      { error: "Erro interno. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
