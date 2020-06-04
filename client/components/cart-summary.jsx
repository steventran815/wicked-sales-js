import React from 'react';
import CartSummaryItem from './cart-summary-item.jsx';
export default class CartSummary extends React.Component {

  render() {
    const item = this.props.item;
    let totalPrice = 0;
    for (let i = 0; i < item.length; i++) {
      totalPrice += item[i].price;
    }
    const cartList = item.map(singleItem => {
      return (
        <CartSummaryItem product={this.props.item} deleteCartItemFunction={this.props.deleteCartItemFunction} key={singleItem.cartItemId} item={singleItem} />
      );
    });

    let checkoutSummary = null;
    let checkoutMessage = null;
    if (this.props.item.length === 0) {
      checkoutSummary = null;
      checkoutMessage = <h3 className="text-muted mt-5 mb-5 no-items">There are no items in your cart</h3>;
    } else {
      checkoutMessage = null;
      checkoutSummary = <button onClick={() => this.props.setViewFunction('checkout', {})} className="addToCartButton">CHECKOUT</button>;
    }

    return (
      <div className="summaryBackground">
        <div className="backToCatalog mb-3 text-muted" onClick={() => this.props.setViewFunction('catalog', {})}><i className="fas fa-angle-left"></i> CONTINUE SHOPPING</div>
        {checkoutMessage}
        {cartList}
        <div className="summaryFooter mt-3 mb-5">
          <div>
            <strong><h4 className="totalPriceHeader">Total: <span className="totalPrice">${((totalPrice) / 100).toFixed(2)}</span></h4></strong>
            <div className="mb-0 descriptionDivider"></div>
          </div>
          {checkoutSummary}
        </div>
      </div>
    );
  }
}
