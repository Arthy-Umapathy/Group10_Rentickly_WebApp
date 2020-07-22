import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./RentalApplication.css";
import NavBar from "../LandingPage/NavBar";
// import Footer from "../Footer/Footer"

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const nameRegex = RegExp(/^[A-Z][-'a-zA-Z\s]{2,16}$/);

const formValid = (
  formErrors,
  firstName,
  lastName,
  email,
  startDate,
  myFile
) => {
  let valid = true;
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  if (
    firstName === null ||
    lastName === null ||
    email === null ||
    startDate == null ||
    myFile == null
  ) {
    valid = false;
  }
  return valid;
};

class RentalApplication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      redirect: false,
      startDate: null,
      myFile: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        startDate: "",
      },
    };
  }

  onKeyPress(event) {
    if (event.charCode >= 48 && event.charCode <= 57) {
      alert("Only alphabets are allowed");
      event.preventDefault();
    }
  }

  noSpace(event) {
    if (event.charCode === 32) {
      alert("Cannot insert spaces");
      event.preventDefault();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (
      formValid(
        this.state.formErrors,
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.startDate,
        this.state.myFile
      )
    ) {
      console.log(`
        --Submitting--
        First Name : ${this.state.firstName}
        Last Name : ${this.state.lastName}
        Email : ${this.state.email}
        Date : ${this.state.startDate}
        File : ${this.state.myFile}
        `);
      this.setState({
        redirect: true,
      });
      alert("Rental application submitted successfully");
    } else {
      alert("Enter valid details. Application submission failed");
      console.error(` Form Invalid `);
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    let formErrors = this.state.formErrors;

    switch (name) {
      case "firstName":
        formErrors.firstName = nameRegex.test(value)
          ? ""
          : "Enter a valid name. 1)First letter of the name should be capital. 2)Should not contain numbers. 3)Name should not start with space";
        break;
      case "lastName":
        formErrors.lastName = nameRegex.test(value)
          ? ""
          : "Enter a valid name. 1)First letter of the name should be capital. 2)Should not contain numbers. 3)Name should not start with space";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address. Enter valid email like: am23@gmail.com";
        break;
      case "startDate":
        var today = new Date();
        formErrors.startDate =
          value.split("-")[0] < today.getFullYear() ||
          value.split("-")[1] < today.getMonth() ||
          value.split("-")[2] < today.getDate()
            ? "Please input a valid date"
            : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  clearAll = () => {
    this.setState({
      firstName: null,
      lastName: null,
      email: null,
      startDate: null,
      redirect: false,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        startDate: "",
      },
    });
    document.getElementById("registration-form").reset();
  };

  render() {
    const { formErrors } = this.state;
    const redirect = this.state.redirect;

    if (redirect === true) {
      return <Redirect to="/LoginPage" />;
    }

    return (
      <div>
        <NavBar />

        <div className="wrapper">
          <div className="form-wrapper">
            <h1>Rental application</h1>
            <form
              id="registration-form"
              onSubmit={this.handleSubmit}
              noValidate
            >
              <div className="firstName">
                <label htmlFor="firstName">First Name</label>
                <input
                  className={formErrors.firstName.length > 0 ? "error" : null}
                  placeholder="First Name"
                  type="text"
                  onKeyPress={(event) => this.onKeyPress(event)}
                  name="firstName"
                  maxLength="16"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.firstName.length > 0 && (
                  <span className="errorMessage">{formErrors.firstName}</span>
                )}
              </div>
              <div className="lastName">
                <label htmlFor="lastName">Last Name</label>
                <input
                  className={formErrors.lastName.length > 0 ? "error" : null}
                  placeholder="Last Name"
                  type="text"
                  onKeyPress={(event) => this.onKeyPress(event)}
                  name="lastName"
                  maxLength="16"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.lastName.length > 0 && (
                  <span className="errorMessage">{formErrors.lastName}</span>
                )}
              </div>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  className={formErrors.email.length > 0 ? "error" : null}
                  placeholder="Email"
                  type="email"
                  onKeyPress={(event) => this.noSpace(event)}
                  name="email"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
              <div className="date">
                <label htmlFor="date">Expected Move-in Date</label>
                <input
                  placeholder="Date"
                  type="date"
                  name="startDate"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.startDate.length > 0 && (
                  <span className="errorMessage">{formErrors.startDate}</span>
                )}
              </div>
              <div className="myFile">
                <label htmlFor="myFile">Upload File</label>
                <input
                  placeholder="myFile"
                  type="file"
                  name="myFile"
                  multiple
                  noValidate
                  onChange={this.handleChange}
                />
              </div>
              <div className="submitApplication">
                <button type="submit">Submit Application</button>
                <button
                  type="button"
                  name="clearAll"
                  value="cancel"
                  onClick={this.clearAll}
                >
                  Clear All
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* <Footer/> */}
      </div>
    );
  }
}
export default RentalApplication;