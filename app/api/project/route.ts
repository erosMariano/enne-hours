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

    // Verificando se o ID do usuário autenticado é válido

    if (!body.userId) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 },
      );
    }

    // Criando um novo projeto e associando ao usuário autenticado
    await prisma.project.create({
      data: {
        name: body.name || "Novo Projeto", // Usando o nome do projeto do corpo da requisição
        createdAt: new Date(), // Passando a data atual
        userId: body.userId, // ID do usuário autenticado
      },
    });

    return NextResponse.json(
      { message: "Projeto criado com sucesso!" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Erro interno. Tente novamente mais tarde." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
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

    const { taskId } = await req.json();

    if (!taskId) {
      return NextResponse.json(
        { error: "ID não encontrado." },
        { status: 404 },
      );
    }

    // Criando um novo projeto e associando ao usuário autenticado

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
      include: { project: true },
    });

    if (!task || task.project.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Permissão negada para deletar essa tarefa." },
        { status: 403 },
      );
    }
    await prisma.task.delete({ where: { id: taskId } });

    return NextResponse.json(
      { message: "Tarefa deletada com sucesso!" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Erro interno. Tente novamente mais tarde." },
      { status: 500 },
    );
  }
}
