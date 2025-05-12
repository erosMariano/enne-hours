"use client";

import { SidebarToggle } from "./SidebarToggle";
import { SidebarContent } from "./SidebarContent";

import { useSidebarStore } from "@/store/sidebarStore";
import { useMemo } from "react";

export default function Sidebar() {
  const { isOpen } = useSidebarStore();

  const sidebarClass = useMemo(() => {
    return `text-white max-w-72 bg-[#1b1b1b] p-4 rounded h-full flex flex-col transition-all ${isOpen ? "flex-1" : ""}`;
  }, [isOpen]);

  return (
    <div className={sidebarClass}>
      <SidebarToggle />
      <SidebarContent />
    </div>
  );
}
