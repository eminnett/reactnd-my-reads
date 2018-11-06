import React, { Component } from 'react'

class ShelfSelector extends Component {
  render() {
    return (
      <div className="book-shelf-changer">
        <select defaultValue={this.props.selectedShelf.id || 'none'}>
          <option value="move" disabled>Move to...</option>
          {this.props.shelves.map((shelf) => (
            <option
              key={shelf.id}
              value={shelf.id}
              >{shelf.name}</option>
          ))}
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default ShelfSelector
