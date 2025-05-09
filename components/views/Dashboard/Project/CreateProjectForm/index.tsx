"use client";

import React, { useCallback } from "react";
import { CircleX } from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import Spin from "@/images/icons/spin.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastError, toastSuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";

const projectSchema = z.object({
  project: z.string().min(3, "Mínimo 3 caracteres"),
});

type ProjectData = z.infer<typeof projectSchema>;

interface CreateProjectFormProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleModal: () => void;
  user?: {
    id: string;
    project: [];
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

function CreateProjectForm({
  user,
  openModal,
  setOpenModal,
  toggleModal,
}: CreateProjectFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectData>({
    resolver: zodResolver(projectSchema),
  });

  const handleCreateNewProject = useCallback(
    async (data: ProjectData) => {
      if (!user) return;

      try {
        const response = await fetch("/api/create-project", {
          method: "POST",
          body: JSON.stringify({
            name: data.project,
            userId: user.id,
          }),
        });

        const result = await response.json();
        toastSuccess(result.message);
        setOpenModal(false);
        router.refresh();
      } catch {
        toastError("Erro ao criar projeto");
      }
    },
    [user, setOpenModal, router]
  );

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/90">
      <div className="relative bg-[#1b1b1b] w-full max-w-5xl rounded p-8 flex flex-col items-center justify-center">
        <button
          onClick={toggleModal}
          className="absolute right-4 top-4 p-1 rounded hover:bg-white/10 transition-all"
        >
          <CircleX className="text-red-500" />
        </button>

        <h2 className="text-white text-2xl font-bold mb-6">Criar Projeto</h2>

        <form
          onSubmit={handleSubmit(handleCreateNewProject)}
          className="flex flex-col items-center w-full"
        >
          <input
            type="text"
            placeholder="Nome do projeto"
            {...register("project")}
            className="w-full max-w-64 h-10 text-sm p-2 rounded-md border border-transparent bg-[#333333] text-white placeholder:text-white/40 outline-none focus:border-white transition-all hover:border-white cursor-pointer"
          />
          {errors.project && (
            <p className="text-xs text-red-500 mt-1">
              {errors.project.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 min-w-64 h-10 px-4 text-sm rounded-md flex items-center justify-center gap-2 bg-white text-black border border-transparent transition-all hover:bg-[#1b1b1b] hover:text-white hover:border-white disabled:bg-transparent disabled:border-white"
          >
            {isSubmitting ? (
              <Image alt="Carregando" src={Spin} className="animate-spin" />
            ) : (
              "Criar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectForm;
