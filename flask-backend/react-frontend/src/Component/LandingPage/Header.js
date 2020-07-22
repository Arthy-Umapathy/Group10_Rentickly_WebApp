import React from "react";
import Body from "./Body/Body";

import { MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";
// import { browserHistory } from "react-router";
import Bounce from "react-reveal/Flip";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {};
    //this.handleClick = this.handleClick.bind(this);
  }

//   handleClick(event) {
//     event.preventDefault();
//     browserHistory.push("/SignIn");
//   }

  render() {
    return (
      <header
        className="jumbotron  text-center"
        style={{ marginBottom: 0, backgroundColor: "whitesmoke" }}
      >
        <Bounce Flip>
          <h1> Rentickly </h1>
        </Bounce>
        <p>
          Get your property <b>Quickly</b> with <b>Rentickly</b>
        </p>
        <div>
          <Link to="/SignIn">
            <MDBBtn
              type="button"
              gradient="blue"
              rounded
              className="btn-block z-depth-1a"
            >
              Sign In
            </MDBBtn>
          </Link>
        </div>
        <Body />
      </header>
    );
  }
}
export default Header;
