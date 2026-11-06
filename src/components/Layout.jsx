import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header className="bg-gray-100 px-6 py-4 md:py-6 lg:py-8 border-b border-gray-200">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 tracking-tight">
            Tasks Tracker
          </h1>
      </header>
        <div className="flex h-screen">
          <div className="flex w-64 flex-col bg-gray-100 p-4">
              <nav className="flex flex-col gap-2">
              <NavLink to="/tasks" className="nav-tab rounded px-4 py-2 hover:bg-gray-200">Tasks</NavLink>
              <NavLink to="/stats" className="nav-tab rounded px-4 py-2 hover:bg-gray-200">Stats</NavLink>
              <NavLink to="/about" className="nav-tab rounded px-4 py-2 hover:bg-gray-200">About</NavLink>
              </nav>
          </div>
          <main className="flex-1 p-8 overflow-y-auto">
              <Outlet />
          </main>
        </div>
    </div>
  );
}