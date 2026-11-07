import { Link } from 'react-router-dom'

function About() {
  return (
    <main class="max-w-5xl mx-auto px-4 py-8">
    <div class="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden flex flex-col divide-y divide-slate-200">
      
      <section aria-labelledby="about-heading">
        <div class="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h2 id="about-heading" class="text-base font-bold text-slate-900">About this tracker</h2>
        </div>
        <div class="p-6">
          <p class="text-sm text-slate-700 leading-relaxed">
            Tim's Task Tracker is a lightweight place to organize team work and keep task progress visible.
          </p>
        </div>
      </section>

      <section aria-labelledby="features-heading">
        <div class="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h2 id="features-heading" class="text-base font-bold text-slate-900">What you can do</h2>
        </div>
        <div class="p-6">
          <ul class="list-disc pl-5 space-y-1.5 text-sm text-slate-700">
            <li>View all assigned tasks</li>
            <li>Mark tasks as completed or not completed</li>
            <li>Review completion totals and task counts by user</li>
            <li>Open a task to see its assignment and status</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="design-heading">
        <div class="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h2 id="design-heading" class="text-base font-bold text-slate-900">Designed for clarity</h2>
        </div>
        <div class="p-6">
          <p class="text-sm text-slate-700 leading-relaxed">
            The interface keeps navigation simple and uses consistent status labels so users can understand progress at a glance.
          </p>
        </div>
      </section>

    </div>
  </main>
  )
}

export default About