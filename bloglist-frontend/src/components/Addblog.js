const Addblog = ({addBlog, newTitle ,handleTitleChange,newAuthor,handleAuthorChange,newUrl, handleUrlChange}) => (
    <div >
    <h2>create new</h2>
    <form onSubmit={addBlog} style={{width:100, marginBottom:20}}>
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

  export default Addblog