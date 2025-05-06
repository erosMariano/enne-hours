import React from "react";
import { Bell } from "lucide-react";
import Image from "next/image";

import Perfil from "@/images/perfil.webp";

function HeaderDashboard() {
  return (
    <div className="text-white flex items-center justify-between ">
      <span className="text-base">User Management</span>

      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer" title="Notificações">
          <span className="z-10 absolute text-xs bg-red-500 rounded-full flex items-center justify-center text-white  w-2 h-2 -right-0.5 -top-0.5" />
          <Bell size={16} />
        </div>

        <div className="flex items-center gap-2">
          <Image
            alt="Eros Mariano"
            className="rounded-full"
            height={32}
            src={Perfil}
            width={32}
          />
          <span>Eros Mariano</span>
        </div>
      </div>
    </div>
  );
}

export default HeaderDashboard;
