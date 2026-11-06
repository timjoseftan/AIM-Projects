import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'


import Stats from './components/Stats'
import About from './components/About'
import Layout from './components/Layout'
import TasksList from './components/TaskList'
import TaskDetail from './components/TaskDetail'

function App() {
  return (
   <Routes>
      <Route element={<Layout />}>
          <Route path='/' element ={ <Navigate to="/tasks" replace/>}> </Route>
          <Route path='/tasks' element ={ <TasksList/>}> </Route>
          <Route path="/tasks/:id" element ={<TaskDetail/>}></Route>
          <Route path='/stats' element ={ <Stats/>}> </Route>
          <Route path='/about' element ={ <About/>}> </Route>
         
      </Route>
   </Routes>
 
  )
}

export default App
