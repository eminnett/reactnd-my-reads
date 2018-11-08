import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HomeButton = (props) => (
  <div>
    <Link
      className="close-search"
      to='/'
      onClick={props.resetSearch}
    >Close</Link>
  </div>
);

HomeButton.propTypes = {
  resetSearch: PropTypes.func.isRequired
};

export default HomeButton;
