import React from 'react'
import PropTypes from 'prop-types'
import HomeButton from '../components/HomeButton'
import SearchField from '../components/SearchField'
import Book from '../components/Book'

const SearchPage = (props) => (
  <div className="search-books">
    <div className="search-books-bar">
      <HomeButton
        resetSearch={props.resetSearch}
      />
      <SearchField
        performSearch={props.performSearch}
      />
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
        {props.searchResults.map((book) => (
          <li key={book.id}>
            <Book
              id={book.id}
              title={book.title}
              author={book.author}
              imageUrl={book.imageUrl}
              currentShelfId={book.shelfId}
              shelves={props.shelves}
              updateShelf={props.updateShelf}
            />
          </li>
        ))}
      </ol>
    </div>
  </div>
)

SearchPage.propTypes = {
  performSearch: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateShelf: PropTypes.func.isRequired,
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default SearchPage
