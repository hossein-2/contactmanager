import React, { Component } from "react";
import { Consumer } from "../../Context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phoneNumber: "",
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phoneNumber: contact.phoneNumber
    });
  }

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

    const updContact = { name, email, phoneNumber };
    const { id } = this.props.match.params;
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );

    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

    // clear state
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
              <div className="card-header">Edit Contact</div>
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
                    value="Update Contact"
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

export default EditContact;
