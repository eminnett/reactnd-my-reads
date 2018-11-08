import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import * as Utils from './Utils';
import HomePage from './pages/Home';
import SearchPage from './pages/Search';
import './App.css';

class BooksApp extends React.Component {
  state = {
    shelves: [{id:'currentlyReading', name:'Currently Reading'}, {id:'wantToRead', name:'Want to Read'}, {id:'read', name:'Read'}],
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((response) => {
      let booksOnShelves = {};
      for (let bookData of response) {
        let book = Utils.buildBook(bookData);
        if (book.shelfId in booksOnShelves) {
          booksOnShelves[book.shelfId].push(book);
        } else {
          booksOnShelves[book.shelfId] = [book];
        }
      }
      this.setState(booksOnShelves);
    });
  }

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

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <HomePage
            pageTitle='MyReads'
            appState={this.state}
            updateShelf={this.updateShelf}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchPage
            appState={this.state}
            updateShelf={this.updateShelf}
          />
        )} />
      </div>
    )
  };
};

export default BooksApp;
