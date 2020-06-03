import React from 'react';
import Header from './header.jsx';
import ProductList from './product-list.jsx';
import ProductDetails from './product-details.jsx';
import CartSummary from './cart-summary.jsx';
import CheckoutForm from './checkout-form.jsx';
import DemoModal from './demoModal.jsx';
import Footer from './footer.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.setView = this.setView.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.handleAddedToCart = this.handleAddedToCart.bind(this);
    this.deleteCartItem = this.deleteCartItem.bind(this);
    this.state = {
      cart: [],
      view: {
        name: 'catalog',
        params: {}
      },
      demoModal: true,
      addToCart: false
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
      }).catch(error => console.error('Error:', error));
  }

  handleDemo() {
    this.setState({
      demoModal: false
    });
  }

  handleAddedToCart() {
    this.setState({
      addToCart: !this.state.addToCart
    });
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      },
      addToCart: false
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

  deleteCartItem(cartItem) {
    const cart = this.state.cart;
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItem)
    };

    fetch('/api/cart', req)
      .then(() => {
        const cartIdNumer = (parseInt(cartItem.cartItemId));
        const newCart = cart.filter(item => item.cartItemId !== cartIdNumer);
        this.setState({
          cart: newCart
        });
      }).catch(err => console.error(err));
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
          cart: this.state.cart.concat(data),
          addToCart: true
        })
      )
      .catch(err => console.error(err));
  }

  render() {
    let demoModal = null;
    if (this.state.demoModal === true) {
      demoModal = <DemoModal setViewFunction={this.setView} handleDemoFunction={this.handleDemo}/>;
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
          <Footer />
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <div>
          <Header setViewFunction={this.setView} cartItemCount={this.state.cart.length} />
          <div className="container">
            <ProductDetails handleAddToCartFunction={this.handleAddedToCart} addToCartFunction={this.addToCart} addedToCart={this.state.addToCart} setViewFunction={this.setView} productId={this.state.view.params.productId} params={this.state.view.params} />
          </div>
          <Footer />
        </div >
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <div>
          <Header setViewFunction={this.setView} cartItemCount={this.state.cart.length} />
          <div className="container">
            <CartSummary deleteCartItemFunction={this.deleteCartItem} item={this.state.cart} addToCartFunction={this.addToCart} setViewFunction={this.setView} productId={this.state.view.params.productId} params={this.state.view.params} />
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
