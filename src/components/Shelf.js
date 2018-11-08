import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const Shelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.shelf.name}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map((book) => (
          <li key={book.id}>
            <Book
              book={book}
              shelves={props.shelves}
              updateShelf={props.updateShelf}
            />
          </li>
        ))}
      </ol>
    </div>
  </div>
);

Shelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateShelf: PropTypes.func.isRequired
};

export default Shelf;
