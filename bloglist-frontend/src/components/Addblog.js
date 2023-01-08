import { useState} from 'react'

const Addblog = ({createBlog}) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl

    })

    
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    }
    catch{
   
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
  return(
    <div style={{width:100, marginBottom:20}}>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
       <label htmlFor="title">Title
      <input id="title"
        value={newTitle}
        onChange={handleTitleChange}
      /></label>
      <label htmlFor="author">Author
      <input id="author"
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      </label>
      <label htmlFor="url">Url
      <input id="url"
        value={newUrl}
        onChange={handleUrlChange}
      /></label>
      <button type="submit">create</button>
    </form>
    </div>
  )
}

  export default Addblog