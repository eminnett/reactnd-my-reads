import React from 'react'
import PropTypes from 'prop-types'
import ShelfSelector from './ShelfSelector'

const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.imageUrl})` }}></div>
      <ShelfSelector
        shelves={props.shelves}
        selectedShelf={props.currentShelf}
      />
    </div>
    <div className="book-title">{props.title}</div>
    <div className="book-authors">{props.author}</div>
  </div>
);

ShelfSelector.PropTypes = {
  imageUrl: PropTypes.string.isRequired,
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentShelf: PropTypes.object,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
}

export default Book
