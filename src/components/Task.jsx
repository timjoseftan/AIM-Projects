import { useState } from "react";
import { Link } from "react-router-dom";

function Task({userId, id, title, completed, completedCount}){
    const [isCompleted, setIsCompleted] = useState(completed);

    const toggleStatus = () => {
        setIsCompleted(!isCompleted);
        if(isCompleted){
            completedCount++;
        } else {
            completedCount--;
        }
        console.log(completedCount);
    };

    return (
    <div className="w-full border-b border-gray-200 bg-white text-sm font-sans flex items-stretch">
      <div className="p-4 flex items-center justify-center border-r border-gray-100">
      <input
          type="checkbox"
          id={`task-toggle-${id}`}
          checked={isCompleted} 
          onChange={toggleStatus}
          className="h-4 w-4 accent-gray-800 cursor-pointer rounded border-gray-300 focus:ring-gray-500"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-center">
        <label htmlFor="task-toggle" className="font-bold text-gray-800 cursor-pointer select-none">
            <Link to={`${id}`}>{title}</Link>
        </label>
        <span className="text-gray-500 text-xs mt-0.5">
          Assigned to: User - {userId}
        </span>
      </div>

      <div className="p-4 flex items-center justify-end w-36 select-none">
        <span className={`font-semibold text-xs ${isCompleted ? 'text-green-600' : 'text-amber-600'}`}>
          {isCompleted ? 'Completed' : 'Not completed'}
        </span>
      </div>
    </div>
    )
}

export default Task