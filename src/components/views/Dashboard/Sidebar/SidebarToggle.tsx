"use client";

import { ChevronsLeft } from "lucide-react";
import Image from "next/image";
import Logo from "@/images/logo.svg";
import { useSidebarStore } from "@/store/sidebarStore";

export function SidebarToggle() {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <button
      onClick={toggle}
      className={`flex justify-between p-2 transition-all cursor-pointer ${
        !isOpen && "justify-center hover:bg-white/10 rounded"
      }`}
    >
      {isOpen && <Image src={Logo} width={80} alt="Enne Hours" />}
      <ChevronsLeft
        size={20}
        className={`${!isOpen && "rotate-180"} transition-all`}
      />
    </button>
  );
}
