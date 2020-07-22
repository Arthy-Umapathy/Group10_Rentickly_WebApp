import React, { Component } from "react";
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
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import img from "./img2.jpg";
// import { login } from "../UserAPI";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      valid: false,
    };
    this.getLoginData = this.getLoginData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // onChange(e) {
  //   this.setState({ [e.target.name]: e.target.value });
  // }

  onSubmit(e) {
    e.preventDefault();
    this.onFormSubmit(e);
    if (this.state.valid) {
      // const user = {
      //   email: this.state.email,
      //   password: this.state.password
      // };
      axios
        .post("/users/login", {
          email: this.state.email,
          password: this.state.password,
        })
        .then((res) => {
          if (res.data) {
            localStorage.setItem("access_token", JSON.stringify(res.data));
            console.log(res.data)
            console.log("loggedin");
            this.props.history.push(`/Profile`);
          } else {
            console.log(res.data)
            alert("Register to sign in");
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // login(user).then((res) => {
      //   if (!res.error) {
      //     this.props.history.push(`/Profile`);
      //   }
      // });
    }
  }

  getLoginData = (value, type) =>
    this.setState({
      [type]: value,
    });

  onFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const validEmailRegex = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    if (!validEmailRegex.test(email)) {
      alert("Type a valid email id");
    } else if (password.length < 5) {
      alert("Password should be of atleast 5 characters length");
    } else {
      this.setState({ valid: true });
    }
  };
  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${img})`,
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
                        Sign in
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
                          label="Type your password"
                          icon="lock"
                          // defaultValue={this.state.password}
                          // onChange={(e) => this.onChange(e)}
                          group
                          type="password"
                          validate
                          getValue={(value) =>
                            this.getLoginData(value, "password")
                          }
                        />
                        <h5 className="font-small blue-text d-flex justify-content-end pb-3">
                          Forgot
                          <Link to="/Resetpassword" className="blue-text ml-1">
                            Password?
                          </Link>
                        </h5>
                        <div className="text-center">
                          New User?<MDBLink to="SignUp">Sign Up</MDBLink>
                        </div>
                      </div>
                      <div className="text-center py-4 mt-3">
                        <MDBBtn
                          type="submit"
                          gradient="blue"
                          className="btn-block z-depth-1a white-text font-weight-bold"
                          onClick={this.onSubmit}
                        >
                          Sign in
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
      </div>
    );
  }
}

export default SignIn;
