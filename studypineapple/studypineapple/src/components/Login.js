import React from "react";
import { Navigate } from "react-router-dom";
import { setCookieValue } from "./utility";

const ADDRESS = "http://localhost:8000";

export default class Login extends React.Component {
  state = {
    username: "",
    redirect: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let body = { username: this.state.username };
    setCookieValue("username", this.state.username, 86400 * 40);
    this.setState({ redirect: "/dashboard" });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit} className="input">
          <input
            type="text"
            value={this.state.username}
            className="mid"
            placeholder="Username"
            onChange={(event) => {
              this.setState({ username: event.target.value });
            }}
          ></input>
          <button onClick={this.handleSubmit}>Login</button>
        </form>
        {/*  <h2>Don't have an account! <a href="/signup">Sign Up</a></h2>*/}
      </div>
    );
  }
}
