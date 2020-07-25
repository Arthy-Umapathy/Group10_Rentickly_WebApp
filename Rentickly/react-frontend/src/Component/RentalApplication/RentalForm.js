import React, { Component } from "react";
import "./RentalForm.css";
import axios from "axios";
import NavBar from "../LandingPage/NavBar";

export default class RentalForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: null,
      lastname: null,
      email: null,
      phone: null,
      dob: null,
      status: null,
      employer: null,
      income: null,
      files: null,
    };
  }
  firstName = (firstname) => {
    this.setState({ firstname: firstname });
  };

  lastName = (lastname) => {
    this.setState({ lastname: lastname });
  };

  Email = (email) => {
    this.setState({ email: email });
  };

  Phone = (phone) => {
    this.setState({ phone: phone });
  };

  DOB = (dob) => {
    this.setState({ dob: dob });
  };

  Status = (status) => {
    this.setState({ status: status });
  };

  Employer = (employer) => {
    this.setState({ employer: employer });
  };

  Income = (income) => {
    this.setState({ income: income });
  };

  Files = (files) => {
    this.setState({ files: files });
  };

  handleSubmit = () => {
    axios.post("http://localhost:5000/rentalForm", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": "POST",
      },
      data: {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        phone: this.state.phone,
        dob: this.state.dob,
        status: this.state.status,
        employer: this.state.employer,
        income: this.state.income,
        files: this.state.files,
      },
    });

    this.props.history.push("/myapps");
  };

  render() {
    return (
      <div>
        <NavBar />

        <div
          class="container"
          style={{
            display: "flex",
            marginTop: "50px",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <form class="form-horizontal">
            <h3>Rental Application Form</h3>
            <p>
              For Inquiries about the rental property, please contact property
              manager at:<br></br>
              Phone: (902) 123-4567
            </p>
            <div class="form-group">
              <label for="firstName" class="col-sm-3 control-label">
                First Name*
              </label>
              <div class="col-sm-15">
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  class="form-control"
                  autofocus
                  onChange={(e) => this.firstName(e.target.value)}
                  name="firstname"
                  required
                />
              </div>
            </div>
            <br></br>
            <div class="form-group">
              <label for="lastName" class="col-sm-3 control-label">
                Last Name*
              </label>
              <div class="col-sm-15">
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  class="form-control"
                  autofocus
                  onChange={(e) => this.lastName(e.target.value)}
                  name="lastname"
                  required
                />
              </div>
            </div>
            <br></br>
            <div class="form-group">
              <label for="email" class="col-sm-3 control-label">
                Email*{" "}
              </label>
              <div class="col-sm-15">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  class="form-control"
                  onChange={(e) => this.Email(e.target.value)}
                  name="email"
                  required
                />
              </div>
            </div>
            <br></br>
            <div class="form-group">
              <label for="phone" class="col-sm-3 control-label">
                Phone*
              </label>
              <div class="col-sm-15">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="123-456-7890"
                  onChange={(e) => this.Phone(e.target.value)}
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  required
                  class="form-control"
                />
              </div>
            </div>
            <br></br>
            <div class="form-group">
              <label for="birthDate" class="col-sm-3 control-label">
                Date of Birth*
              </label>
              <div class="col-sm-15">
                <input
                  type="date"
                  id="birthDate"
                  class="form-control"
                  onChange={(e) => this.DOB(e.target.value)}
                  name="dob"
                />
              </div>
            </div>
            <br></br>
            <div class="form-group">
              <label class="control-label col-sm-3">Employment Status</label>
              <div class="col-sm-15">
                <div class="row">
                  <div class="col-sm-6">
                    <label class="radio-inline">
                      <input
                        type="radio"
                        id="fulltimeRadio"
                        onChange={(e) => this.Status(e.target.value)}
                        value="fulltime"
                        name="status"
                      />
                      Full-time
                    </label>
                  </div>
                  <div class="col-sm-6">
                    <label class="radio-inline">
                      <input
                        type="radio"
                        id="parttimeRadio"
                        value="parttime"
                        onChange={(e) => this.Status(e.target.value)}
                        name="status"
                      />
                      Part-time
                    </label>
                  </div>
                  <div class="col-sm-6">
                    <label class="radio-inline">
                      <input
                        type="radio"
                        id="studentRadio"
                        value="Student"
                        name="status"
                        onChange={(e) => this.Status(e.target.value)}
                      />
                      Student
                    </label>
                  </div>
                  <div class="col-sm-6">
                    <label class="radio-inline">
                      <input
                        type="radio"
                        id="retiredRadio"
                        value="retired"
                        name="status"
                        onChange={(e) => this.Status(e.target.value)}
                      />
                      Retired
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <div class="form-group">
              <label for="Employer" class="col-sm-3 control-label">
                Current Employer
              </label>
              <div class="col-sm-15">
                <input
                  type="text"
                  id="employer"
                  placeholder="Employer Name"
                  onChange={(e) => this.Employer(e.target.value)}
                  class="form-control"
                  autofocus
                  name="employer"
                />
              </div>
            </div>
            <br></br>
            <div class="form-group">
              <label for="income" class="col-sm-3 control-label">
                Monthly Income
              </label>
              <div class="col-sm-15">
                <input
                  type="text"
                  id="income"
                  placeholder="Income"
                  class="form-control"
                  onChange={(e) => this.Income(e.target.value)}
                  autofocus
                  name="income"
                />
              </div>
            </div>
            <br></br>
            <div class="form-group">
              <label for="myfile" class="col-sm-9 control-label">
                Add Documents such as proof of income, valid admission letter,
                proof of address, etc. <br></br>
                Select file:
              </label>

              <input
                type="file"
                id="myfile"
                name="files"
                onChange={(e) => this.Files(e.target.value)}
              />
            </div>
            <br></br>
            <div class="form-group">
              <div class="col-sm-15 col-sm-offset-3">
                <b>
                  <span class="help-block">*Required fields</span>
                </b>
              </div>
            </div>
            <br></br>

            <div class="form-group">
              <label for="myfile" class="col-sm-3 control-label">
                Additional Information<br></br>
              </label>
              <p>
                The Landlord does not allow smoking of cigarettes in the rental
                property.
              </p>
              <p>The rental property includes 1 parking space.</p>
              <br></br>
              <p>
                I declare that the Information I have provided is true and
                correct, and contain no representation.
              </p>
            </div>
            <br></br>
            <button
              type="submit"
              class="btn btn-primary btn-block"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </form>
          <br></br>
        </div>
      </div>
    );
  }
}
