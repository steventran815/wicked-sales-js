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
      return <ProductListItem key={singleProduct.productId} product={singleProduct} />;
    });
    return (
      <div className="row">{productsList}</div>
    );
  }
}
