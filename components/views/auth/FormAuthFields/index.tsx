"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail, User } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer } from "react-toastify";

import { FormAuthProps } from "@/types/types";
import Logo from "@/images/logo-mini.svg";
import Spin from "@/images/icons/spin.svg";
import CirclesLogin from "@/images/icons/circle-login.svg";
import { toastError, toastSuccess } from "@/utils/toast";

import { signIn } from "next-auth/react";

const baseSchema = {
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter mais de 6 dígitos"),
};

const getFormSchema = (type: "login" | "register") =>
  z.object({
    name:
      type === "register"
        ? z.string().min(2, "Digite um nome válido")
        : z.string().optional(),
    ...baseSchema,
  });

type FormData = z.infer<ReturnType<typeof getFormSchema>>;

function FormAuthFields({ type, labelSubmit, subtitle, title }: FormAuthProps) {
  const schema = getFormSchema(type);
  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmitData = async (data: FormData) => {
    if (type == "login") {
      await handleLogin(data);
    } else if (type == "register") {
      await handleRegister(data);
    } else {
      toastError("Formulário inválido");
    }
  };

  async function handleRegister(data: FormData) {
    const response = await fetch("/api/auth/register", {
      body: JSON.stringify(data),
      method: "POST",
    });

    const result = await response.json();

    if (!response.ok) {
      toastError(result.error || "Erro ao registrar");

      return;
    }

    await handleLogin(data);
  }

  async function handleLogin(data: FormData) {
    const loginRes = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (loginRes?.ok) {
      if (type === "login") {
        toastSuccess("Login Realizado com Sucesso!");
      }
      route.push("/dashboard");
    } else {
      toastError("Erro ao fazer login");
    }
  }

  return (
    <>
      <ToastContainer />

      <form onSubmit={handleSubmit(onSubmitData)}>
        <div className=" mb-5 flex items-center justify-center mx-auto gap-4">
          <Image alt="" className="rotate-180" src={CirclesLogin} />

          <div className="p-3">
            <Image alt="Enne Hours" src={Logo} />
          </div>
          <Image alt="" src={CirclesLogin} />
        </div>
        <h1 className="text-white font-bold text-center text-2xl">{title}</h1>
        <span className="text-white/60 text-sm mb-9 block text-center">
          {subtitle.text}{" "}
          <Link className="text-white" href={subtitle.urlRedirect}>
            {subtitle.textRedirect}
          </Link>
        </span>

        <div className="flex flex-col gap-2">
          {type === "register" && (
            <div>
              <label className="flex relative w-full" htmlFor="">
                <User
                  className="absolute left-4 top-2"
                  color="#a7a7a7"
                  size={16}
                />
                <input
                  {...register("name")}
                  autoComplete="off"
                  className="outline-none transition-all border bg-[#0F0F0F] text-sm border-[#424242] rounded pl-10 w-full h-8 placeholder:text-[#a7a7a7] text-white focus:outline-none focus:border-[#a7a7a7] focus:ring-1 focus:ring-[#a7a7a7]"
                  placeholder="digite seu nome"
                  type="text"
                />
              </label>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="flex relative w-full" htmlFor="">
              <Mail
                className="absolute left-4 top-2"
                color="#a7a7a7"
                size={16}
              />
              <input
                {...register("email")}
                autoComplete="off"
                className="outline-none transition-all border bg-[#0F0F0F] text-sm border-[#424242] rounded pl-10 w-full h-8 placeholder:text-[#a7a7a7] text-white focus:outline-none focus:border-[#a7a7a7] focus:ring-1 focus:ring-[#a7a7a7]"
                placeholder="digite seu email"
                type="text"
              />
            </label>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="flex relative w-full" htmlFor="">
              <LockKeyhole
                className="absolute left-4 top-2"
                color="#a7a7a7"
                size={16}
              />
              <input
                {...register("password")}
                autoComplete="off"
                className="outline-none transition-all border bg-[#0F0F0F] text-sm border-[#424242] rounded pl-10 w-full h-8 placeholder:text-[#a7a7a7] text-white focus:outline-none focus:border-[#a7a7a7] focus:ring-1 focus:ring-[#a7a7a7]"
                placeholder="digite sua senha"
                type="password"
              />
            </label>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <button
          className={`${
            isSubmitting ? "bg-transparent cursor-not-allowed" : " bg-white"
          } mt-4 w-full text-neutral-950font-semibold border border-white rounded  h-8 text-xs cursor-pointer transition-all ease-linear hover:bg-transparent hover:text-white`}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Image alt="spin" className="animate-spin" src={Spin} />
            </span>
          ) : (
            labelSubmit
          )}
        </button>

        <div className="flex items-center gap-2 mt-4">
          <span className="h-[1px] w-full bg-white/60 block" />
          <span className="text-xs text-white/60">or</span>
          <span className="h-[1px] w-full bg-white/60 block" />
        </div>
      </form>
    </>
  );
}

export default FormAuthFields;
