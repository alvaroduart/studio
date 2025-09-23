"use client";

import { useState } from 'react';
import TaskCard from './TaskCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Column, ColumnId } from '@/types/kanban';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  column: Column;
  moveTask: (taskId: string, sourceColumnId: ColumnId, destColumnId: ColumnId) => void;
};

export default function KanbanColumn({ column, moveTask }: KanbanColumnProps) {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);

    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId') as ColumnId;
    
    if (taskId && sourceColumnId) {
        moveTask(taskId, sourceColumnId, column.id);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'h-full flex flex-col rounded-lg transition-colors duration-300',
        isOver ? 'bg-primary/20' : ''
      )}
    >
      <Card className="flex-grow flex flex-col bg-white/50 dark:bg-black/50 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center text-foreground/80">{column.title} ({column.tasks.length})</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <ScrollArea className="h-full pr-4 -mr-4">
              <div className="flex flex-col gap-4">
                {column.tasks.length > 0 ? (
                    column.tasks.map(task => (
                        <TaskCard key={task.id} task={task} columnId={column.id} />
                    ))
                ) : (
                    <div className="flex items-center justify-center h-24 border-2 border-dashed rounded-lg">
                        <p className="text-sm text-muted-foreground">Arraste uma tarefa aqui</p>
                    </div>
                )}
              </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
