import { LogOut } from "lucide-react";
import React from "react";

interface ButtonLogOutProps {
  sidebarActive: boolean;
}
function ButtonLogOut({ sidebarActive }: ButtonLogOutProps) {
  return (
    <button
      className={`cursor-pointer w-full p-2 ${
        !sidebarActive && "bg-white/10 "
      } p-2 text-sm flex items-center justify-center gap-2 hover:bg-white/10 rounded`}
    >
      {sidebarActive ? (
        <LogOut size={14} />
      ) : (
        <>
          Sair <LogOut size={14} />
        </>
      )}
    </button>
  );
}

export default ButtonLogOut;
