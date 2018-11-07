import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import HomePage from './pages/Home'
import SearchPage from './pages/Search'
import './App.css'

// TODO: Implement the API integration so books can be loaded dynamically.
// TODO: Implement the search behaviour.
// TODO: Review the rubric and double check that all the requirements have been met.

class BooksApp extends React.Component {
  updateShelf = (bookId, shelfId) => {
    let shelves = this.state.shelves;
    let bookFound = false;
    let book = null;
    // Search for the book in the shelves and remove it if it exists.
    for (let [shelf, books] of shelves) {
      book = books.find((b) => b.id === bookId)
      if (book) {
        bookFound = true;
        shelves.set(shelf, books.filter((b) => b.id !== bookId));
        break;
      }
    }

    if (!bookFound) {
      // Get the book from the API.
    }

    // Add the book to the new shelf unless the new shelf is 'none'.
    if (shelfId !== 'none' && bookFound) {
      for (let [shelf, books] of shelves) {
        if (shelfId === shelf.id) {
          shelves[shelf] = books.push(book);
          break;
        }
      }
    }
    this.setState({ shelves: shelves });
  }

  state = {
    shelves: new Map([
      [{id:'currentlyReading', name:'Currently Reading'}, [
        {
          id: '1',
          title:'To Kill a Mockingbird 1',
          author:'Harper Lee 1',
          imageUrl: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
        },
        {
          id: '2',
          title:'To Kill a Mockingbird 2',
          author:'Harper Lee 2',
          imageUrl: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
        }
      ]],
      [{id:'wantToRead', name:'Want to Read'}, [
        {
          id: '3',
          title:'To Kill a Mockingbird 3',
          author:'Harper Lee 3',
          imageUrl: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
        },
        {
          id: '4',
          title:'To Kill a Mockingbird 4',
          author:'Harper Lee 4',
          imageUrl: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
        },
        {
          id: '5',
          title:'To Kill a Mockingbird 5',
          author:'Harper Lee 5',
          imageUrl: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
        }
      ]],
      [{id:'read', name:'Read'}, [
        {
          id: '6',
          title:'To Kill a Mockingbird 6',
          author:'Harper Lee 6',
          imageUrl: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
        }
      ]]
    ])
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <HomePage
            pageTitle='MyReads'
            shelves={this.state.shelves}
            updateShelf={this.updateShelf}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchPage
            updateShelf={this.updateShelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
