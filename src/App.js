import React from 'react';
import { Route } from 'react-router-dom';
import { debounce } from 'throttle-debounce';
import * as BooksAPI from './BooksAPI';
import HomePage from './pages/Home';
import SearchPage from './pages/Search';
import './App.css';

// TODO: Refactor search functionality out of the App and into the SearchPage component.
// TODO: Refine the documentation.


class BooksApp extends React.Component {
  state = {
    shelves: [{id:'currentlyReading', name:'Currently Reading'}, {id:'wantToRead', name:'Want to Read'}, {id:'read', name:'Read'}],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    searchResults: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((response) => {
      let booksOnShelves = {};
      for (let bookData of response) {
        let book = this.bookObj(bookData);
        if (book.shelfId in booksOnShelves) {
          booksOnShelves[book.shelfId].push(book);
        } else {
          booksOnShelves[book.shelfId] = [book];
        }
      }
      this.setState(booksOnShelves);
    });
  }

  bookObj = (data) => {
    // This is the only data we need to render the Book component so there is
    // no need to store or pass around more than this. This method is used when
    // parsing API data which is why this method is here and not part of the
    // Book component.
    return {
      id: data.id,
      title: data.title,
      author: (data.authors ?  data.authors.join(', ') : ''),
      imageUrl: (data.imageLinks ? data.imageLinks.thumbnail : ''),
      shelfId: data.shelf
    };
  };

  updateShelf = (event) => {
    const book = JSON.parse(event.target.getAttribute('data-book'));
    const oldShelfId = book.shelfId || 'none';
    const newShelfId = event.target.value || 'none';
    let booksOnShelves = {};

    BooksAPI.update(book, newShelfId);

    if (oldShelfId !== 'none') {
      booksOnShelves[oldShelfId] = this.state[oldShelfId].filter((b) => b.id !== book.id);
    }

    if (newShelfId !== 'none') {
      booksOnShelves[newShelfId] = this.state[newShelfId];
      booksOnShelves[newShelfId].push(book);
    }

    this.setState(booksOnShelves);
  };

  performSearch = (query) => {
    // Submit a string with a space to avoid getting a 403 from the
    // API when the query is empty.
    query = query || ' ';
    BooksAPI.search(query).then((response) => {
      let searchResults = [];
      if (response && !response.error) {
        for (let bookData of response) {
          // Search for the book in the shelves and set the shelf if it is found.
          for (let shelf of this.state.shelves) {
            if (this.state[shelf.id].find((b) => b.id === bookData.id)) {
              bookData.shelf = shelf.id;
              break;
            }
          }
          searchResults.push(this.bookObj(bookData));
        }
      }
      this.setState({ searchResults: searchResults });
    });
  };

  resetSearch = (_) => {
    this.setState({ searchResults: [] });
  };

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <HomePage
            pageTitle='MyReads'
            state={this.state}
            updateShelf={this.updateShelf}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchPage
            updateShelf={this.updateShelf}
            performSearch={debounce(100, this.performSearch)}
            resetSearch={this.resetSearch}
            searchResults={this.state.searchResults}
            shelves={this.state.shelves}
          />
        )} />
      </div>
    )
  };
};

export default BooksApp;
