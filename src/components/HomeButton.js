import React from 'react'
import { Link } from 'react-router-dom'

const HomeButton = (props) => (
  <div>
    <Link className="close-search" to='/'>Close</Link>
  </div>
);

export default HomeButton
