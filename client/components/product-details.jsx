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
        <div className="descriptionBackground bg-white p-5 container">
          <div className="row">
            <div className="col-md-12">
              <div className="backToCatalog mb-3 text-muted" onClick={() => this.props.setViewFunction('catalog', {})}>&lt; Back to Catalog</div>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-md-5">
              <div className="descriptionImageBox d-flex align-self-center">
                <img className="descriptionImage" src={product.image} />
              </div>
            </div>
            <div className="col-md-7">
              <h2 className="descriptionName">{product.name}</h2>
              <h4 className="text-muted">${((product.price) / 100).toFixed(2)}</h4>
              <p className="descriptionShortDescription">{product.shortDescription}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="descriptionLongDescription">{product.longDescription}</p>
            </div>
          </div>
        </div>
      );
    }
  }
}
