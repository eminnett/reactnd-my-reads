import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const Shelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.shelf.name}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map((book) => (
          <li key={book.id}>
            <Book
              title={book.title}
              author={book.author}
              imageUrl={book.imageUrl}
              currentShelf={props.shelf}
              shelves={props.shelves}
            />
          </li>
        ))}
      </ol>
    </div>
  </div>
);

Shelf.PropTypes = {
  shelf: PropTypes.object.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Shelf
