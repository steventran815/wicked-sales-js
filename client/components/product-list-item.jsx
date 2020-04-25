import React from 'react';

export default function ProductListItem(props) {
  const product = props.product;
  const productImage = product.image;
  const productName = product.name;
  const productPrice = ((product.price) / 100).toFixed(2);
  const productShortDescription = product.shortDescription;
  return (
    <div onClick={() => props.setViewFunction('details', { productId: props.product.productId })} className="col-md-4 mb-5">
      <div className="card productCard">
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
