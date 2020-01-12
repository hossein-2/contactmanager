import React, { Component } from "react";
import { Consumer } from "../../Context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phoneNumber: "",
    errors: {}
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phoneNumber } = this.state;

    //check for errors
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (phoneNumber === "") {
      this.setState({ errors: { phoneNumber: "Phone is required" } });
      return;
    }

    const newContact = {
      name,
      email,
      phoneNumber
    };

    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users/",
      newContact
    );
    dispatch({ type: "ADD_CONTACT", payload: res.data });

    this.setState({ name: "", email: "", phoneNumber: "", errors: {} });

    this.props.history.push("/");
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, email, phoneNumber, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    lable="Name"
                    value={name}
                    placeholder="Enter Name..."
                    onChange={this.onChange}
                    name="name"
                    error={errors.name}
                  />
                  <TextInputGroup
                    lable="Email"
                    value={email}
                    placeholder="Enter Email..."
                    onChange={this.onChange}
                    type="email"
                    name="email"
                    error={errors.email}
                  />
                  <TextInputGroup
                    lable="Phone Number"
                    value={phoneNumber}
                    placeholder="Enter Phone Number..."
                    onChange={this.onChange}
                    name="phoneNumber"
                    error={errors.phoneNumber}
                  />
                  <input
                    type="submit"
                    className="btn btn-block btn-danger"
                    value="Add Contact"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
