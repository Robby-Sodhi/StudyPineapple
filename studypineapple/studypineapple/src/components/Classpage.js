import React from "react";
import CreatePost from "./CreatePost";
import "../stylesheets/class.css";
import { Navigate } from "react-router-dom";
export default class Classpage extends React.Component {
  state = {
    classId: null,
    data: [],
    redirect: "",
  };

  async componentDidMount() {
    let url = window.location.href;
    let id = url.split("http://localhost:3000/classpage/?")[1];
    console.log(id);
    if (!id) {
      this.setState({ redirect: "/dashboard" });
    }
    this.setState({ classId: id }, async () => {
      let body = JSON.stringify({ classId: this.state.classId });

      console.log(body);
      let response = await fetch("http://localhost:8000/getPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      response = await response.json();

      this.setState({ data: response });
      console.log(this.state.data);
    });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }
    return (
      <div>
        <CreatePost />
        {this.state.data.map((element) => {
          return (
            <div className="wrapper">
              <div className="date">{element.date}</div>
              <div className="subject">{element.subject}</div>
              <div className="description">{element.description}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
