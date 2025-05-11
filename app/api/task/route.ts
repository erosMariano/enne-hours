import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/prisma/prisma";
import { authOptions } from "@/auth/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 },
      );
    }

    const body = await req.json();

    await prisma.task.create({
      data: {
        ...body,
      },
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
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID da tarefa é obrigatório." },
        { status: 400 },
      );
    }

    const task = await prisma.task.findUnique({
      where: { id },
      include: { project: true },
    });

    if (!task) {
      return NextResponse.json(
        { error: "Tarefa não encontrada." },
        { status: 404 },
      );
    }

    if (task.project.userId !== session.user.id) {
      return NextResponse.json({ error: "Permissão negada." }, { status: 403 });
    }

    await prisma.task.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date().toISOString(),
      },
    });

    return NextResponse.json(
      { message: "Tarefa atualizada com sucesso!" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Erro interno. Tente novamente mais tarde." },
      { status: 500 },
    );
  }
}
