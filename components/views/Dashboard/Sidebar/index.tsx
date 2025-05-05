// src/components/views/Dashboard/Sidebar/index.tsx
"use client";

import { SidebarToggle } from "./SidebarToggle";
import { SidebarContent } from "./SidebarContent";
import { useSidebarStore } from "@/store/sidebarStore";

export default function Sidebar() {
  const { isOpen } = useSidebarStore();

  return (
    <div
      className={`text-white max-w-72 bg-[#1b1b1b] p-4 rounded h-full flex flex-col transition-all ${
        isOpen ? "flex-1" : ""
      }`}
    >
      <SidebarToggle />
      <SidebarContent />
    </div>
  );
}
