import React from 'react'
import PropTypes from 'prop-types'
import ShelfSelector from './ShelfSelector'

const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.imageUrl})` }}></div>
      <ShelfSelector
        bookId={props.id}
        shelves={props.shelves}
        selectedShelf={props.currentShelf}
        updateShelf={props.updateShelf}
      />
    </div>
    <div className="book-title">{props.title}</div>
    <div className="book-authors">{props.author}</div>
  </div>
);

Book.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentShelf: PropTypes.object,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  updateShelf: PropTypes.func.isRequired
}

export default Book
