import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Shelf from '../components/Shelf'
import SearchButton from '../components/SearchButton'

class HomePage extends Component {
  static PropTypes = {
    shelves: PropTypes.instanceOf(Map).isRequired,
    pageTitle: PropTypes.string.isRequired
  }

  render() {
    const shelves = Array.from(this.props.shelves.keys());
    const shelfElements = [];

    // The Map object doesn't have a map method so the elements have to be
    // stored in an intermediate variable.
    this.props.shelves.forEach((books, shelf) => (
      shelfElements.push(
        <Shelf
          key={shelf.id}
          shelf={shelf}
          shelves={shelves}
          books={books}
        />
      )
    ))

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
