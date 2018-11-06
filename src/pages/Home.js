import React, { Component } from 'react'
import Shelf from '../components/Shelf'
import SearchButton from '../components/SearchButton'

class HomePage extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{this.props.pageTitle}</h1>
        </div>
        <div className="list-books-content">
          {this.props.shelves.map((shelf) => (
            <div key={shelf}>
              <Shelf
                shelfName={shelf}
                shelves={this.props.shelves}
              />
            </div>
          ))}
        </div>
        <SearchButton />
      </div>
    )
  }
}

export default HomePage
