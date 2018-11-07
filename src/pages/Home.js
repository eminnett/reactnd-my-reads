import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Shelf from '../components/Shelf'
import SearchButton from '../components/SearchButton'

class HomePage extends Component {
  static propTypes = {
    shelves: PropTypes.instanceOf(Map).isRequired,
    pageTitle: PropTypes.string.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  render() {
    const shelves = Array.from(this.props.shelves.keys());
    const updateShelf = this.props.updateShelf;
    const shelfElements = [];

    // The Map object doesn't have a map method so the elements have to be
    // stored in an intermediate variable.
    for (let [shelf, books] of this.props.shelves) {
      shelfElements.push(
        <Shelf
          key={shelf.id}
          shelf={shelf}
          shelves={shelves}
          books={books}
          updateShelf={updateShelf}
        />
      )
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{this.props.pageTitle}</h1>
        </div>
        <div className="list-books-content">
          {shelfElements}
        </div>
        <SearchButton />
      </div>
    )
  }
}

export default HomePage
