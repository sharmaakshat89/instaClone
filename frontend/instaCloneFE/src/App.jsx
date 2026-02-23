import { RouterProvider } from "react-router"
import {router} from './appRoutes'
import { authProvider } from "./features/auth/auth.context"

function App(){


  return (
    <authProvider>
        <RouterProvider router={router} />
    </authProvider>
    
  )
  
}





export default App
