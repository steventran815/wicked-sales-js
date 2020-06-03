import React from 'react';
import ProductListItem from './product-list-item.jsx';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => this.setState({
        products: data
      }))
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const product = this.state.products;
    const productsList = product.map(singleProduct => {
      return (
        <ProductListItem setViewFunction={this.props.setViewFunction} key={singleProduct.productId} product={singleProduct} />
      );
    });
    return (
      <div className="containter productBackground">
        <div className="banner"></div>
        <div className="row">{productsList}</div>
      </div>
    );
  }
}
