import { FormAuthProps } from "@/types/types";
import Image from "next/image";
import React from "react";
import CirclesLogin from "@/images/icons/circle-login.svg";
import { LockKeyhole, Mail } from "lucide-react";
import Logo from "@/images/logo-mini.svg";
import Link from "next/link";

function FormAuthFields({ type, labelSubmit, subtitle, title }: FormAuthProps) {
  return (
    <form action="">
      <div className=" mb-5 flex items-center justify-center mx-auto gap-4">
        <Image src={CirclesLogin} alt="" className="rotate-180" />

        <div className="p-3">
          <Image src={Logo} alt="Enne Hours" />
        </div>
        <Image src={CirclesLogin} alt="" />
      </div>
      <h1 className="text-white font-bold text-center text-2xl">{title}</h1>
      <span className="text-white/60 text-sm mb-9 block text-center">
        {subtitle.text}{" "}
        <Link href={subtitle.urlRedirect} className="text-white">
          {subtitle.textRedirect}
        </Link>
      </span>
      <label className="flex relative w-full" htmlFor="">
        <Mail className="absolute left-4 top-2" color="#a7a7a7" size={16} />
        <input
          autoComplete="off"
          type="text"
          placeholder="digite seu email"
          className="outline-none transition-all border bg-[#0F0F0F] text-sm border-[#424242] rounded pl-10 w-full h-8 placeholder:text-[#a7a7a7] text-white focus:outline-none focus:border-[#a7a7a7] focus:ring-1 focus:ring-[#a7a7a7]"
        />
      </label>

      <label className="flex relative w-full mt-4" htmlFor="">
        <LockKeyhole
          className="absolute left-4 top-2"
          color="#a7a7a7"
          size={16}
        />
        <input
          autoComplete="off"
          type="password"
          placeholder="digite sua senha"
          className="outline-none transition-all border bg-[#0F0F0F] text-sm border-[#424242] rounded pl-10 w-full h-8 placeholder:text-[#a7a7a7] text-white focus:outline-none focus:border-[#a7a7a7] focus:ring-1 focus:ring-[#a7a7a7]"
        />
      </label>

      <button
        className="mt-4 w-full text-neutral-950 bg-white font-semibold border border-white rounded  h-8 text-xs cursor-pointer transition-all ease-linear hover:bg-transparent hover:text-white"
        type="submit"
      >
        {labelSubmit}
      </button>

      <div className="flex items-center gap-2 mt-4">
        <span className="h-[1px] w-full bg-white/60 block"></span>
        <span className="text-xs text-white/60">or</span>
        <span className="h-[1px] w-full bg-white/60 block"></span>
      </div>
    </form>
  );
}

export default FormAuthFields;
