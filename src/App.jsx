import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

import About from './components/About'
import Layout from './components/Layout'
import TasksList from './components/TaskList'
import TaskDetail from './components/TaskDetail'
import StatList from './components/StatList'

function App() {
  return (
   <Routes>
      <Route element={<Layout />}>
          <Route path='/' element ={ <Navigate to="/tasks" replace/>}> </Route>
          <Route path='/tasks' element ={ <TasksList/>}> </Route>
          <Route path="/tasks/:id" element ={<TaskDetail/>}></Route>
          <Route path='/stats' element ={ <StatList/>}> </Route>
          <Route path='/about' element ={ <About/>}> </Route>
         
      </Route>
   </Routes>
 
  )
}

export default App
