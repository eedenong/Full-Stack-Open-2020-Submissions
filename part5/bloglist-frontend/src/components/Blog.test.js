import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('rendering a blog shows only title and author by default', () => {
  const blog = {
    title: 'My First Blog',
    author: 'Mr Bob',
    user: {
      username: 'itsmario',
      name: 'Mario!',
    },
    url: 'www.blog.com',
    likes: 1
  }

  const component = render(
    <Blog blog={blog} />
  )

  const blogDiv = component.container.querySelector('.blog')
  //console.log(prettyDOM(blogDiv))
  expect(component.container).toHaveTextContent('My First Blog')
  expect(component.container).toHaveTextContent('Mr Bob')

  // test if the rest of the details are hidden
  const div = component.container.querySelector('.blogDetails')
  expect(div).toHaveStyle('display: none')
})

test('blog url and number of likes are shown when button clicked', () => {
  const blog = {
    title: 'My First Blog',
    author: 'Mr Bob',
    user: {
      username: 'itsmario',
      name: 'Mario!',
    },
    url: 'www.blog.com',
    likes: 1
  }
  
  const component = render(
    <Blog blog={blog} />
  )

  const mockHandler = jest.fn()

  const button = component.container.querySelector('.showBlogDetailsButton')

  button.addEventListener('click', mockHandler)

  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})