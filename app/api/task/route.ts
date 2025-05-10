import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/prisma/prisma";
import { authOptions } from "@/auth/authOptions";

export async function POST(req: Request) {
  try {
    // Obtendo a sessão do usuário autenticado
    const session = await getServerSession(authOptions);

    // Verificando se o usuário está autenticado
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 },
      );
    }

    const body = await req.json();

    // Criando um novo projeto e associando ao usuário autenticado
    await prisma.task.create({
      data: body,
    });

    return NextResponse.json(
      { message: "Tarefa criada com sucesso!" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Erro interno. Tente novamente mais tarde." },
      { status: 500 },
    );
  }
}
