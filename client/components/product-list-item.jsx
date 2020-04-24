import React from 'react';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const productImage = this.props.product.image;
    const productName = this.props.product.name;
    const productPrice = ((this.props.product.price) / 100).toFixed(2);
    const productShortDescription = this.props.product.shortDescription;
    return (
      <div className="col-md-4 cardContainer">
        <div className="card">
          <div className="productImageDiv">
            <img className="productImage" src={productImage}></img>
          </div>
          <div className="productDescription">
            <h5 className="productTitle"><strong>{productName}</strong></h5>
            <p><span className="price">${productPrice}</span></p>
            <p>{productShortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
