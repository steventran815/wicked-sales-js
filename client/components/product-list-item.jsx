import React from 'react';

export default function ProductListItem(props) {
  const product = props.product;
  const productImage = product.image;
  const productName = product.name;
  const productPrice = ((product.price) / 100).toFixed(2);
  const productImageDetail = product.imageDetail;
  return (
    <div onClick={() => props.setViewFunction('details', { productId: props.product.productId })} className="col-md-4 mb-5 productCard">

      <div className="productImageDiv">
        <img className="productImage" alt="An image of a product" title="product Image" src={productImage}></img>
        <img className="productImageDetail" alt="A detailed image of a product" title="product Image" src={productImageDetail}></img>
      </div>
      <div className="productDescription">
        <h5 className="productTitle"><strong>{productName}</strong></h5>
        <div className="productDivider text-align-center"></div>
        <p className="price">${productPrice}</p>

      </div>
    </div>

  );
}
