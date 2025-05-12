import Image from "next/image";
import Link from "next/link";

import Logo from "@/images/logo.svg";
import { prisma } from "@/prisma/prisma";

// Função de pré-renderização para gerar as rotas dinâmicas
export async function generateStaticParams() {
  // Buscar todos os projetos no banco de dados
  const projects = await prisma.project.findMany({
    select: { id: true },
  });

  // Retornar os parâmetros necessários para cada projeto
  return projects.map((project) => ({
    id: project.id,
  }));
}

const statusDetails = {
  approved: {
    text: "Aprovado",
    color: "bg-green-800",
  },
  arresting: {
    text: "Pendente",
    color: "bg-yellow-800",
  },
  rejected: {
    text: "Rejeitado",
    color: "bg-red-800",
  },
  doing: {
    text: "Andamento",
    color: "bg-blue-800",
  },
};

export default async function Projeto({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Buscando o projeto no banco de dados com base no ID
  const project = await prisma.project.findUnique({
    where: { id },
    include: { tasks: true, user: true }, // Está vindo a senha, remover
  });

  const dateFormatter = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" });

  const totalHours = project?.tasks.reduce(
    (acc, value) => acc + value.totalTime,
    0,
  );

  function getTimeFormatted(minutes: number) {
    const min = Math.floor(minutes / 60);
    const seconds = Math.floor(minutes % 60);

    return `${min}h${seconds}min`;
  }

  return (
    <main className="dark min-h-screen">
      <div className="h-auto p-4 min-h-screen items-start justify-between gap-4">
        <div className="">
          {project ? (
            <>
              <header className="flex justify-between mb-6">
                <Link href="/">
                  <Image alt="Enne Hours" src={Logo} />
                </Link>
              </header>
              <div className="bg-[#1b1b1b] rounded p-4">
                <p className="text-sm mb-2">Total de horas trabalhadas</p>

                <div>
                  <span className="font-bold text-4xl">
                    {getTimeFormatted(Number(totalHours))}
                  </span>
                </div>
              </div>
              <div className="relative overflow-x-auto shadow-md mt-8">
                <table className="w-full text-sm text-left rtl:text-right">
                  <thead className="text-xs text-white">
                    <tr>
                      <th className="px-6 py-3 font-normal" scope="col">
                        Feito por
                      </th>

                      <th className="px-6 py-3 font-normal" scope="col">
                        Título
                      </th>
                      <th className="px-6 py-3 font-normal" scope="col">
                        Projeto
                      </th>
                      <th className="px-6 py-3 font-normal" scope="col">
                        Descrição
                      </th>
                      <th className="px-6 py-3 font-normal" scope="col">
                        Tempo Registrado
                      </th>
                      <th className="px-6 py-3 font-normal" scope="col">
                        Data
                      </th>
                      <th className="px-6 py-3 font-normal" scope="col">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.tasks.map((task) => {
                      const statusInfo = statusDetails[
                        task.status as keyof typeof statusDetails
                      ] || {
                        text: task.status,
                        color: "bg-gray-700",
                      };

                      return (
                        <tr
                          key={task.id}
                          className="odd:bg-[#1b1b1b] even:bg-transparent border-b border-white/15"
                        >
                          <td className="px-6 py-4 font-medium text-white whitespace-nowrap min-w-[158px]">
                            {project.user?.name}
                          </td>

                          <td className="px-6 py-4 font-medium text-white whitespace-nowrap min-w-[158px]">
                            {task.title}
                          </td>
                          <td className="px-6 py-4 text-white min-w-[158px]">
                            {task.projectName}
                          </td>
                          <td className="px-6 py-4 text-white min-w-[158px]">
                            {task.description}
                          </td>
                          <td className="px-6 py-4 text-white min-w-[158px]">
                            {getTimeFormatted(Number(task.totalTime))}
                          </td>
                          <td className="px-6 py-4 text-white min-w-[158px]">
                            {dateFormatter.format(new Date(task.createdAt))}
                          </td>
                          <td className="px-6 py-4 text-white min-w-[158px]">
                            <span
                              className={`text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full ${statusInfo.color}`}
                            >
                              {statusInfo.text}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <h1>Project not found</h1>
          )}
        </div>
      </div>
    </main>
  );
}
