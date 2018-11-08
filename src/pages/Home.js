import React from 'react';
import PropTypes from 'prop-types';
import Shelf from '../components/Shelf';
import SearchButton from '../components/SearchButton';

const HomePage = (props) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>{props.pageTitle}</h1>
    </div>
    <div className="list-books-content">
      {props.appState.shelves.map((shelf) => (
        <Shelf
          key={shelf.id}
          shelf={shelf}
          shelves={props.appState.shelves}
          books={props.appState[shelf.id]}
          updateShelf={props.updateShelf}
        />
      ))}
    </div>
    <SearchButton />
  </div>
);

HomePage.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  updateShelf: PropTypes.func.isRequired,
  appState: PropTypes.object.isRequired
};

export default HomePage;
