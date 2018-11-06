import React from 'react'
// import * as BooksAPI from './BooksAPI'
import HomePage from './pages/Home'
import SearchPage from './pages/Search'
import './App.css'

// TODO: Add props to the components so the content is no longer hard coded in the JSX blocks.
// TODO: Refactor the flow of data so the correct components are passing properties down to their children.
// TODO: Implement the ability to change the shelf a book belongs to.
// TODO: Refactor the routing so the search and home buttons work.
// TODO: Implement the API integration so books can be loaded dynamically.
// TODO: Review the rubric and double check that all the requirements have been met.

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage />
        ) : (
          <HomePage />
        )}
      </div>
    )
  }
}

export default BooksApp
