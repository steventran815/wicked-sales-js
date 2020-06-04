import React from 'react';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  handleRemoveItem() {
    const cartItem = {
      cartItemId: JSON.stringify(this.props.item.cartItemId),
      productId: JSON.stringify(this.props.item.productId)
    };
    this.props.deleteCartItemFunction(cartItem);
  }

  render() {
    const item = this.props.item;
    const itemName = item.name;
    const itemImage = item.image;
    const itemShortDescription = item.shortDescription;
    const itemMaterial = item.madewith;
    const itemPrice = ((item.price) / 100).toFixed(2);
    return (
      <div className=" pt-3 pb-3 mb-4 cartItemSummaryDiv bg-white container">
        <center>
          <div className="row w-100 align-items-center d-flex">
            <div className="col-md-7">
              <div className="cartItemSummaryImageContainer">
                <img src={itemImage} className="cartItemSummaryImage" />
              </div>
            </div>
            <div className="col-md-5 descriptionContainer">
              <h4 className="cartItemSummaryName"><strong>{itemName}</strong></h4>
              <div className="descriptionDivider"></div>
              <h5 className="checkoutPrice"><span>${itemPrice}</span></h5>
              {itemMaterial}
              <p className="cartItemSummaryShortDescription">{itemShortDescription}</p>
              <h6 className="removeItem" onClick={this.handleRemoveItem}><i className="far fa-times-circle"></i> REMOVE</h6>
            </div>
          </div>
        </center>
      </div>
    );
  }
}
