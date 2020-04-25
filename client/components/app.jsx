import React from 'react';
import Header from './header.jsx';
import ProductList from './product-list.jsx';
import ProductDetails from './product-details.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.setView = this.setView.bind(this);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header />
          <div className="container pt-5">
            <ProductList setViewFunction={this.setView} />
          </div>
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <div>
          <Header />
          <div className="container pt-5">
            <ProductDetails setViewFunction={this.setView} productId={this.state.view.params.productId} params={this.state.view.params} />
          </div>
        </div >
      );
    }
  }
}
