import { StatusOptionsProps } from "@/types/types";

export const baseStatusOptions: StatusOptionsProps[] = [
  { status: "arresting", label: "Pendente" },
  { status: "approved", label: "Aprovado" },
  { status: "rejected", label: "Rejeitado" },
  { status: "doing", label: "Em andamento" },
];

export const statusOptionsWithAll: StatusOptionsProps[] = [
  { status: "all", label: "Todos" },
  ...baseStatusOptions,
];
