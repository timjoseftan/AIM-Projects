import { useQuery } from '@tanstack/react-query'
import Task from './Task';

const PUBLIC_API_URL = 'https://jsonplaceholder.typicode.com/todos'

const FORCE = 'slow';

function normaliseApiProduct(task) {
  return {
    userId: task.userId,
    id: task.id,
    completed: task.completed,
  }
}

function StatList() {
  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    retry: false,
  })

  // 1. PLACE YOUR LOGIC HERE (Safely processes 'tasks' whenever it changes)
  const userStatsArray = Object.values(
    tasks.reduce((acc, todo) => {
      const userId = todo.userId;

      if (!acc[userId]) {
        acc[userId] = {
          userId: userId,
          totalCount: 0,
          completedCount: 0
        };
      }

      acc[userId].totalCount += 1;

      if (todo.completed) {
        acc[userId].completedCount += 1;
      }

      return acc;
    }, {})
  )
  .map(user => {
    const percentage = (user.completedCount / user.totalCount) * 100;
    return {
      ...user,
      completionPercentage: Math.round(percentage) + "%"
    };
  })
  .sort((a, b) => b.completedCount - a.completedCount);


  var completedTasks = tasks.filter(task => task.completed).length;

 
  if (isLoading) return <p>Loading stats...</p>;
  if (isError) return <p>Error loading tasks stats.</p>;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-slate-50 min-h-screen">
    
    <header className="mb-8 border-b border-slate-200 pb-5">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Dashboard Stats (this bonus page is made with AI)
      </h1>
      <p className="mt-2 text-sm text-slate-600 sm:text-base">
        <strong className="font-semibold text-indigo-600">{completedTasks} / {tasks.length} </strong> tasks completed among users.
      </p>
    </header>


    <section aria-label="User Performance Statistics">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {userStatsArray.map((user) => (
          <article 
            key={user.userId} 
            className="overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                User Profile
              </h2>
              <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                ID: {user.userId}
              </span>
            </div>


            <dl className="mt-4 grid grid-cols-2 gap-4">
              <div className="border-r border-slate-100 pr-2">
                <dt className="text-xs text-slate-500">Total Tasks</dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
                  {user.totalCount}
                </dd>
              </div>
              <div className="pl-2">
                <dt className="text-xs text-slate-500">Completed</dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight text-indigo-600">
                  {user.completedCount}
                </dd>
              </div>
            </dl>


            <div className="mt-5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-slate-500">Progress</span>
                <span className="font-bold text-slate-900">{user.completionPercentage}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: user.completionPercentage }}
                  role="progressbar"
                  aria-valuenow={parseInt(user.completionPercentage)}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  </main>
  )
}

async function fetchTasks() {
  if (FORCE === 'slow') await new Promise((resolve) => setTimeout(resolve, 3000))
  if (FORCE === 'error') throw new Error('Forced error')
  const response = await fetch(PUBLIC_API_URL)

  if (!response.ok) throw new Error(`API responded ${response.status}`)
  const data = await response.json()

  return FORCE === 'empty' ? [] : data.map(normaliseApiProduct)
}


export default StatList