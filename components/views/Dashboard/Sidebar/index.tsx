"use client";

import clsx from "clsx";

import { SidebarToggle } from "./SidebarToggle";
import { SidebarContent } from "./SidebarContent";

import { useSidebarStore } from "@/store/sidebarStore";

export default function Sidebar() {
  const { isOpen } = useSidebarStore();

  return (
    <div
      className={clsx(
        "text-white max-w-72 bg-[#1b1b1b] p-4 rounded h-full flex flex-col transition-all",
        isOpen && "flex-1",
      )}
    >
      <SidebarToggle />
      <SidebarContent />
    </div>
  );
}
