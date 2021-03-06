import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:<input id='title' type="text" value={title} name="Title" onChange={handleTitleChange} />
          <br/>
          author:<input id='author' type="text" value={author} name="Author" onChange={handleAuthorChange} />
          <br/>
          url:<input id='url' type="text" value={url} name="Url" onChange={handleUrlChange}/>
        </div>
        <button id='create-blog-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm