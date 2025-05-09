"use client";

import React, { useCallback, useState } from "react";
import { PackageCheck } from "lucide-react";
import CreateProjectForm from "./CreateProjectForm";

interface Project {
  id: string;
  name: string;
  createdAt: Date;
  userId: string | null;
  updatedAt: Date;
}

interface ProjectInterfaceProps {
  project: Project[];
  user?: {
    id: string;
    project: [];
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

function ProjectInterface({ project, user }: ProjectInterfaceProps) {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = useCallback(() => setOpenModal((prev) => !prev), []);

  const createButton = (
    <button
      onClick={toggleModal}
      className="mt-5 h-10 min-w-48 flex items-center justify-center gap-2 text-sm text-black bg-white rounded-md px-4 transition-all border border-transparent hover:bg-[#1b1b1b] hover:text-white hover:border-white cursor-pointer"
    >
      Criar
    </button>
  );

  const emptyState = (
    <div className="bg-[#1b1b1b] w-full rounded py-28 p-4 flex flex-col items-center justify-center">
      <PackageCheck className="mb-5" color="#333" size={140} />
      <h2 className="font-bold text-2xl">Criar Projeto</h2>
      <p className="text-sm text-white/40 max-w-80 text-center">
        Para anexar horas em uma tarefa é necessário existir um projeto
      </p>
      {createButton}
    </div>
  );

  const projectGrid = (
    <div>
      <div className="flex justify-end">{createButton}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {project.map(({ id, name, createdAt }) => (
          <div
            key={id}
            className="bg-[#1b1b1b] rounded p-4 flex flex-col items-center justify-center cursor-pointer"
          >
            <h2 className="font-bold text-2xl text-white">{name}</h2>
            <p className="text-sm text-white/40 max-w-80 text-center">
              Criado em {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="text-white">
      {project.length === 0 ? emptyState : projectGrid}
      <CreateProjectForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        toggleModal={toggleModal}
        user={user}
      />
    </section>
  );
}

export default ProjectInterface;
