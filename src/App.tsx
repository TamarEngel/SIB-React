import { RouterProvider } from 'react-router-dom'
import './App.css'
import { myRouter } from './components/router-components/Router'

function App() {

  return (
    
    <>
    
      <RouterProvider router={myRouter} />
    </>
  )
}

export default App

