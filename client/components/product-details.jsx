import React from 'react';

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

    const product = this.state.product;
    if (this.state.product === null) {
      return (
        null
      );
    } else {
      return (
        <div className="descriptionBackground bg-white pl-5 pr-5 pt-4 pb-4 container">
          <div className="row">
            <div className="col-md-12">
              <div className="backToCatalog text-muted" onClick={() => this.props.setViewFunction('catalog', {})}><i className="fas fa-angle-left"></i> CONTINUE SHOPPING</div>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-md-6">
              <div className="descriptionImageBox d-flex align-self-center">
                <img className="descriptionImage" alt="An image of the product" title="product image" src={product.imageDetail} />
              </div>
            </div>
            <div className="productDetails col-md-6">
              <div>
                <h2 className="descriptionName">{product.name}</h2>
                <h4 className="text-muted">${((product.price) / 100).toFixed(2)}</h4>
                <p className="descriptionLongDescription">{product.shortDescription}</p>
                <h6 className="text-muted">Material: <em>{product.madewith}</em></h6>
                <button onClick={() => this.props.addToCartFunction(product)} className="btn btn-primary mt-3">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
