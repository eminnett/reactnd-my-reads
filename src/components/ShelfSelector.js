import React, { Component } from 'react'

class ShelfSelector extends Component {
  render() {
    return (
      <div className="book-shelf-changer">
        <select defaultValue={this.props.selectedShelf || 'None'}>
          <option value="move" disabled>Move to...</option>
          {this.props.shelves.map((shelf) => (
            <option
              key={shelf}
              value={shelf}
              >{shelf}</option>
          ))}
          <option value="None">None</option>
        </select>
      </div>
    )
  }
}

export default ShelfSelector
