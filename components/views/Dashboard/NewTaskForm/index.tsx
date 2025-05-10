import { DatePicker } from "@heroui/date-picker";
import React from "react";
import { I18nProvider } from "@react-aria/i18n";
import { Select, SelectItem } from "@heroui/select";
import { CircleX } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

import { ProjectUnique, TaskCreate, TimeEntry } from "@/types/types";
import { baseStatusOptions } from "@/utils/constants";
import { useDashboardStore } from "@/store/dashboardStore";
import { useRouter } from "next/navigation";
import { getMinutesDifference } from "@/utils/getTime";
import { toastError, toastSuccess } from "@/utils/toast";

interface NewTaskFormProps {
  onChangeOpenModal: () => void;
  onOpenModal: boolean;
  onAddTimeEntry: (data: TimeEntry) => void;
  project: ProjectUnique;
}

interface CalendarDate {
  calendar: { identifier: string };
  era: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}

interface FormData {
  title: string;
  initialDate: CalendarDate | null;
  endDate: CalendarDate | null;
  status: string;
  description: string;
}

function NewTaskForm({
  project,
  onChangeOpenModal,
  onOpenModal,
  onAddTimeEntry,
}: NewTaskFormProps) {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: "",
      initialDate: null,
      endDate: null,
      status: "",
      description: "",
    },
  });

  const route = useRouter();

  const { user } = useDashboardStore();

  // Convert CalendarDate to ISO 8601 string
  const formatCalendarDateToIso = (
    calendarDate: CalendarDate | null
  ): string => {
    if (!calendarDate) return "";
    const { year, month, day, hour, minute, second, millisecond } =
      calendarDate;
    const date = new Date(
      Date.UTC(
        year,
        month - 1, // JavaScript months are 0-based
        day,
        hour,
        minute,
        second,
        millisecond
      )
    );
    return date.toISOString(); // e.g., 2001-03-18T18:03:01.000Z
  };

  const onSubmit = async (data: FormData) => {
    if (project) {
      const initialDateIso = formatCalendarDateToIso(data.initialDate);
      const endDateIso = formatCalendarDateToIso(data.endDate);

      const startTime = new Date(initialDateIso);
      const endTime = new Date(endDateIso);

      const diffTime = getMinutesDifference(startTime, endTime);
      const status = Array.from(data.status)[0];

      const dataSendBackend: TaskCreate = {
        title: data.title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        description: data.description,
        projectId: project.id,
        projectName: project.name,
        status,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        totalTime: diffTime,
      };

      console.log(dataSendBackend);

      // Fazendo o fetch com async/await
      try {
        const response = await fetch("/api/task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataSendBackend),
        });
        if (!response.ok) {
          throw new Error("Erro ao enviar os dados");
        }
        const result = await response.json();
        console.log("Resposta do servidor:", result);
        reset(); // Reset form
        onChangeOpenModal(); // Close modal
        route.refresh();
        toastSuccess("Tarefa registrada com sucesso");
      } catch (error) {
        console.error("Erro ao enviar os dados:", error);
        toastError("Erro ao enviar os dados");
      }
    }
  };

  return (
    <div
      className={`absolute w-96 bg-[#242424] shadow rounded top-14 z-10 p-6 transition-all ${
        onOpenModal ? "right-0" : "-right-[calc(100%+100px)]"
      }`}
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title-task">
            <h3 className="text-sm text-white mb-2 mt-4">Título da tarefa</h3>
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  className="outline-none w-full h-10 text-sm border-white/60 focus:border-white bg-[#1b1b1b] text-white placeholder:text-white/40 rounded-md border transition-all p-2 cursor-pointer hover:border-white"
                  id="title-task"
                  placeholder="Digite seu título..."
                  type="text"
                  {...field}
                />
              )}
            />
          </label>

          <div className="flex my-4 justify-between gap-4 flex-col">
            <label className="w-full" htmlFor="initial-date">
              <h3 className="text-sm text-white mb-2">Data de início:</h3>
              <I18nProvider locale="pt-BR">
                <Controller
                  name="initialDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      className="date-picker"
                      granularity="second"
                      id="initial-date"
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />
              </I18nProvider>
            </label>

            <label className="w-full" htmlFor="end-date">
              <h3 className="text-sm text-white mb-2">Data de Fim:</h3>
              <I18nProvider locale="pt-BR">
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      className="date-picker"
                      granularity="second"
                      id="end-date"
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
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
            <Controller
              name="status"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  aria-label="Status"
                  className="w-full select-heroui"
                  id="select-task"
                  placeholder="Selecione o status"
                  onSelectionChange={(key) => field.onChange(key)}
                >
                  {baseStatusOptions.map((status) => (
                    <SelectItem key={status.status}>{status.label}</SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>

          <div className="w-full">
            <h3 className="text-sm text-white mb-2 mt-4">Descrição</h3>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  className="outline-none w-full h-32 text-sm border-white/60 focus:border-white bg-[#1b1b1b] text-white placeholder:text-white/40 rounded-md border transition-all p-2 cursor-pointer hover:border-white"
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <button
          className="mt-6 w-full h-10 flex items-center justify-center gap-2 text-sm text-black bg-white rounded-md px-4 transition-all border border-transparent hover:bg-[#1b1b1b] hover:text-white hover:border-white cursor-pointer"
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default NewTaskForm;
