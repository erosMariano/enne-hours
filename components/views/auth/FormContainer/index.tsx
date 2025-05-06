import Image from "next/image";
import React from "react";

import FormAuthFields from "../FormAuthFields";

import AppleIcon from "@/images/icons/apple.svg";
import TwitterIcon from "@/images/icons/twitter.svg";
import GoogleIcon from "@/images/icons/google.svg";
import Chip1 from "@/images/icons/chip.svg";
import { FormAuthProps } from "@/types/types";

function FormContainerAuth({
  title,
  subtitle,
  labelSubmit,
  type,
}: FormAuthProps) {
  return (
    <main className="relative overflow-x-hidden">
      <div className="top-28 absolute w-full flex justify-between">
        <Image alt="Chip 1" className="relative z-10" src={Chip1} />
        <div className="flex items-center justify-between w-full">
          <div className="brilho w-1 h-1 rounded-full bg-white relative" />
        </div>
        <Image alt="Chip 1" className="relative z-10 rotate-180" src={Chip1} />
      </div>

      <div className="bottom-28 absolute w-full flex justify-between">
        <Image alt="Chip 1" className="right-0 rotate-180 z-10" src={Chip1} />

        <div className="flex items-center justify-between w-full">
          <div className="brilho w-1 h-1 rounded-full bg-white relative brilho2" />
        </div>
        <Image alt="Chip 1" className="relative z-10" src={Chip1} />
      </div>

      <div className="container flex items-center justify-center w-full h-screen mx-auto">
        <div className="bg-[#222222] rounded-lg p-4 w-full max-w-96">
          <FormAuthFields
            labelSubmit={labelSubmit}
            subtitle={subtitle}
            title={title}
            type={type}
          />
          <div className="flex gap-4">
            <button className="cursor-pointer bg-[#252525] w-full shadow-md rounded flex items-center justify-center py-1 transition-all top-0 relative mt-4 hover:-top-1">
              <Image alt="Apple" src={AppleIcon} />
            </button>
            <button className="cursor-pointer bg-[#252525] w-full shadow-md rounded flex items-center justify-center py-1 transition-all top-0  relative mt-4 hover:-top-1">
              <Image alt="Twitter" src={TwitterIcon} />
            </button>
            <button className="cursor-pointer bg-[#252525] w-full shadow-md rounded flex items-center justify-center py-1 transition-all top-0 relative mt-4 hover:-top-1">
              <Image alt="Google" src={GoogleIcon} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default FormContainerAuth;
