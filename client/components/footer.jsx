import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footerBackground">
        <footer className="container header-container p-5 d-flex justify-content-center">
          <div>
            <center>
              <img src="images/top-notch-header-logo.png"/>
              <div className=" mt-2 text-white footerContent">
                <p className="">Designed and Developed by Steven Tran<br/>© 2020 Steven Tran</p>
              </div>
            </center>
          </div>
        </footer>
      </div>
    );
  }
}
