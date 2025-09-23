"use client";

import { Button } from '@/components/ui/button';
import AddTaskModal from './AddTaskModal';
import type { Task } from '@/types/kanban';
import { Plus, Grip } from 'lucide-react';

interface KanbanHeaderProps {
  onAddTask: (task: Omit<Task, 'id'>) => void;
}

export default function KanbanHeader({ onAddTask }: KanbanHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Grip className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          KanbanFlow
        </h1>
      </div>
      <AddTaskModal onAddTask={onAddTask}>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Tarefa
        </Button>
      </AddTaskModal>
    </header>
  );
}
