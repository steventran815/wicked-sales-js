import React from 'react';
import Header from './header.jsx';
import ProductList from './product-list.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container containerBackground">
          <ProductList />
        </div>
      </div>
    );
  }
}
