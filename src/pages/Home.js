import React, { Component } from 'react'
import Shelf from '../components/Shelf'
import SearchButton from '../components/SearchButton'

class HomePage extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelf />
          <Shelf />
          <Shelf />
        </div>
        <SearchButton />
      </div>
    )
  }
}

export default HomePage
