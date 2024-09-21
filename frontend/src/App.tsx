import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Post  from './pages/Post'
import Posts from './pages/Posts'



const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/signup' element={<Signup />} />
    <Route path='/signin' element={<Signin />} />
    <Route path='/post/:id' element={<Post />} />
    <Route path='/post' element={<Posts /> } />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App