"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Task, ColumnId, Priority } from '@/types/kanban';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  columnId: ColumnId;
}

export default function TaskCard({ task, columnId }: TaskCardProps) {

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('sourceColumnId', columnId);
    e.currentTarget.style.opacity = '0.5';
    e.currentTarget.classList.add('shadow-2xl', 'scale-105');
  };

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
    e.currentTarget.classList.remove('shadow-2xl', 'scale-105');
  };

  const PriorityBadge = ({ priority }: { priority: Priority }) => {
    const priorityStyles: Record<Priority, { variant: 'default' | 'secondary' | 'destructive' | 'outline' | null, className?: string, label: string }> = {
      'Alta': { variant: 'destructive', label: 'Alta' },
      'Média': { variant: 'secondary', label: 'Média' },
      'Baixa': { variant: 'default', label: 'Baixa', className: "bg-accent text-accent-foreground border-transparent hover:bg-accent/80" },
    };

    const { variant, className, label } = priorityStyles[priority];
    
    return <Badge variant={variant} className={cn('font-semibold', className)}>{label}</Badge>;
  };

  return (
    <Card
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="cursor-grab active:cursor-grabbing transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1"
      aria-roledescription={`Task card for ${task.title}`}
    >
      <CardHeader className="p-4">
        <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-base font-bold leading-tight pr-2">{task.title}</CardTitle>
            <div className="flex-shrink-0">
              <PriorityBadge priority={task.priority} />
            </div>
        </div>
        {task.description && (
          <CardDescription className="text-sm text-muted-foreground">{task.description}</CardDescription>
        )}
      </CardHeader>
    </Card>
  );
}
