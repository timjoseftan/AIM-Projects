import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Task from './Task';

const PUBLIC_API_URL = 'https://jsonplaceholder.typicode.com/todos'

// TEMPORARY test switch for the lab: set to 'slow', 'empty' or 'error' to force
// that state, then set it back to null when you are done.
const FORCE = 'slow';

function normaliseApiProduct(task) {
  return {
    userId: task.userId,
    title: task.title,
    id: task.id,
    completed: task.completed,
  }
}

function TasksList() {
  
  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    retry: false,
  })

  var completedTasks = tasks.filter(task => task.completed).length;

  async function fetchTasks() {
    if (FORCE === 'slow') await new Promise((resolve) => setTimeout(resolve, 3000))
    if (FORCE === 'error') throw new Error('Forced error')
    const response = await fetch(PUBLIC_API_URL)
   
    if (!response.ok) throw new Error(`API responded ${response.status}`)
    const data = await response.json()

    return FORCE === 'empty' ? [] : data.map(normaliseApiProduct)
    }


  if (isLoading) return <p>Loading products...</p>
  if (isError) {
    return <p role="alert">Something went wrong loading products. Please try again.</p>
  }
  if (tasks.length === 0) return <p>No tasks yet.</p>
 // <p className="task-list_-count">Tasks Completed:  {completedTasks} out of {tasks.length} </p>
  return (
    <section className="task-list">
      <div className="task-list-header">
       
      </div>
      <div className="task-list-grid">
        {tasks.map((task) => (
          <Task
            key={task.id}
            {...task}
            completedCount={completedTasks}
          />
        ))}
      </div>
    </section>
  )
}

export default TasksList
