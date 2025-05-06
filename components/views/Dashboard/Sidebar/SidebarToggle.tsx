"use client";

import { ChevronsLeft } from "lucide-react";
import Image from "next/image";

import Logo from "@/images/logo.svg";
import { useSidebarStore } from "@/store/sidebarStore";

export function SidebarToggle() {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <button
      className={`flex justify-between p-2 transition-all cursor-pointer ${
        !isOpen && "justify-center hover:bg-white/10 rounded"
      }`}
      onClick={toggle}
    >
      {isOpen && <Image alt="Enne Hours" src={Logo} width={80} />}
      <ChevronsLeft
        className={`${!isOpen && "rotate-180"} transition-all`}
        size={20}
      />
    </button>
  );
}
