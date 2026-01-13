import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Pencil, Trash2 } from 'lucide-react'
import type { Task } from '@/types/task'
import { cn } from '@/lib/utils'

interface TaskItemProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  isDeleting?: boolean
}

const statusColors = {
  todo: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'in-progress':
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  done: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
}

const statusLabels = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
}

export function TaskItem({
  task,
  onEdit,
  onDelete,
  isDeleting = false,
}: TaskItemProps) {
  return (
    <div className="border rounded-lg p-4 bg-card shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg truncate">{task.title}</h3>
            <span
              className={cn(
                'px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap',
                statusColors[task.status]
              )}
            >
              {statusLabels[task.status]}
            </span>
          </div>
          {task.description && (
            <>
              <Separator className="my-2" />
              <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
                {task.description}
              </p>
            </>
          )}
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            size="icon"
            onClick={() => onEdit(task)}
            disabled={isDeleting}
            aria-label="Edit task"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete(task.id)}
            disabled={isDeleting}
            aria-label="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
