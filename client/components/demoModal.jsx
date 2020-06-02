import React from 'react';

export default class DemoModal extends React.Component {

  render() {

    return (
      <div className="demoContainer">
        <div className="demoModal container">
          <h1>Hey There!</h1>
          <center><div className="descriptionDivider"></div></center>
          <h5><span>Top-Notch Tees</span> is a full-stack application built with React.js and Node/Express made <br></br><span>for demonstration purposes</span>.
            <hr className="w-100"></hr>
            By <span>accepting</span>, you are acknowledging that the merchandise displayed is not available for purchase.</h5>
          <h4>Thank you, and Enjoy!</h4>
          <button className="addToCartButton mt-2" onClick={() => this.props.handleDemoFunction()}>I ACCEPT</button>
        </div>
      </div>
    );
  }
}
