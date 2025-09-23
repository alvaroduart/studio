export type Priority = 'Alta' | 'Média' | 'Baixa';
export type ColumnId = 'todo' | 'inProgress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
}

export interface Column {
  id: ColumnId;
  title: string;
  tasks: Task[];
}

export type Columns = Record<ColumnId, Column>;
