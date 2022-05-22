import React from "react";
import { Navigate } from "react-router-dom";
import "../stylesheets/class.css";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class CreatePost extends React.Component {
  state = {
    subject: "",
    body: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    let body = {
      classId: window.location.href.split(
        "http://localhost:3000/classpage/?"
      )[1],
      subject: this.state.subject,
      body: this.state.body,
    };
    console.log(body);
    let response = await fetch("http://localhost:8000/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    response = await response.json();
    console.log(response.status);

    this.setState({ subject: "", description: "", classId: "" });
  };

  fileInput = async (event) => {
    let file = event.target.files[0];
    console.log(file);

    let base64_file = await getBase64(file);

    console.log(base64_file);
    let data = {
      audio: {
        content: base64_file,
      },
    };

    let response = await fetch("http://localhost:8000/transcribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    response = await response.json();

    this.setState({ body: response["transcribed"]["transcript"] });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="input">
        <div className="ranText">Create a post:</div>
        <textarea
          value={this.state.subject}
          placeholder="subject"
          onChange={(event) => {
            this.setState({ subject: event.target.value });
          }}
        ></textarea>
        <textarea
          value={this.state.body}
          placeholder="body"
          onChange={(event) => {
            this.setState({ body: event.target.value });
          }}
        ></textarea>
        <button className="buttonSubmit" onClick={this.handleSubmit}>
          Submit
        </button>
        <input
          className="submitAudio"
          type="file"
          onInput={this.fileInput}
          accept="audio/*"
        ></input>
      </form>
    );
  }
}
