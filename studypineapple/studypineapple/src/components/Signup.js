{
  /*
import React from "react";

export default class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    cod: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let username = { username: this.state.username };
    let response = await fetch("http://localhost:8000/getClasses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(username),
    });
    response = await response.json();
    console.log(response);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={(e) => {
              this.setState({ username: e.target.value });
            }}
          />
        </form>
      </div>
    );
  }
}
*/
}
