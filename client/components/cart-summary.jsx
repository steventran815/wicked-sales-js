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
        <CartSummaryItem key={singleItem.cartItemId} item={singleItem} />
      );
    });

    let checkoutSummary = null;
    let checkoutMessage = null;
    if (this.props.item.length === 0) {
      checkoutSummary = null;
      checkoutMessage = <h3 className="text-muted mt-5">There are no items in your cart</h3>;
    } else {
      checkoutMessage = null;
      checkoutSummary = <button onClick={() => this.props.setViewFunction('checkout', {})} className="checkout-button btn btn-primary">Checkout</button>;
    }

    return (
      <div>
        <div className="backToCatalog mb-3 text-muted" onClick={() => this.props.setViewFunction('catalog', {})}><i className="fas fa-angle-left"></i> Back to Catalog</div>
        <h4 className="summaryTitle mb-3">Cart</h4>
        {checkoutMessage}
        {cartList}
        <div className="summaryFooter mt-5 mb-5">
          <h4 className="totalPrice">Item Total: ${((totalPrice) / 100).toFixed(2)}</h4>
          {checkoutSummary}
        </div>
      </div>
    );
  }
}
