import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'
import Home from './components/Home'
import { Toaster } from 'react-hot-toast'

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <>
        <Navbar />
        <Home />
      </>
  },
  {
    path: "/pastes",
    element:
      <div>
        <Navbar />
        <Paste />
      </div>
  }, 
  {
    path:"/pastes/:id",
    element:
    <div>
      <Navbar/>
      <ViewPaste/>
    </div>
  }
])
function App() {

  return (
    <>
      <RouterProvider router={router} />
      <Toaster/>
      </>
  )
}

export default App
