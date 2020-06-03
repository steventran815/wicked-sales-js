import React from 'react';

export default class CartSummaryItem extends React.Component {

  render() {
    const item = this.props.item;
    const itemName = item.name;
    const itemImage = item.image;
    const itemShortDescription = item.shortDescription;
    const itemMaterial = item.madewith;
    const itemPrice = ((item.price) / 100).toFixed(2);
    return (
      <div className="cartItemSummaryDiv bg-white container p-5">
        <div className="row w-100 align-items-center d-flex">
          <div className="col-md-7">
            <div className="cartItemSummaryImageContainer d-flex align-items-center justify-content-center">
              <img src={itemImage} className="cartItemSummaryImage" />
            </div>
          </div>
          <div className="col-md-5 descriptionContainer">
            <h4 className="cartItemSummaryName"><strong>{itemName}</strong></h4>
            <div className="descriptionDivider"></div>
            <h5 className="checkoutPrice"><span>${itemPrice}</span></h5>
            {itemMaterial}
            <p className="cartItemSummaryShortDescription">{itemShortDescription}</p>
            <h6 className="removeItem" onClick={() => this.props.setViewFunction('checkout', {})}><i className="far fa-times-circle"></i> REMOVE</h6>
          </div>
        </div>
      </div>
    );
  }
}
