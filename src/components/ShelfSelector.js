import React from 'react'
import PropTypes from 'prop-types'

const ShelfSelector = (props) => (
  <div className="book-shelf-changer">
    <select defaultValue={props.selectedShelf ? props.selectedShelf.id : 'none'}>
      <option value="move" disabled>Move to...</option>
      {props.shelves.map((shelf) => (
        <option
          key={shelf.id}
          value={shelf.id}
          >{shelf.name}</option>
      ))}
      <option value="none">None</option>
    </select>
  </div>
);

ShelfSelector.PropTypes = {
  selectedShelf: PropTypes.object.isRequired,
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ShelfSelector
