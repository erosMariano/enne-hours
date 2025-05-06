"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { LockKeyhole, Mail } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { FormAuthProps } from "@/types/types";
import Logo from "@/images/logo-mini.svg";
import Spin from "@/images/icons/spin.svg";
import CirclesLogin from "@/images/icons/circle-login.svg";

const formSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter mais de 6 dígitos"),
});

type FormData = z.infer<typeof formSchema>;

function FormAuthFields({ type, labelSubmit, subtitle, title }: FormAuthProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmitData = async (data: FormData) => {
    if (type == "login") {
      console.log("Tratar para login");
      router.push("/dashboard");
    } else if (type == "register") {
      console.log("Tratar para registro");
      router.push("/dashboard");
    } else {
      console.log("Tipo de envio inválido");
    }
  };

  return (
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
      <label className="flex relative w-full" htmlFor="">
        <Mail className="absolute left-4 top-2" color="#a7a7a7" size={16} />
        <input
          {...register("email")}
          autoComplete="off"
          className="outline-none transition-all border bg-[#0F0F0F] text-sm border-[#424242] rounded pl-10 w-full h-8 placeholder:text-[#a7a7a7] text-white focus:outline-none focus:border-[#a7a7a7] focus:ring-1 focus:ring-[#a7a7a7]"
          placeholder="digite seu email"
          type="text"
        />
      </label>
      {errors.email && (
        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
      )}

      <label className="flex relative w-full mt-4" htmlFor="">
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
        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
      )}

      <button
        className={`${
          isSubmitting ? "bg-transparent cursor-not-allowed" : " bg-white "
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
  );
}

export default FormAuthFields;
