 
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './Routes/Routes/Routes'
import toast, { Toaster } from 'react-hot-toast';


function App() { 

  return (
    <div className="">
     <RouterProvider router={router}></RouterProvider>
     <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
