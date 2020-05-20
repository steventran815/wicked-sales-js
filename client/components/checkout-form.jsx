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
    this.createOrder(newOrder);
    this.setState({
      name: '',
      creditCard: '',
      shippingAddress: ''
    });
    document.getElementById('checkout-form').reset();
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
        // eslint-disable-next-line no-console
        console.log(data);
      })
      .catch(error => console.error('Error:', error));
  }

  render() {

    return (
      <form id="checkout-form" onSubmit={this.handleSubmit}>
        <input required value={this.state.value} onChange={this.handleNameChange} placeholder="Name" input="text"/>
        <input type="text" required value={this.state.value} onChange={this.handleCreditCardChange} placeholder="1234-1234-1234"/>
        <textarea required value={this.state.value} onChange={this.handleShippingAddressChange} input="text"></textarea>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
