import React from 'react';

export default class CartSummaryItem extends React.Component {

  render() {
    const item = this.props.item;
    const itemName = item.name;
    const itemImage = item.image;
    const itemShortDescription = item.shortDescription;
    const itemPrice = ((item.price) / 100).toFixed(2);

    return (
      <div className="cartItemSummaryDiv bg-white container mb-3 p-5">
        <div className="row align-items-center d-flex">
          <div className="col-md-5">
            <div className="cartItemSummaryImageContainer d-flex align-items-center justify-content-center">
              <img src={itemImage} className="cartItemSummaryImage" />
            </div>
          </div>
          <div className="col-md-7">
            <h4 className="cartItemSummaryName"><strong>{itemName}</strong></h4>
            <h5 className="text-muted">${itemPrice}</h5>
            <p className="cartItemSummaryShortDescription">{itemShortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
