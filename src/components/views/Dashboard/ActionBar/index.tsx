import { Play, Plus, Settings } from "lucide-react";
import React from "react";

function ActionBar() {
  return (
    <>
      <div className="flex-1 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search"
          className="outline-none h-10 text-sm focus:border-white bg-white/5 text-white placeholder:text-white/40 rounded-md border border-transparent transition-all p-2 w-full max-w-64 cursor-pointer hover:border-white"
        />

        <button className="flex outline-none h-10 text-sm focus:border-white bg-white/5 text-white placeholder:text-white/40 rounded-md border border-transparent transition-all p-2 w-full max-w-32 justify-between items-center cursor-pointer hover:border-white">
          All Status <Play className="rotate-90" size={14} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex outline-none h-10 text-sm focus:border-white bg-white/5 text-white  hover:border-white rounded-md border border-transparent transition-all px-2 gap-2 justify-between items-center cursor-pointer">
          <Settings /> Gerenciar Tarefas
        </button>
        <button className="h-10 flex items-center justify-center gap-2 text-sm text-black bg-white rounded-md px-4 transition-all border border-transparent  hover:bg-white/5 hover:text-white hover:border-white cursor-pointer">
          <Plus /> Nova Tarefa
        </button>
      </div>
    </>
  );
}

export default ActionBar;
