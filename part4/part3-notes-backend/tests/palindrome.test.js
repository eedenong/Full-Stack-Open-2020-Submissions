const palindrome = require('../utils/testing').palindrome

test('palindrome of abba', () => {
  const res = palindrome('abba')
  expect(res).toBe('abba')
})

test('palindrome of react', () => {
  const result = palindrome('react')

  expect(result).toBe('tcaer')
})

test('palindrome of releveler', () => {
  const result = palindrome('releveler')

  expect(result).toBe('releveler')
})