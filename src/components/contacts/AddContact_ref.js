import React, { Component } from "react";

class AddContact extends Component {
  constructor(props) {
    super();
    this.nameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
  }
  onSubmit = e => {
    e.preventDefault();
    const contact = {
      name: this.nameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value
    };
    console.log(contact);
  };

  static defaultProps = {
    name: "hossein tabatabaei",
    email: "example@yahoo.com",
    phone: "989138938603"
  };

  render() {
    const { name, email, phone } = this.props;
    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="name"></label>
              <input
                className="form-control form-control-lg"
                type="text"
                name="name"
                placeholder="Enter Name"
                value={name}
                ref={this.nameInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email"></label>
              <input
                className="form-control form-control-lg"
                type="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                ref={this.emailInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone"></label>
              <input
                className="form-control form-control-lg"
                type="text"
                name="phone"
                placeholder="Enter Phone Number"
                value={phone}
                ref={this.phoneInput}
              />
            </div>
            <input
              type="submit"
              className="btn btn-block btn-danger"
              value="Add Contact"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default AddContact;
