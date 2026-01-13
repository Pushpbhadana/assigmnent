import { TaskItem } from './TaskItem'
import type { Task } from '@/types/task'

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  deletingId?: string
}

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  deletingId,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">No tasks found</p>
        <p className="text-sm mt-2">Create your first task to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={deletingId === task.id}
        />
      ))}
    </div>
  )
}
