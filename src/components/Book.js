import React from 'react'
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

export default Book
