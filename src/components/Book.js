import React, { Component } from 'react'
import ShelfSelector from './ShelfSelector'

class Book extends Component {
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.imageUrl})` }}></div>
          <ShelfSelector
            shelves={this.props.shelves}
            selectedShelf={this.props.currentShelf}
          />
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.author}</div>
      </div>
    )
  }
}

export default Book
