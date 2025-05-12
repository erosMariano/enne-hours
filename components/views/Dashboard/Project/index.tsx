"use client";

import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import { PackageCheck } from "lucide-react";
import Link from "next/link";

import { useDashboardStore } from "@/store/dashboardStore";
const CreateProjectForm = dynamic(() => import("./CreateProjectForm"), {
  ssr: false,
});

function ProjectInterface() {
  const { projects } = useDashboardStore();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleModal = useCallback(() => setOpenModal((prev) => !prev), []);

  // Simula carregamento (substitua por lógica real se precisar)
  useEffect(() => {
    if (projects.length > 0 || projects.length === 0) {
      setLoading(false);
    }
  }, [projects]);

  const createButton = (
    <button
      className="mt-5 h-10 min-w-48 flex items-center justify-center gap-2 text-sm text-black bg-white rounded-md px-4 transition-all border border-transparent hover:bg-[#1b1b1b] hover:text-white hover:border-white cursor-pointer"
      onClick={toggleModal}
    >
      Criar
    </button>
  );

  const skeletonCard = (
    <div className="bg-[#1b1b1b] rounded p-4 flex flex-col items-center justify-center animate-pulse h-36">
      <div className="h-6 bg-gray-700 w-32 rounded mb-2" />
      <div className="h-4 bg-gray-600 w-24 rounded" />
    </div>
  );

  const skeletonGrid = (
    <div>
      <div className="flex justify-end">{createButton}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>{skeletonCard}</div>
        ))}
      </div>
    </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
        {projects.map(({ id, name, createdAt }) => (
          <Link
            key={id}
            className="bg-[#1b1b1b] rounded p-4 flex flex-col items-center justify-center hover:bg-white/10 transition-all h-36"
            href={`/dashboard/projeto/${id}`}
          >
            <h2 className="font-bold text-2xl text-white">{name}</h2>
            <p className="text-sm text-white/40 max-w-80 text-center">
              Criado em {new Date(createdAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <section className="text-white">
      {loading
        ? skeletonGrid
        : projects.length === 0
          ? emptyState
          : projectGrid}
      <CreateProjectForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        toggleModal={toggleModal}
      />
    </section>
  );
}

export default ProjectInterface;
