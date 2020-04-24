import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="headerBackground">
        <header className="container">
          <h1 className="title"><span className="logo"><i className="fas fa-dollar-sign"></i></span>Wicked Sales</h1>
        </header>
      </div>
    );
  }
}
