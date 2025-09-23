'use client';
import { useState, useEffect } from 'react';
import type { Columns, Task, ColumnId } from '@/types/kanban';
import KanbanColumn from '@/components/kanban/Column';
import KanbanHeader from '@/components/kanban/Header';

const initialTasks: Task[] = [
  { id: '1', title: 'Configurar ambiente', description: 'Instalar Node.js, Next.js e configurar o Tailwind CSS.', priority: 'Alta' },
  { id: '2', title: 'Criar componentes da UI', description: 'Desenvolver componentes reutilizáveis como Cartão de Tarefa e Coluna.', priority: 'Média' },
  { id: '3', title: 'Implementar o estado inicial', description: 'Definir e popular o quadro com tarefas de exemplo.', priority: 'Baixa' },
  { id: '4', title: 'Adicionar funcionalidade Drag & Drop', description: 'Permitir que os usuários movam tarefas entre as colunas.', priority: 'Alta' },
  { id: '5', title: 'Desenvolver modal de nova tarefa', description: 'Criar o formulário para adicionar novas tarefas ao quadro.', priority: 'Média' },
];

const initialColumnsData: Columns = {
  todo: {
    id: 'todo',
    title: 'A Fazer',
    tasks: [initialTasks[0], initialTasks[3]],
  },
  inProgress: {
    id: 'inProgress',
    title: 'Em Andamento',
    tasks: [initialTasks[1], initialTasks[4]],
  },
  done: {
    id: 'done',
    title: 'Concluído',
    tasks: [initialTasks[2]],
  },
};

export default function Home() {
  const [columns, setColumns] = useState<Columns | null>(null);

  useEffect(() => {
    // This ensures the initial state is only set on the client, avoiding hydration mismatches.
    setColumns(initialColumnsData);
  }, []);

  const handleAddTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`
    };
    setColumns(prev => {
      if (!prev) return null;
      return {
        ...prev,
        todo: {
          ...prev.todo,
          tasks: [newTask, ...prev.todo.tasks]
        }
      }
    });
  };

  const handleMoveTask = (taskId: string, sourceColumnId: ColumnId, destColumnId: ColumnId) => {
    if (sourceColumnId === destColumnId) return;

    setColumns(prev => {
      if (!prev) return null;

      let taskToMove: Task | undefined;
      const sourceTasks = prev[sourceColumnId].tasks.filter(task => {
        if (task.id === taskId) {
          taskToMove = task;
          return false;
        }
        return true;
      });

      if (!taskToMove) return prev;

      const destTasks = [taskToMove, ...prev[destColumnId].tasks];
      
      return {
        ...prev,
        [sourceColumnId]: {
          ...prev[sourceColumnId],
          tasks: sourceTasks,
        },
        [destColumnId]: {
          ...prev[destColumnId],
          tasks: destTasks,
        },
      };
    });
  };

  if (!columns) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p>Carregando quadro...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <KanbanHeader onAddTask={handleAddTask} />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {Object.values(columns).map(column => (
            <KanbanColumn key={column.id} column={column} moveTask={handleMoveTask} />
          ))}
        </div>
      </main>
    </div>
  );
}
