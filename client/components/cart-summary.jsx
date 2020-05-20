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
    return (
      <div>
        <div className="backToCatalog mb-3 text-muted" onClick={() => this.props.setViewFunction('catalog', {})}>&lt; Back to Catalog</div>
        <h2 className="summaryTitle mb-3">My Cart</h2>
        {cartList}
        <h4 className="totalPrice mt-5 mb-5">Item Total: ${((totalPrice) / 100).toFixed(2)}</h4>
        <button onClick={() => this.props.setViewFunction('checkout', {})} className="checkout-button btn btn-primary">Checkout</button>
      </div>
    );
  }
}
