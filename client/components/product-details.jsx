import React from 'react';
import AddToCartModal from './addToCartModal.jsx';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    const productId = this.props.productId;
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => this.setState({
        product: data
      }))
      .catch(err => console.error(err));
  }

  setView(name, params) {
    this.setState({
      view: {
        name: 'catalog',
        params: { productId: this.props.key }
      }
    });
  }

  render() {
    let addedToCartModal = null;
    if (this.state.product === null) {
      return (
        <div className="descriptionContainer pt-5 justify-content-center">
          <div className="descriptionBackground d-flex bg-white p-5 container">
          </div>
        </div>
      );
    }
    if (this.props.addedToCart === true) {
      addedToCartModal = <AddToCartModal name={this.state.product.name} setViewFunction={this.props.setViewFunction} handleAddToCartFunction={this.props.handleAddToCartFunction} />;
    } else if (this.props.addedToCart === false) {
      addedToCartModal = null;
    }
    const product = this.state.product;
    if (this.state.product === null) {
      return (
        null
      );
    } else {
      return (
        <div>
          {addedToCartModal}
          <div className="descriptionContainer  d-flex justify-content-center">
            <div className="descriptionBackground d-flex bg-white justify-content-center container">
              <div className="backToCatalog" onClick={() => this.props.setViewFunction('catalog', {})}><i className="far fa-times-circle back"></i></div>
              <div className="row w-100">
                <div className="col-md-7">
                  <div className="descriptionImageBox">
                    <img className="descriptionImage" alt="An image of the product" title="product image" src={product.imageDetail} />
                  </div>
                </div>
                <div className="productDetails col-md-5">
                  <div>
                    <h2 className="descriptionName">{product.name}</h2>
                    <div className="descriptionDivider"></div>
                    <h4 className="descriptionProductPrice"><strong>${((product.price) / 100).toFixed(2)}</strong></h4>
                    <h6 className="text-muted">Material: <em>{product.madewith}</em></h6>
                    <p className="descriptionShortDescription">{product.shortDescription}</p>
                    <button onClick={() => this.props.addToCartFunction(product)} className="addToCartButton">Add to Cart</button><br/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
