import { useState, useEffect } from 'react'
import Addblog from './components/Addblog'
import Blog from './components/Blog'
import Message from './components/Message'
import blogService from './services/blogs'
import Login from './services/login'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [kind, setKind] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  

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

  const addBlog = async (event) => {
    event.preventDefault()
    try {
    const blogObject={
      title: newTitle,
      author: newAuthor,
      url: newUrl

    }

    await blogService.create(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setMessage(`a new blog ${newTitle} by ${newAuthor} added`)
    setKind('successmessage')
    setTimeout(()=>{setMessage(null) ; setKind(null) ; window.location.reload()},5000)}
    catch{
      setMessage('something went wrong')
      setKind('errormessage')
      setTimeout(() => {
        setMessage(null) ; setKind(null)
      }, 5000)
    }

  }
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
   
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  if (user === null) {
    return (
      <>
   {/* <Login handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/> */}
   <div>
        <h2>Log in to application</h2>
        <Message message={message} kind={kind}/>
    <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>  
  </div>
   </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in </p> <button onClick={handleLogout}>Logout</button>
      <Message message={message} kind={kind}/>
      <Addblog addBlog={addBlog} newTitle={newTitle} handleTitleChange={handleTitleChange} newAuthor={newAuthor} handleAuthorChange={handleAuthorChange} newUrl={newUrl} handleUrlChange={handleUrlChange}/>
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
