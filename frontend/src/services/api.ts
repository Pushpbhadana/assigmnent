import type { Task, CreateTaskDto, UpdateTaskDto } from '@/types/task'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

class ApiError extends Error {
  status?: number
  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function fetchJson<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    throw new ApiError(
      `API Error: ${response.statusText}`,
      response.status
    )
  }

  return response.json()
}

export const taskApi = {
  getAll: async (): Promise<Task[]> => {
    return fetchJson<Task[]>('/tasks')
  },

  getById: async (id: string): Promise<Task> => {
    return fetchJson<Task>(`/tasks/${id}`)
  },

  create: async (data: CreateTaskDto): Promise<Task> => {
    return fetchJson<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  update: async (id: string, data: UpdateTaskDto): Promise<Task> => {
    return fetchJson<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  delete: async (id: string): Promise<void> => {
    return fetchJson<void>(`/tasks/${id}`, {
      method: 'DELETE',
    })
  },
}

export { ApiError }
