import React from "react";
import Image from "next/image";

import Header from "@/components/views/Hero/Header";

import IconPlay from "@/images/icons/play.svg";
import ImageApp from "@/images/image-app.png";

function App() {
  return (
    <main className="container mx-auto">
      <Header />

      <div className="flex items-center justify-between gap-4">
        <div className="max-w-[482px] mt-32">
          <h1 className="font-semibold text-4xl text-white/60">
            Domine seu tempo.
          </h1>
          <h2 className="text-3xl text-white mb-4 font-semibold">
            Controle suas horas de trabalho com precisão e facilidade.
          </h2>
          <p className="text-white mb-10 text-base">
            Registre, organize e analise seu tempo em projetos e tarefas tudo em
            um só lugar.
          </p>

          <p className="text-white/60 text-base">
            Esqueça as planilhas e anotações manuais. Com o nosso app, você
            acompanha sua produtividade, gera relatórios e melhora sua rotina de
            forma prática.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <button className="text-neutral-950 bg-white font-semibold border border-white rounded py-3 px-5 text-xs cursor-pointer transition-all ease-linear hover:bg-transparent  hover:text-white">
              Criar conta Grátis
            </button>

            <button className="flex gap-2 items-center justify-center text-white bg-transparent font-semibold border border-transparent rounded py-3 px-5 text-xs cursor-pointer transition-all ease-linear hover:border-white">
              <Image src={IconPlay} alt="Ver funcionalidade" /> Ver
              funcionalidades
            </button>
          </div>

          <p className="mt-16 font-bold text-white/60 relative">
            Confiado por profissionais autônomos, equipes de tecnologia e
            consultorias que valorizam o controle do tempo.
            <span className="w-1/2 bg-white/60 h-[1px] block absolute"></span>
          </p>
        </div>

        <div className="relative top-[125px]">
          <Image src={ImageApp} alt="Enne hours" />
        </div>
      </div>
    </main>
  );
}

export default App;
