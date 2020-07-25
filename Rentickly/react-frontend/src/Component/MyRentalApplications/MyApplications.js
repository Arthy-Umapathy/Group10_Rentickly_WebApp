import React, { Component } from "react";
import { Table } from "react-bootstrap";
import NavBar from "../LandingPage/NavBar";

export default class MyApplications extends Component {
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

  async componentDidMount() {
    const url = "http://localhost:5000/myapplications";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ firstname: data.firstname });
    this.setState({ lastname: data.lastname });
    this.setState({ email: data.email });
    this.setState({ phone: data.phone });
    this.setState({ dob: data.dob });
    this.setState({ status: data.status });
    this.setState({ employer: data.employer });
    this.setState({ income: data.income });
    this.setState({ files: data.files });
    console.log(data);
  }

  render() {
    return (
      <div>
        <NavBar />

        <div
          style={{
            display: "flex",
            marginTop: "50px",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email </th>
                <th>Phone </th>
                <th>Date of Birth </th>
                <th>Employment Status </th>
                <th>Current Employer </th>
                <th>Monthly Income </th>
                <th>File Uploaded </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.firstname}</td>
                <td>{this.state.lastname}</td>
                <td>{this.state.email}</td>
                <td>{this.state.phone}</td>
                <td>{this.state.dob}</td>
                <td>{this.state.status}</td>
                <td>{this.state.employer}</td>
                <td>{this.state.income}</td>
                <td>{this.state.files}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
