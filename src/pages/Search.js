import React, { Component } from 'react'
import HomeButton from '../components/HomeButton'
import SearchField from '../components/SearchField'

class SearchPage extends Component {
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <HomeButton />
          <SearchField />
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default SearchPage
