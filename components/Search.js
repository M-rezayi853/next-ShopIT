import React, { useState } from 'react'
import { useRouter } from 'next/router'

const Search = () => {
  const router = useRouter()

  const [keyword, setKeyword] = useState('')

  const searchHandler = (e) => {
    e.preventDefault()

    if (keyword.trim()) {
      router.push(`/?keyword=${keyword}`)
    } else {
      router.push('/')
    }
  }

  return (
    <form onSubmit={searchHandler}>
      <div className='input-group'>
        <input
          type='text'
          id='search_field'
          className='form-control'
          placeholder='Enter Product Name ...'
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className='input-group-append'>
          <button id='search_btn' className='btn'>
            <i className='fa fa-search' aria-hidden='true'></i>
          </button>
        </div>
      </div>
    </form>
  )
}

export default Search
