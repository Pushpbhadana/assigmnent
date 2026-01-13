import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { TaskForm } from '@/components/TaskForm'
import { TaskList } from '@/components/TaskList'
import { taskApi, ApiError } from '@/services/api'
import type { Task, TaskStatus } from '@/types/task'
import { Plus, AlertCircle, Loader2 } from 'lucide-react'
import './App.css'

type TaskFormValues = {
  title: string
  description: string
  status: TaskStatus
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined)
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await taskApi.getAll()
      setTasks(data)
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Failed to load tasks. Please try again.'
      setError(message)
      console.error('Error loading tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (data: TaskFormValues) => {
    try {
      setSubmitting(true)
      setError(null)
      const newTask = await taskApi.create(data)
      setTasks([...tasks, newTask])
      setShowForm(false)
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Failed to create task. Please try again.'
      setError(message)
      console.error('Error creating task:', err)
      throw err
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateTask = async (data: TaskFormValues) => {
    if (!editingTask) return

    try {
      setSubmitting(true)
      setError(null)
      const updatedTask = await taskApi.update(editingTask.id, data)
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
      setEditingTask(undefined)
      setShowForm(false)
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Failed to update task. Please try again.'
      setError(message)
      console.error('Error updating task:', err)
      throw err
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteTask = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      setDeletingId(id)
      setError(null)
      await taskApi.delete(id)
      setTasks(tasks.filter((t) => t.id !== id))
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Failed to delete task. Please try again.'
      setError(message)
      console.error('Error deleting task:', err)
    } finally {
      setDeletingId(null)
    }
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingTask(undefined)
  }

  const handleNewTask = () => {
    setEditingTask(undefined)
    setShowForm(true)
  }

  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Task Manager</h1>
          <p className="text-muted-foreground">
            Manage your tasks efficiently
          </p>
        </div>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive flex items-center gap-2">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Tasks</h2>
          {!showForm && (
            <Button onClick={handleNewTask}>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          )}
        </div>

        {showForm && (
          <div className="mb-6 p-6 border rounded-lg bg-card">
            <h3 className="text-xl font-semibold mb-4">
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </h3>
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={handleCancelForm}
              isSubmitting={submitting}
            />
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loading tasks...</span>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            deletingId={deletingId || undefined}
          />
        )}
      </div>
    </div>
  )
}

export default App
