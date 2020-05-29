import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleShippingAddressChange = this.handleShippingAddressChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleCreditCardChange(event) {
    this.setState({ creditCard: event.target.value });
  }

  handleShippingAddressChange(event) {
    this.setState({ shippingAddress: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newOrder = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    this.props.placeOrderFunction(newOrder);
    this.setState({
      name: '',
      creditCard: '',
      shippingAddress: ''
    });
    document.getElementById('checkout-form').reset();
  }

  render() {
    const item = this.props.item;
    let totalPrice = 0;
    for (let i = 0; i < item.length; i++) {
      totalPrice += item[i].price;
    }
    return (
      <div>
        <h3>Checkout Information</h3>
        <div className="pt-3 pb-3">
          <h6 className="text-muted"><strong>Order Total: ${((totalPrice) / 100).toFixed(2)}</strong></h6>
        </div>
        <form id="checkout-form" onSubmit={this.handleSubmit}>
          <h6 className="formTitle rounded">Name</h6>
          <input className="formInput" required value={this.state.value} onChange={this.handleNameChange} input="text"/>
          <h6 className="formTitle pt-4 rounded">Credit Card</h6>
          <input className="formInput" required value={this.state.value} onChange={this.handleCreditCardChange} type="text"/>
          <h6 className="formTitle pt-4 rounded">Shipping Address</h6>
          <textarea className="formInput formTextArea" required value={this.state.value} onChange={this.handleShippingAddressChange} input="text"></textarea>
          <div className="formFooter pt-3">
            <div className="backToCatalog mb-3 text-muted" onClick={() => this.props.setViewFunction('catalog', {})}><i className="fas fa-angle-left"></i> Continue Shopping</div>
            <button className="formSubmit  btn btn-primary" type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
