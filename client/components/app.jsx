import React from 'react';
import Header from './header.jsx';
import ProductList from './product-list.jsx';
import ProductDetails from './product-details.jsx';
import CartSummary from './cart-summary.jsx';
import CheckoutForm from './checkout-form.jsx';
import DemoModal from './demoModal.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.setView = this.setView.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.state = {
      cart: [],
      view: {
        name: 'catalog',
        params: {}
      },
      demoModal: true
    };
  }

  placeOrder(newOrder) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrder)
    })
      .then(res => res.json())
      .then(data => {
        if (newOrder.name === '' || newOrder.creditCard === '' || newOrder.shippingAddress === '') {
          this.setState({
            error: data.error
          });
          return;
        }
        this.setState({
          cart: [],
          view: {
            name: 'catalog',
            params: {}
          }
        });
      })
      .catch(error => console.error('Error:', error));
  }

  handleDemo() {
    this.setState({
      demoModal: false
    });
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
    let demoModal = null;
    if (this.state.demoModal === true) {
      demoModal = <DemoModal handleDemoFunction={this.handleDemo}/>;
    } else {
      demoModal = false;
    }
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          {demoModal}
          <Header setViewFunction={this.setView} cartItemCount={this.state.cart.length} />
          <div className="container">
            <ProductList setViewFunction={this.setView} />
          </div>
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <div>
          <Header setViewFunction={this.setView} cartItemCount={this.state.cart.length} />
          <div className="container">
            <ProductDetails addToCartFunction={this.addToCart} setViewFunction={this.setView} productId={this.state.view.params.productId} params={this.state.view.params} />
          </div>
        </div >
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <div>
          <Header setViewFunction={this.setView} cartItemCount={this.state.cart.length} />
          <div className="container">
            <CartSummary item={this.state.cart} addToCartFunction={this.addToCart} setViewFunction={this.setView} productId={this.state.view.params.productId} params={this.state.view.params} />
          </div>
        </div>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <div>
          <Header setViewFunction={this.setView} cartItemCount={this.state.cart.length} />
          <div className="container pt-5">
            <CheckoutForm error={this.state.error} totalPrice={this.props.totalPrice} cartItemCount={this.state.cart.length} setViewFunction={this.setView} item={this.state.cart} placeOrderFunction={this.placeOrder}/>
          </div>
        </div>
      );
    }
  }
}
