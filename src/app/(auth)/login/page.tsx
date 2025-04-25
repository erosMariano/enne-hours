import React from "react";
import Image from "next/image";
import Link from "next/link";

import { LockKeyhole, Mail } from "lucide-react";

import Logo from "@/images/logo-mini.svg";
import AppleIcon from "@/images/icons/apple.svg";
import TwitterIcon from "@/images/icons/twitter.svg";
import GoogleIcon from "@/images/icons/google.svg";
import CirclesLogin from "@/images/icons/circle-login.svg";
import Chip1 from "@/images/icons/chip.svg";

function Login() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="top-28 absolute w-full flex justify-between">
        <Image src={Chip1} alt="Chip 1" className="relative z-10" />
        <div className="flex items-center justify-between w-full">
          <div className="brilho w-1 h-1 rounded-full bg-white relative"></div>
        </div>
        <Image src={Chip1} alt="Chip 1" className="relative z-10 rotate-180" />
      </div>

      <div className="bottom-28 absolute w-full flex justify-between">
        <Image src={Chip1} alt="Chip 1" className="right-0 rotate-180 z-10" />

        <div className="flex items-center justify-between w-full">
          <div className="brilho w-1 h-1 rounded-full bg-white relative brilho2"></div>
        </div>
        <Image src={Chip1} alt="Chip 1" className="relative z-10" />
      </div>

      <div className="container flex items-center justify-center w-full h-screen mx-auto">
        <form action="" className="bg-[#222222] rounded-lg p-4 w-full max-w-96">
          <div className=" mb-5 flex items-center justify-center mx-auto gap-4">
            <Image src={CirclesLogin} alt="" className="rotate-180" />

            <div className="p-3">
              <Image src={Logo} alt="Enne Hours" />
            </div>
            <Image src={CirclesLogin} alt="" />
          </div>
          <h1 className="text-white font-bold text-center text-2xl">
            Bem vindo de volta
          </h1>
          <span className="text-white/60 text-sm mb-9 block text-center">
            Não tem uma conta ainda?{" "}
            <Link href={"/cadastro"} className="text-white">
              Cadastro
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
            Login
          </button>

          <div className="flex items-center gap-2 mt-4">
            <span className="h-[1px] w-full bg-white/60 block"></span>
            <span className="text-xs text-white/60">or</span>
            <span className="h-[1px] w-full bg-white/60 block"></span>
          </div>

          <div className="flex gap-4">
            <button className="cursor-pointer bg-[#252525] w-full shadow-md rounded flex items-center justify-center py-1 transition-all top-0 relative mt-4 hover:-top-1">
              <Image src={AppleIcon} alt="Apple" />
            </button>
            <button className="cursor-pointer bg-[#252525] w-full shadow-md rounded flex items-center justify-center py-1 transition-all top-0  relative mt-4 hover:-top-1">
              <Image src={TwitterIcon} alt="Twitter" />
            </button>
            <button className="cursor-pointer bg-[#252525] w-full shadow-md rounded flex items-center justify-center py-1 transition-all top-0 relative mt-4 hover:-top-1">
              <Image src={GoogleIcon} alt="Google" />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
