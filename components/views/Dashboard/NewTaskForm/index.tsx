import { DatePicker } from "@heroui/date-picker";
import React, { memo, useEffect, useMemo, useState } from "react";
import { I18nProvider } from "@react-aria/i18n";
import { Select, SelectItem } from "@heroui/select";
import { CircleX } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  parseAbsoluteToLocal,
  parseZonedDateTime,
  ZonedDateTime,
} from "@internationalized/date";

import { ProjectUnique, TaskCreate } from "@/types/types";
import { baseStatusOptions } from "@/utils/constants";
import { getMinutesDifference, zonedDateTimeToJSDate } from "@/utils/getTime";
import { toastError, toastSuccess } from "@/utils/toast";
import Spin from "@/images/icons/spin.svg";
import { useTaskStore } from "@/store/taskItemStore";

interface NewTaskFormProps {
  onChangeOpenModal: () => void;
  onOpenModal: boolean;
  project: ProjectUnique;
  onEditMode: boolean;
}

interface FormData {
  title: string;
  initialDate: ZonedDateTime | null;
  endDate: ZonedDateTime | null;
  status: string;
  description: string;
}

function NewTaskForm({
  project,
  onChangeOpenModal,
  onOpenModal,
  onEditMode,
}: NewTaskFormProps) {
  const baseStatusOptionsMemo = useMemo(() => baseStatusOptions, []);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: "",
      initialDate: null,
      endDate: null,
      status: "",
      description: "",
    },
  });
  const { task } = useTaskStore();
  const route = useRouter();

  // Convert CalendarDate to ISO 8601 string
  const formatCalendarDateToIso = (
    calendarDate: ZonedDateTime | null,
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
        millisecond,
      ),
    );

    return date.toISOString(); // e.g., 2001-03-18T18:03:01.000Z
  };

  async function submitTask(dataSendBackend: TaskCreate, editMode: boolean) {
    const url = "/api/task";
    const method = editMode ? "PATCH" : "POST";

    const payload = editMode
      ? { ...dataSendBackend, id: task[0].id }
      : dataSendBackend;

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      toastError("Erro ao enviar os dados");

      return;
    }

    toastSuccess(
      editMode ? "Atualizada com sucesso" : "Tarefa registrada com sucesso",
    );
    reset();
    onChangeOpenModal();
    route.refresh();
  }

  const onSubmit = async (data: FormData) => {
    if (project) {
      setIsSubmitting(true);

      const startTime = zonedDateTimeToJSDate(
        parseAbsoluteToLocal(formatCalendarDateToIso(data.initialDate!)),
      );

      const endTime = zonedDateTimeToJSDate(
        parseAbsoluteToLocal(formatCalendarDateToIso(data.endDate!)),
      );

      const diffTime = getMinutesDifference(startTime, endTime);
      const status = data.status;

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

      try {
        await submitTask(dataSendBackend, onEditMode);
      } catch {
        toastError("Erro ao enviar os dados");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  function toZonedDateTimeString(date: Date): string {
    return date.toISOString().replace("Z", "[UTC]");
  }

  useEffect(() => {
    if (!onEditMode || task.length === 0) return;

    const [taskItem] = task;

    reset({
      title: taskItem.title,
      description: taskItem.description,
      status: String(taskItem.status),
      initialDate: parseZonedDateTime(
        toZonedDateTimeString(taskItem.startTime),
      ),
      endDate: parseZonedDateTime(toZonedDateTimeString(taskItem.endTime)),
    });
  }, [onEditMode, task, reset]);

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
              control={control}
              name="title"
              render={({ field }) => (
                <input
                  className="outline-none w-full h-10 text-sm border-white/60 focus:border-white bg-[#1b1b1b] text-white placeholder:text-white/40 rounded-md border transition-all p-2 cursor-pointer hover:border-white"
                  id="title-task"
                  placeholder="Digite seu título..."
                  type="text"
                  {...field}
                />
              )}
              rules={{ required: true }}
            />
          </label>

          <div className="flex my-4 justify-between gap-4 flex-col">
            <label className="w-full" htmlFor="initial-date">
              <h3 className="text-sm text-white mb-2">Data de início:</h3>
              <I18nProvider locale="pt-BR">
                <Controller
                  control={control}
                  name="initialDate"
                  render={({ field }) => (
                    <DatePicker
                      aria-labelledby="label-initial-date"
                      className="date-picker"
                      granularity="second"
                      id="initial-date"
                      value={field.value}
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
                  control={control}
                  name="endDate"
                  render={({ field }) => (
                    <DatePicker
                      aria-labelledby="label-end-date"
                      className="date-picker"
                      granularity="second"
                      id="end-date"
                      value={field.value}
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
              control={control}
              name="status"
              render={({ field }) => (
                <Select
                  aria-label="Status"
                  className="w-full select-heroui"
                  id="select-task"
                  placeholder="Selecione o status"
                  selectedKeys={
                    field.value ? new Set([field.value]) : new Set()
                  }
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];

                    field.onChange(value);
                  }}
                >
                  {baseStatusOptionsMemo.map((status) => (
                    <SelectItem key={status.status}>{status.label}</SelectItem>
                  ))}
                </Select>
              )}
              rules={{ required: true }}
            />
          </div>

          <div className="w-full">
            <h3 className="text-sm text-white mb-2 mt-4">Descrição</h3>
            <Controller
              control={control}
              name="description"
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
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Image alt="spin" className="animate-spin" src={Spin} />
            </span>
          ) : (
            <span>{onEditMode ? "Editar" : "Cadastrar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default memo(NewTaskForm);
