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
    this.setState({
      name: '',
      creditCard: '',
      shippingAddress: ''
    });
    document.getElementById('checkout-form').reset();
  }

  render() {
    const newOrder = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    return (
      <form id="checkout-form" onSubmit={this.handleSubmit}>
        <input required value={this.state.value} onChange={this.handleNameChange} placeholder="Name" input="text"/>
        <input type="text" required value={this.state.value} onChange={this.handleCreditCardChange} placeholder="1234-1234-1234"/>
        <textarea required value={this.state.value} onChange={this.handleShippingAddressChange} input="text"></textarea>
        <button onClick={() => this.props.placeOrderFunction(newOrder)} type="submit">Submit</button>
        <div className="backToCatalog mb-3 text-muted" onClick={() => this.props.setViewFunction('catalog', {})}>&lt; Back to Catalog</div>
      </form>
    );
  }
}
