import React from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBLink,
} from "mdbreact";
import NavBar from "../LandingPage/NavBar";
import Fade from "react-reveal/Fade";
import backgroundimg from "./img.jpg";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      confirmemail: "",
      errors: {},

      valid: false,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getLoginData = this.getLoginData.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.onFormSubmit(e);
    if (this.state.valid) {
      axios
        .post("/users/register", {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        })
        .then((res) => {
          const mes = res.data;
          if (mes === "") {
            alert("Email id is already registered. Sign in");
            this.props.history.push(`/SignIn`);
          } else {
            alert("Successfully Registered");
            this.props.history.push(`/SignIn`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // register(newUser).then((res) => {
      //   this.props.history.push(`/SignIn`);
      // });
    }
  }
  getLoginData = (value, type) =>
    this.setState({
      [type]: value,
    });

  onFormSubmit = (e) => {
    e.preventDefault();
    const { username, password, email, confirmemail } = this.state;
    const validEmailRegex = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    const validName = RegExp(/^([\w]{3,})+\s+([\w\s]{3,})+$/i);
    if (!validEmailRegex.test(email)) {
      alert("Type a valid email id");
    } else if (validName.test(username)) {
      alert("Type a valid username. Fullname with first name and last name seperated by space and atleast of length 3 each");
    } else if (password.length < 5) {
      alert("Password should be of atleast 5 characters length");
    } else if (email !== confirmemail) {
      alert("Email id does not match");
    } else {
      this.setState({ valid: true });
    }
  };

  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${backgroundimg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no - repeat",
          backgroundSize: "cover",
        }}
      >
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
                        Sign Up
                      </h3>
                    </MDBRow>
                  </div>
                  <MDBCardBody>
                    <form noValidate onSubmit={this.onSubmit}>
                      <div className="grey-text">
                        <MDBInput
                          label="Your full name"
                          icon="user"
                          group
                          type="text"
                          validate
                          // defaultValue={this.state.username}
                          // onChange={this.onChange}
                          getValue={(value) =>
                            this.getLoginData(value, "username")
                          }
                        />
                        <MDBInput
                          label="Your email"
                          icon="envelope"
                          group
                          type="email"
                          validate
                          //defaultValue={this.state.email}
                          // onChange={this.onChange}
                          getValue={(value) =>
                            this.getLoginData(value, "email")
                          }
                        />
                        <MDBInput
                          label="Confirm your email"
                          icon="exclamation-triangle"
                          group
                          type="email"
                          validate
                          //defaultValue={this.state.cemail}
                          // onChange={this.onChange}
                          getValue={(value) =>
                            this.getLoginData(value, "confirmemail")
                          }
                        />
                        <MDBInput
                          label="Your password"
                          icon="lock"
                          group
                          type="password"
                          validate
                          containerClass="mb-0"
                          // defaultValue={this.state.password}
                          // onChange={this.onChange}
                          getValue={(value) =>
                            this.getLoginData(value, "password")
                          }
                        />

                        <div className="text-center">
                          Already Registered?
                          <MDBLink to="SignIn">Sign In</MDBLink>
                        </div>

                        {/* <div className="text-center">
                          or Sign in with:
                          <a href="https://myaccount.google.com/">
                            <MDBBtn
                              type="button"
                              gradient="blue"
                              rounded="true"
                              className="mr-md-3 z-depth-1a"
                            >
                              <MDBIcon
                                fab
                                icon="google-plus-g"
                                className="white-text text-center "
                              />
                            </MDBBtn>
                          </a>
                        </div> */}

                        <div className="text-center">
                          <MDBBtn
                            type="submit"
                            gradient="blue"
                            className="btn-block z-depth-1a white-text font-weight-bold"
                            onClick={this.onSubmit}
                          >
                            Register
                          </MDBBtn>
                        </div>
                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </Fade>
      </div>
    );
  }
}

export default SignUp;
