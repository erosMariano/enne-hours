function SidebarSkeleton() {
  return (
    <div className="text-white max-w-72 bg-[#1b1b1b] p-4 rounded h-full flex flex-col transition-all animate-pulse">
      {/* Botão de recolher */}
      <div className="flex justify-center p-2">
        <div className="h-5 w-5 bg-gray-700 rounded" />
      </div>

      {/* Navegação */}
      <nav className="mt-6">
        <ul className="space-y-4">
          <li className="flex justify-center">
            <div className="h-6 w-6 bg-gray-700 rounded" />
          </li>
          <li className="flex justify-center">
            <div className="h-6 w-6 bg-gray-700 rounded" />
          </li>
        </ul>
      </nav>

      {/* Botão de logout */}
      <div className="flex items-end flex-1">
        <div className="h-6 w-full bg-gray-700 rounded" />
      </div>
    </div>
  );
}

export default SidebarSkeleton;
