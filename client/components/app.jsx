import React from 'react';
import Header from './header.jsx';
import ProductList from './product-list.jsx';
import ProductDetails from './product-details.jsx';
import CartSummary from './cart-summary.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.setView = this.setView.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.state = {
      cart: [],
      view: {
        name: 'catalog',
        params: {}
      }
    };
  }

  placeOrder(orderInformation) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderInformation)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          view: {
            cart: [],
            name: 'catalog',
            params: {}
          }
        });
      })
      .catch(error => console.error('Error:', error));
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({
        cart: data
      }))
      .catch(err => console.error(err));
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    }).then(res => res.json())
      .then(data =>
        this.setState({
          cart: this.state.cart.concat(data)
        })
      )
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header setViewFunction={this.setView} cartItemCount={this.state.cart.length}/>
          <div className="container pt-5">
            <ProductList setViewFunction={this.setView} />
          </div>
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <div>
          <Header setViewFunction={this.setView} cartItemCount={this.state.cart.length} />
          <div className="container pt-5">
            <ProductDetails addToCartFunction={this.addToCart} setViewFunction={this.setView} productId={this.state.view.params.productId} params={this.state.view.params} />
          </div>
        </div >
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <div>
          <Header setViewFunction={this.setView} cartItemCount={this.state.cart.length} />
          <div className="container pt-5">
            <CartSummary item={this.state.cart} addToCartFunction={this.addToCart} setViewFunction={this.setView} productId={this.state.view.params.productId} params={this.state.view.params} />
          </div>
        </div>
      );
    }
  }
}
