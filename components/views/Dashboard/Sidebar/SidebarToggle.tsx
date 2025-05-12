"use client";

import { ChevronsLeft } from "lucide-react";
import Image from "next/image";

import Logo from "@/images/logo.svg";
import { useSidebarStore } from "@/store/sidebarStore";

export function SidebarToggle() {
  const { isOpen, toggle } = useSidebarStore();

  const buttonClass = isOpen
    ? "flex justify-between p-2 transition-all cursor-pointer"
    : "flex justify-center p-2 transition-all cursor-pointer hover:bg-white/10 rounded";

  const iconClass = isOpen ? "" : "rotate-180";

  return (
    <button className={buttonClass} onClick={toggle}>
      {isOpen && <Image alt="Enne Hours" src={Logo} width={80} />}
      <ChevronsLeft className={`transition-all ${iconClass}`} size={20} />
    </button>
  );
}
