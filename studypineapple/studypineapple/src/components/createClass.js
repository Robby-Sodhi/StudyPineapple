import React from "react";
import { getCookieValue } from "./utility";
import "../stylesheets/index.css";
import { toHaveAccessibleDescription } from "@testing-library/jest-dom/dist/matchers";

export class CreateClass extends React.Component {
  state = {
    subject: "",
    description: "",
    classId: "",
    error: false,
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    console.log(this.state);

    let body = JSON.stringify({
      subject: this.state.subject,
      description: this.state.description,
      classId: this.state.classId,
      username: getCookieValue("username"),
    });
    let response = await fetch("http://localhost:8000/createClass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    console.log(response.status);
    if (response.status == 400) {
      this.setState({ error: true });
    } else {
      window.location.reload(false);
    }

    this.setState({ subject: "", description: "", classId: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="input">
        <div className="centered">
          {this.state.error ? "Error, classId in use" : "create a class: "}
        </div>
        <input
          type="text"
          value={this.state.subject}
          placeholder="subject"
          onChange={(event) => {
            this.setState({ subject: event.target.value });
          }}
        ></input>
        <input
          type="text"
          value={this.state.description}
          placeholder="description"
          onChange={(event) => {
            this.setState({ description: event.target.value });
          }}
        ></input>
        <input
          type="text"
          value={this.state.classId}
          placeholder="classId"
          onChange={(event) => {
            this.setState({ classId: event.target.value });
          }}
        ></input>
        <button className="btnCentered" onClick={this.handleSubmit}>
          submit
        </button>
      </form>
    );
  }
}
