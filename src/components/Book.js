import React from 'react';
import PropTypes from 'prop-types';
import ShelfSelector from './ShelfSelector';

const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageUrl})` }}></div>
      <ShelfSelector
        book={props.book}
        shelves={props.shelves}
        updateShelf={props.updateShelf}
      />
    </div>
    <div className="book-title">{props.book.title}</div>
    <div className="book-authors">{props.book.author}</div>
  </div>
);

Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateShelf: PropTypes.func.isRequired
};

export default Book;
