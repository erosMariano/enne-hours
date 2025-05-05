import { FolderOpenDot, House } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ItemsSideBarProps {
  sidebarActive: boolean;
}
function ItemsSideBar({ sidebarActive }: ItemsSideBarProps) {
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

  return (
    <>
      {itemsSideBar.map((item) => (
        <li
          key={item.id}
          className="flex items-center gap-2  hover:bg-white/10 rounded transition-all"
        >
          <Link
            href={item.link}
            className={`flex items-center gap-2 w-full text-sm  p-2 ${
              sidebarActive && "justify-center"
            }`}
          >
            {item.icon}

            {!sidebarActive && (
              <span className="block overflow-hidden whitespace-nowrap">
                {item.label}
              </span>
            )}
          </Link>
        </li>
      ))}
    </>
  );
}

export default ItemsSideBar;
