import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <div className="headerBackground">
        <header className="container">
          <h1 className="title d-inline"><span className="logo"><i className="fas fa-dollar-sign"></i></span>Wicked Sales</h1>
          <div onClick={() => this.props.setViewFunction('cart', {})} className="cartItemDiv text-white float-right">
            <div className="cartItemCount d-inline ">{this.props.cartItemCount} Items </div>
            <i className="fa fa-shopping-cart d-inline"></i>
          </div>
        </header>
      </div>
    );
  }
}
