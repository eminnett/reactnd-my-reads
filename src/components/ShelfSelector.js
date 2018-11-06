import React from 'react'

const ShelfSelector = (props) => (
  <div className="book-shelf-changer">
    <select defaultValue={props.selectedShelf.id || 'none'}>
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

export default ShelfSelector
