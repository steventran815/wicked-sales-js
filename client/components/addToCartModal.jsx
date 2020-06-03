import React from 'react';

export default class DemoModal extends React.Component {

  render() {
    return (
      <div className="addToCartContainer">
        <div className="demoModal container">
          <h1 className="modalTitle">Lookin&apos; Good!</h1>
          <center><div className="descriptionDivider"></div></center>
          <h5><span><strong>{this.props.name}</strong></span> has been added to the cart.</h5>
          <button className="addToCartModalButton mt-2  mr-2" onClick={() => this.props.setViewFunction('catalog', {})}>CONTINUE SHOPPING</button>
          <button className="addToCartButton mt-2" onClick={() => this.props.setViewFunction('cart', {})}>VIEW CART</button>
          <div onClick={() => this.props.handleAddToCartFunction()}><i className="far fa-times-circle close"></i></div>
        </div>
      </div>
    );
  }
}
