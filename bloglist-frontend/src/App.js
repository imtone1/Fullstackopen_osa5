import { useState, useEffect } from 'react'
import Addblog from './components/Addblog'
import Blog from './components/Blog'
import Message from './components/Message'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [kind, setKind] = useState(null)
  
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //tallennetaan token localstorageen
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)

      //tallennetaan token localstorageen
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      //

      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setKind('errormessage')
      setTimeout(() => {
        setMessage(null) ; setKind(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    window.location.reload()
  }

  const addBlog = async (blogObject) => {
     try {
  


    await blogService.create(blogObject)
    setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setKind('successmessage')
    setTimeout(()=>{setMessage(null) ; setKind(null) ; window.location.reload()},5000)
}
    catch{
      setMessage('something went wrong')
      setKind('errormessage')
      setTimeout(() => {
        setMessage(null) ; setKind(null)
      }, 5000)
    }

  }

  const handleUserChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  if (user === null) {
    return (
      <>
      <Togglable buttonLabel='login'>
   <Message message={message} kind={kind}/>
   <Login handleLogin={handleLogin} username={username} password={password} handleUserChange={handleUserChange} handlePasswordChange={handlePasswordChange} />
  </Togglable>
   </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in </p> <button onClick={handleLogout}>Logout</button>
      <Togglable buttonLabel='new blog'>
      <Message message={message} kind={kind}/>
      <Addblog createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      
    </div>
  )
}

export default App
