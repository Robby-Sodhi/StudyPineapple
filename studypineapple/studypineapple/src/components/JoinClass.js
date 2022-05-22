import React from "react";
import { getCookieValue } from "./utility";
import "../stylesheets/index.css";

export default class JoinClass extends React.Component {
  state = {
    classId: "",
    redirect: "",
  };

  handleSubmit = async () => {
    if (!getCookieValue("username")) {
      this.setState({ redirect: "/login" });
      return;
    }

    let body = {
      username: getCookieValue("username"),
      classId: this.state.classId,
    };

    let response = await fetch("http://localhost:8000/joinClass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    response = await response.json();

    console.log(response);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="input">
          <div className="centered">Join a class:</div>
          <input
            type="text"
            value={this.state.classId}
            placeholder="classId"
            onChange={(event) => {
              this.setState({ classId: event.target.value });
            }}
          ></input>
          <button className="btnCentered" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
