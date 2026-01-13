export type TaskStatus = 'todo' | 'in-progress' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
}

export interface CreateTaskDto {
  title: string
  description: string
  status: TaskStatus
}

export interface UpdateTaskDto {
  title?: string
  description?: string
  status?: TaskStatus
}
