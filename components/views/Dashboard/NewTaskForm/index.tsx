import { StatusFilter } from "@/types/types";
import { DatePicker } from "@heroui/date-picker";
import React from "react";
import { I18nProvider } from "@react-aria/i18n";
import { Select, SelectSection, SelectItem } from "@heroui/select";

interface StatusOptionsProps {
  status: StatusFilter;
  label: string;
}

const statusOptions: StatusOptionsProps[] = [
  { status: "arresting", label: "Pendente" },
  { status: "approved", label: "Aprovado" },
  { status: "rejected", label: "Rejeitado" },
  { status: "doing", label: "Andamento" },
];

function NewTaskForm() {
  return (
    <div className="absolute w-96 bg-[#242424] shadow rounded top-14 right-0 z-10 p-6">
      <h2 className="text-2xl font-bold text-white">Adicionar Nova Tarefa</h2>
      <div>
        <label htmlFor="">
          <h3 className="text-sm text-white mb-2 mt-4">Título da tarefa</h3>
          <input
            type="text"
            placeholder="Digite seu título..."
            className="outline-none w-full h-10 text-sm border-white/60 focus:border-white bg-[#1b1b1b] text-white placeholder:text-white/40 rounded-md border transition-all p-2 cursor-pointer hover:border-white"
          />
        </label>

        <div className="flex my-4 justify-between gap-4">
          <label className="w-full">
            <h3 className="text-sm text-white mb-2">Data de início:</h3>
            <I18nProvider locale="pt-BR">
              <DatePicker showMonthAndYearPickers className="date-picker" />
            </I18nProvider>
          </label>

          <label className="w-full">
            <h3 className="text-sm text-white mb-2">Data de Fim</h3>
            <I18nProvider locale="pt-BR">
              <DatePicker showMonthAndYearPickers className="date-picker" />
            </I18nProvider>
          </label>
        </div>

        <label htmlFor="">
          <h3 className="text-sm text-white mb-2">Status</h3>
          <Select
            className="w-full select-heroui"
            placeholder="Selecione o status"
          >
            {statusOptions.map((status) => (
              <SelectItem key={status.status}>{status.label}</SelectItem>
            ))}
          </Select>
        </label>
      </div>
      <button className="mt-6 w-full h-10 flex items-center justify-center gap-2 text-sm text-black bg-white rounded-md px-4 transition-all border border-transparent  hover:bg-[#1b1b1b] hover:text-white hover:border-white cursor-pointer">
        Cadastrar
      </button>
    </div>
  );
}

export default NewTaskForm;
