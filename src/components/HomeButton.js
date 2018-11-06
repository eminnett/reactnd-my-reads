import React, { Component } from 'react'

class HomeButton extends Component {
  render() {
    return (
      <div>
        <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
      </div>
    )
  }
}

export default HomeButton
