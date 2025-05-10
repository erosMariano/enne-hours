function ActionBarSkeleton() {
  return (
    <div className="flex animate-pulse">
      {/* Esquerda: input + botão de filtro */}
      <div className="flex-1 flex items-center gap-4">
        {/* Input de busca */}
        <div className="h-10 w-64 bg-gray-700 rounded-md" />

        {/* Botão dropdown simulado */}
        <div className="h-10 w-32 bg-gray-700 rounded-md" />
      </div>

      {/* Direita: botões */}
      <div className="flex items-center gap-4 ml-4">
        {/* Botão Gerenciar Tarefas */}
        <div className="h-10 w-40 bg-gray-700 rounded-md" />

        {/* Botão Nova Tarefa */}
        <div className="h-10 w-32 bg-gray-500 rounded-md" />
      </div>
    </div>
  );
}

export default ActionBarSkeleton;
