import React from 'react';

export default class DemoModal extends React.Component {

  render() {

    return (
      // <h1 onClick={() => this.props.handleDemoFunction()}>Hello</h1>
      <div className="demoContainer">
        <div className="demoModal">
          <h1>By Accepting, I understand that this is a demo</h1>
        </div>
      </div>
    );
  }
}
