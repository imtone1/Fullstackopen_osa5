import { useState, useEffect } from 'react'
import Addblog from './components/Addblog'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './services/login'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
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
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    window.location.reload();
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject={
      title: newTitle,
      author: newAuthor,
      url: newUrl

    }

    await blogService.create(blogObject)
    window.location.reload()

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
   <div>{errorMessage}</div>
   </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in </p> <button onClick={handleLogout}>Logout</button>
      <Addblog addBlog={addBlog} newTitle={newTitle} handleTitleChange={handleTitleChange} newAuthor={newAuthor} handleAuthorChange={handleAuthorChange} newUrl={newUrl} handleUrlChange={handleUrlChange}/>
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
