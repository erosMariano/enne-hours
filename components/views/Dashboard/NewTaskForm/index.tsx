import { DatePicker } from "@heroui/date-picker";
import React from "react";
import { I18nProvider } from "@react-aria/i18n";
import { Select, SelectItem } from "@heroui/select";
import { CircleX } from "lucide-react";

import { TimeEntry } from "@/types/types";
import { baseStatusOptions } from "@/utils/constants";

interface NewTaskFormProps {
  onChangeOpenModal: () => void;
  onOpenModal: boolean;
  onAddTimeEntry: (data: TimeEntry) => void;
}
function NewTaskForm({
  onChangeOpenModal,
  onOpenModal,
  onAddTimeEntry,
}: NewTaskFormProps) {
  function handleAddTimeEntry() {
    onAddTimeEntry({
      imgUrl: "US",
      id: 1212,
      user: "Eros Mariano Silva",
      project: "Site ACME",
      description: "Ajustes finais no rodapé",
      time: "0h 45min",
      date: "2025-04-30",
      status: "doing",
    });
  }

  return (
    <div
      className={`absolute w-96 bg-[#242424] shadow rounded top-14 z-10 p-6 transition-all ${onOpenModal ? "right-0" : "-right-[calc(100%+100px)]"}`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Adicionar Nova Tarefa</h2>
        <button
          className="hover:bg-[#323232] p-2 transition-all rounded"
          onClick={onChangeOpenModal}
        >
          <CircleX className="text-red-500" />
        </button>
      </div>
      <div>
        <label htmlFor="title-task">
          <h3 className="text-sm text-white mb-2 mt-4">Título da tarefa</h3>
          <input
            className="outline-none w-full h-10 text-sm border-white/60 focus:border-white bg-[#1b1b1b] text-white placeholder:text-white/40 rounded-md border transition-all p-2 cursor-pointer hover:border-white"
            id="title-task"
            placeholder="Digite seu título..."
            type="text"
          />
        </label>

        <div className="flex my-4 justify-between gap-4 flex-col">
          <label className="w-full" htmlFor="initial-date">
            <h3 className="text-sm text-white mb-2">Data de início:</h3>
            <I18nProvider locale="pt-BR">
              <DatePicker
                className="date-picker"
                granularity="second"
                id="initial-date"
              />
            </I18nProvider>
          </label>

          <label className="w-full" htmlFor="end-date">
            <h3 className="text-sm text-white mb-2">Data de Fim: </h3>
            <I18nProvider locale="pt-BR">
              <DatePicker
                className="date-picker"
                granularity="second"
                id="end-date"
              />
            </I18nProvider>
          </label>
        </div>

        <div className="w-full">
          <label
            className="text-sm text-white mb-2 block"
            htmlFor="select-task"
          >
            Status
          </label>
          <Select
            aria-label="Status"
            className="w-full select-heroui"
            id="select-task"
            placeholder="Selecione o status"
          >
            {baseStatusOptions.map((status) => (
              <SelectItem key={status.status}>{status.label}</SelectItem>
            ))}
          </Select>
        </div>

        <div className="w-full">
          <h3 className="text-sm text-white mb-2 mt-4">Descrição</h3>
          <textarea className="outline-none w-full h-32 text-sm border-white/60 focus:border-white bg-[#1b1b1b] text-white placeholder:text-white/40 rounded-md border transition-all p-2 cursor-pointer hover:border-white" />
        </div>
      </div>
      <button
        className="mt-6 w-full h-10 flex items-center justify-center gap-2 text-sm text-black bg-white rounded-md px-4 transition-all border border-transparent  hover:bg-[#1b1b1b] hover:text-white hover:border-white cursor-pointer"
        onClick={handleAddTimeEntry}
      >
        Cadastrar
      </button>
    </div>
  );
}

export default NewTaskForm;
