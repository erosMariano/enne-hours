import React from "react";
import Image from "next/image";

import IconPlay from "@/images/icons/play.svg";
import ImageApp from "@/images/image-app.png";
import Button from "@/components/views/Hero/Button";

function App() {
  return (
    <main className="container mx-auto">
      <div className="flex items-center justify-between gap-4 pb-36">
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
            <Button
              route="/register"
              text="Criar conta Grátis"
              variant="primary"
            />
            <Button
              icon={IconPlay}
              text="Ver funcionalidades"
              variant="secondary"
            />
          </div>

          <p className="mt-16 font-bold text-white/60 relative">
            Confiado por profissionais autônomos, equipes de tecnologia e
            consultorias que valorizam o controle do tempo.
            <span className="w-1/2 bg-white/60 h-[1px] block absolute" />
          </p>
        </div>

        <div className="relative top-[125px]">
          <Image alt="Enne hours" src={ImageApp} />
        </div>
      </div>
    </main>
  );
}

export default App;
