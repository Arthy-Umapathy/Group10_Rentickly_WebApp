import React, { Fragment } from "react";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import NavBar from "./NavBar";
import Fade from "react-reveal/Fade";
import axios from "axios";

class Resetpassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      newpwd: "",
      confirmpwd: "",
      valid: false,
    };
    this.getLoginData = this.getLoginData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getLoginData = (value, type) =>
    this.setState({
      [type]: value,
    });
  onSubmit(e) {
    e.preventDefault();
    this.onFormSubmit(e);
    if (this.state.valid) {
      axios
        .post("/users/resetpwd", {
          email: this.state.email,
          newpwd: this.state.newpwd,
        })
        .then((res) => {
          alert("Reset Successfull");
          this.props.history.push(`/SignIn`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.props.history.push(`/Resetpassword`);
    }
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    const { newpwd, confirmpwd } = this.state;
    if (newpwd < 5) {
      alert("Password should be of atleast 5 characters length");
    } else if (newpwd !== confirmpwd) {
      alert("Passwords don't match");
    } else {
      this.setState({ valid: true });
    }
  };

  render() {
    return (
      <Fragment>
        <NavBar />
        <br />
        <Fade left>
          <MDBContainer>
            <MDBRow className="d-flex justify-content-center">
              <MDBCol md="6">
                <MDBCard>
                  <div className="header pt-3 blue-gradient">
                    <MDBRow className="d-flex justify-content-center">
                      <h3 className="white-text mb-3 pt-3 font-weight-bold">
                        Resetpassword
                      </h3>
                    </MDBRow>
                  </div>
                  <MDBCardBody>
                    <form noValidate onSubmit={this.onSubmit}>
                      <div className="grey-text">
                        <MDBInput
                          label="Type your email"
                          icon="envelope"
                          // defaultValue={this.state.email}
                          // onChange={(e) => this.onChange(e)}
                          group
                          type="text"
                          validate
                          getValue={(value) =>
                            this.getLoginData(value, "email")
                          }
                        />
                        <MDBInput
                          label="Type new password"
                          icon="envelope"
                          group
                          type="password"
                          validate
                          getValue={(value) =>
                            this.getLoginData(value, "newpwd")
                          }
                        />
                        <MDBInput
                          label="Confirm password"
                          icon="lock"
                          group
                          type="password"
                          validate
                          getValue={(value) =>
                            this.getLoginData(value, "confirmpwd")
                          }
                        />
                      </div>
                      <div className="text-center py-4 mt-3">
                        <MDBBtn
                          type="submit"
                          gradient="blue"
                          className="btn-block z-depth-1a white-text font-weight-bold"
                          onClick={this.onSubmit}
                        >
                          Reset
                        </MDBBtn>
                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <br />
        </Fade>
      </Fragment>
    );
  }
}

export default Resetpassword;
