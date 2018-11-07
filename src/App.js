import React from 'react'
import { Route } from 'react-router-dom'
import { debounce } from 'throttle-debounce'
import * as BooksAPI from './BooksAPI'
import HomePage from './pages/Home'
import SearchPage from './pages/Search'
import './App.css'

// TODO: Review the rubric and double check that all the requirements have been met.

window.BooksAPI = BooksAPI;

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelves: new Map([
        [{id:'currentlyReading', name:'Currently Reading'}, []],
        [{id:'wantToRead', name:'Want to Read'}, []],
        [{id:'read', name:'Read'}, []]
      ]),
      searchResults: []
    };
    BooksAPI.getAll().then((response) => {
      let shelves = this.state.shelves;
      for (let bookData of response) {
        for (let [shelf, books] of shelves) {
          if (bookData.shelf === shelf.id) {
            books.push(this.buildBook(bookData));
            shelves.set(shelf, books);
          }
        }
      }
      this.setState({ shelves: shelves });
    });
  }

  buildBook = (data) => {
    // This is the only data we need to render the Book component so there is
    // no need to store pass around more than this.
    return {
      id: data.id,
      title: data.title,
      author: (data.authors ?  data.authors.join(', ') : ''),
      imageUrl: (data.imageLinks ? data.imageLinks.thumbnail : ''),
      shelfId: data.shelf
    }
  }

  handleShelfChange = (bookId, shelfId) => {
    let shelves = this.state.shelves;
    let bookFound = false;
    let book = null;
    // Search for the book in the shelves and remove it if it exists.
    for (let [shelf, books] of shelves) {
      book = books.find((b) => b.id === bookId)
      if (book) {
        bookFound = true;
        shelves.set(shelf, books.filter((b) => b.id !== bookId));
        BooksAPI.update(book, 'none');
        break;
      }
    }
    // Add the book to the new shelf unless the new shelf is 'none'.
    if (shelfId !== 'none') {
      if (bookFound) {
        shelves = this.setShelf(book, shelfId);
        this.setState({ shelves: shelves });
      } else {
        BooksAPI.get(bookId).then((response) => {
          shelves = this.setShelf(this.buildBook(response), shelfId);
          this.setState({ shelves: shelves });
        });
      }
    } else {
      this.setState({ shelves: shelves });
    }
  }

  setShelf = (book, shelfId) => {
    let shelves = this.state.shelves;
    for (let [shelf, books] of shelves) {
      if (shelfId === shelf.id) {
        book.shelfId = shelfId;
        books.push(book);
        shelves.set(shelf, books);
        BooksAPI.update(book, shelfId);
        break;
      }
    }
    return shelves;
  }

  performSearch = (query) => {
    // Submit a string with a space to avoid getting a 403 from the
    // API when the query is empty.
    query = query || ' ';
    BooksAPI.search(query).then((response) => {
      let searchResults = [];
      if (response && !response.error) {
        for (let bookData of response) {
          // Search for the book in the shelves and set the shelf if it is found.
          for (let [shelf, books] of this.state.shelves) {
            if (books.find((b) => b.id === bookData.id)) {
              bookData.shelf = shelf.id;
              break;
            }
          }
          searchResults.push(this.buildBook(bookData));
        }
      }
      this.setState({ searchResults: searchResults });
    });
  }

  resetSearch = () => {
    this.setState({ searchResults: [] });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <HomePage
            pageTitle='MyReads'
            shelves={this.state.shelves}
            updateShelf={this.handleShelfChange}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchPage
            updateShelf={this.handleShelfChange}
            performSearch={debounce(100, this.performSearch)}
            resetSearch={this.resetSearch}
            searchResults={this.state.searchResults}
            shelves={Array.from(this.state.shelves.keys())}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
