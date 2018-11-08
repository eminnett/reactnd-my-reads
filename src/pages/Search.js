import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'throttle-debounce';
import * as BooksAPI from '../BooksAPI';
import * as Utils from '../Utils';
import HomeButton from '../components/HomeButton';
import SearchField from '../components/SearchField';
import Book from '../components/Book';

class SearchPage extends React.Component {
  static propTypes = {
    updateShelf: PropTypes.func.isRequired,
    appState: PropTypes.object.isRequired
  };

  state = {
    searchResults: []
  };

  queryPresent = false;

  performSearch = (query) => {
    if (query) {
      this.queryPresent = true;
      BooksAPI.search(query).then((response) => {
        // Only parse the search results and update the state if a query is
        // still present. This resolves a bug where pressing the backspace
        // in the search field at just the right speed will result in search
        // results rendering after the query has been removed
        // (due to the delay in the API response).
        if (this.queryPresent) {
          let searchResults = [];
          if (response && !response.error) {
            for (let bookData of response) {
              // Search for the book in the shelves and set the shelf if it is found.
              for (let shelf of this.props.appState.shelves) {
                if (this.props.appState[shelf.id].find((b) => b.id === bookData.id)) {
                  bookData.shelf = shelf.id;
                  break;
                }
              }
              searchResults.push(Utils.buildBook(bookData));
            }
          }
          this.setState({ searchResults: searchResults });
        }
      });
    } else {
      this.queryPresent = false;
      this.setState({ searchResults: [] });
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <HomeButton />
          <SearchField
            performSearch={debounce(100, this.performSearch)}
          />
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  shelves={this.props.appState.shelves}
                  updateShelf={this.props.updateShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage;
