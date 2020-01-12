import React, { Component } from "react";

class test extends Component {
  state = { userId: "", id: "", title: "", body: "" };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => response.json())
      .then(data =>
        this.setState({
          userId: data.userId,
          id: data.id,
          title: data.title,
          body: data.body
        })
      );
  }
  render() {
    const { userId, id, title, body } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    );
  }
}

export default test;
