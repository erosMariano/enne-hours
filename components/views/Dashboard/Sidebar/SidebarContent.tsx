"use client";

import { FolderOpenDot, House, LogOut } from "lucide-react";
import Link from "next/link";

import { useSidebarStore } from "@/store/sidebarStore";

const itemsSideBar = [
  {
    id: 1,
    icon: <House size={16} />,
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    id: 2,
    icon: <FolderOpenDot size={16} />,
    label: "Adicionar Projeto",
    link: "/",
  },
];

export function SidebarContent() {
  const { isOpen } = useSidebarStore();

  return (
    <>
      <nav className="mt-6">
        <ul>
          {itemsSideBar.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-2 hover:bg-white/10 rounded transition-all"
            >
              <Link
                className={`flex items-center gap-2 w-full text-sm p-2 ${
                  !isOpen && "justify-center"
                }`}
                href={item.link}
              >
                {item.icon}
                {isOpen && (
                  <span className="block overflow-hidden whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-end flex-1">
        <button
          className={`cursor-pointer w-full p-2 ${
            isOpen && "bg-white/10"
          } p-2 text-sm flex items-center justify-center gap-2 hover:bg-white/10 rounded`}
        >
          {!isOpen ? (
            <LogOut size={14} />
          ) : (
            <>
              Sair <LogOut size={14} />
            </>
          )}
        </button>
      </div>
    </>
  );
}
