import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";

export async function POST(req: Request) {
  try {
    // Obtendo a sessão do usuário autenticado
    const session = await getServerSession(authOptions);

    // Verificando se o usuário está autenticado
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Verificando se o ID do usuário autenticado é válido

    if (!body.userId) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    // Criando um novo projeto e associando ao usuário autenticado
    const project = await prisma.project.create({
      data: {
        name: body.name || "Novo Projeto", // Usando o nome do projeto do corpo da requisição
        createdAt: new Date(), // Passando a data atual
        userId: body.userId, // ID do usuário autenticado
      },
    });

    return NextResponse.json(
      { message: "Projeto criado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
