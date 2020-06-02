import React from 'react';

export default class Header extends React.Component {
  render() {

    return (
      <div className="headerBackground">
        <header className="container header-container d-flex align-items-center justify-content-between">
          <img onClick={() => this.props.setViewFunction('catalog', {})} className="header-logo d-inline" src="images/top-notch-header-logo.png" />
          <div id="checkout" className="cartItemDiv text-white float-right">
            <div onClick={() => this.props.setViewFunction('cart', {})} className="cartItemCount d-inline ">{this.props.cartItemCount} Items </div>
            <i id="shoppingCart" className="fa fa-shopping-cart d-inline"></i>
          </div>
        </header>
      </div>
    );
  }
}
