import React from 'react';
import { Route } from 'react-router-dom';
import { debounce } from 'throttle-debounce';
import * as BooksAPI from './BooksAPI';
import HomePage from './pages/Home';
import SearchPage from './pages/Search';
import './App.css';

// TODO: Refactor the code so that book objects are passed around instead of pieces of the book data.
// TODO: Refactor event handler arrow functions.
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
        if (bookData.shelf in booksOnShelves) {
          booksOnShelves[bookData.shelf].push(book);
        } else {
          booksOnShelves[bookData.shelf] = [book];
        }
      }
      this.setState(booksOnShelves);
    });
  }

  bookObj = (data) => {
    // This is the only data we need to render the Book component so there is
    // no need to store or pass around more than this. This method is used when
    // parsing API data which is why this method is here and not part of the
    // Book Component.
    return {
      id: data.id,
      title: data.title,
      author: (data.authors ?  data.authors.join(', ') : ''),
      imageUrl: (data.imageLinks ? data.imageLinks.thumbnail : ''),
      shelfId: data.shelf
    };
  };

  handleShelfChange = (bookId, shelfId) => {
    let booksOnShelf = {};
    let bookFound = false;
    let book = null;
    // Search for the book in the shelves and remove it if it exists.
    for (let shelf of this.state.shelves) {
      let books = this.state[shelf.id];
      book = books.find((b) => b.id === bookId);
      if (book) {
        bookFound = true;
        booksOnShelf[shelf.id] = books.filter((b) => b.id !== bookId);
        BooksAPI.update(book, 'none');
        this.setState(booksOnShelf);
        break;
      }
    }
    // Add the book to the new shelf unless the new shelf is 'none'.
    if (shelfId !== 'none') {
      booksOnShelf = {};
      booksOnShelf[shelfId] = this.state[shelfId];
      if (bookFound) {
        booksOnShelf[shelfId].push(book);
        BooksAPI.update(book, shelfId);
        this.setState(booksOnShelf);
      } else {
        BooksAPI.get(bookId).then((response) => {
          book = this.bookObj(response);
          booksOnShelf[shelfId].push(book);
          BooksAPI.update(book, shelfId);
          this.setState(booksOnShelf);
        });
      }
    }
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

  resetSearch = () => {
    this.setState({ searchResults: [] });
  };

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <HomePage
            pageTitle='MyReads'
            state={this.state}
            updateShelf={this.handleShelfChange}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchPage
            updateShelf={this.handleShelfChange}
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
