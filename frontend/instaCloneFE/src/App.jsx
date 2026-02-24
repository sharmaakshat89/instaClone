import { RouterProvider } from "react-router"
import {router} from './appRoutes'
import { AuthProvider } from "./features/auth/auth.context"
import { PostContextProvider } from "./features/posts/post.context"

function App(){


  return (
    <AuthProvider>
      <PostContextProvider>
          <RouterProvider router={router} />
      </PostContextProvider>  
    </AuthProvider>
    
  )
  
}





export default App
