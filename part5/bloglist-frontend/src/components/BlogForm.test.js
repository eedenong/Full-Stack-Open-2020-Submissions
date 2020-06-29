import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('BlogForm updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'My First Blog'}
  })
  fireEvent.change(authorInput, {
    target: { value: 'Bobby McKenzie'}
  })
  fireEvent.change(urlInput, {
    target: { value: 'myfirstblog.com'}
  })
  

  //check the contents of the form
  expect(form).toHaveFormValues({
    Title: 'My First Blog',
    Author: 'Bobby McKenzie',
    Url: 'myfirstblog.com'
  })
 
  fireEvent.submit(form)
  expect(createBlog.mock.calls).toHaveLength(1)
 
  

})