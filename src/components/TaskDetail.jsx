import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

async function getTask(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    if (!response.ok) throw new Error('API responded with ${response.status}');

    const data = await response.json().catch(() => null);

    if (!data) return null;

    return {
        id: data.id,
        title: data.title,
        userId: data.userId,
        completed: data.completed
    }
}

function TaskDetail(){
    const {id} = useParams();

    const [isCompleted, setIsCompleted] = useState(null);

    const toggleStatus = () => {
        setIsCompleted(!isCompleted);
    };

    const {data: task, isLoading, isError, isSuccess} = useQuery({
        queryKey: ['task', id],
        queryFn: () => getTask(id),
        retry: false
    });

    return (
        <main>
            <Link to="/tasks"> Back to Tasks </Link>
            {isLoading && <p>Loading Tasks...</p>}
      
            {isError && (
                <p role="alert">Something went wrong loading the Task. Please try again.</p>
            )}
            
            {isSuccess && !task && <p>Task not available.</p>}
            
            {task && (
            <article class="w-full max-w-2xl bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden font-sans text-gray-900">
        
                <header class="border-b border-gray-100 p-5">
                    <h1 class="text-sm font-semibold text-gray-800 tracking-wide uppercase">Task details</h1>
                    <p class="text-xs text-gray-400 font-mono mt-1">{task.title}</p>
                </header>

                <section class="border-b border-gray-100 p-5">
                    <h2 class="text-lg font-bold text-gray-900">Update API documentation</h2>
                </section>


                <section class="border-b border-gray-100 p-5">
                    <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned user</h3>
                    <p class="text-base font-bold text-gray-900 mt-1">User - {task.userId} </p>
                </section>


                <section class="border-b border-gray-100 p-5">
                    <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider">Completion status</h3>
                    <span className={`font-semibold text-xs ${isCompleted ? 'text-green-600' : 'text-amber-600'}`}>
                        {isCompleted ? 'Completed' : 'Not completed'}
                    </span>
                </section>

                <footer class="p-5 flex items-center">
                <input
                    type="checkbox"
                    id={`task-toggle-${id}`}
                    checked={isCompleted} 
                    onChange={toggleStatus}
                    className="h-4 w-4 accent-gray-800 cursor-pointer rounded border-gray-300 focus:ring-gray-500"
                    /> &nbsp; &nbsp; Mark as Completed
                </footer>

            </article>)}
        </main>

      

    )

}

export default TaskDetail