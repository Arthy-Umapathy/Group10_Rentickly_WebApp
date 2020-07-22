import React, { Component, Fragment } from "react";
import NavBar from "../LandingPage/NavBar";
import Fade from "react-reveal/Fade";
import img from "./contact.jpg";
// import Footer from "../Footer/Footer";
import {
  MDBContainer,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdbreact";

class Help extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      message: "",
      email: "",
    };
  }

  getLoginData = (value, type) =>
    this.setState({
      [type]: value,
    });

  onFormSubmit = (e) => {
    e.preventDefault();
    const { userName, message, email } = this.state;
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    if (userName.length <= 1) {
      alert("Type a valid username");
    } else if (!validEmailRegex.test(email)) {
      alert("Type a valid emailid");
    } else {
      alert("Successfully logged in");
    }
  };
  render() {
    return (
      <div>
        <div
          style={{
            backgroundImage: `url(${img})`,
            height: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no - repeat",
            backgroundSize: "cover",
            display: "block",
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
                          Contact Us
                        </h3>
                      </MDBRow>
                    </div>
                    <MDBCardBody>
                      <div className="card-body px-md-8 pt-10 ">
                        <form
                          className="text-center"
                          onSubmit={this.onFormSubmit}
                        >
                          <div className="md-form mt-3">
                            <MDBInput
                              type="text"
                              label="Name"
                              id="materialContactFormName"
                              className="form-control"
                              getValue={(value) =>
                                this.getLoginData(value, "userName")
                              }
                            />
                          </div>

                          <div className="md-form">
                            <MDBInput
                              type="email"
                              label="E-mail"
                              id="materialContactFormEmail"
                              className="form-control"
                              getValue={(value) =>
                                this.getLoginData(value, "email")
                              }
                            />
                          </div>

                          <span>Subject</span>
                          <select className="mdb-select">
                            <option value="" disabled>
                              Choose option
                            </option>
                            <option value="1" selected>
                              Feedback
                            </option>
                            <option value="2">Report a bug</option>
                            <option value="3">Feature request</option>
                          </select>

                          <div className="md-form">
                            <textarea
                              id="materialContactFormMessage"
                              placeholder="Message"
                              className="form-control md-textarea"
                              rows="3"
                              getValue={(value) =>
                                this.getLoginData(value, "message")
                              }
                            ></textarea>
                          </div>

                          <MDBBtn
                            type="button"
                            gradient="blue"
                            className="btn-block z-depth-1a white-text font-weight-bold"
                            onClick={this.onFormSubmit}
                          >
                            Send
                          </MDBBtn>
                        </form>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <br />
            <br />
          </Fade>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}
export default Help;