import React from "react";
import "../stylesheets/home.css";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <body>
          <h1 className="text">Welcome to StudyPineapple!🍍</h1>
        </body>
        <div>
          <div className="cd1">
            <span className="c1"></span>
          </div>
          <div className="cd2">
            <span className="c2"></span>
          </div>
          <div className="cd3">
            <span className="c3"></span>
          </div>
          <div className="cd4">
            <span className="c4"></span>
          </div>
        </div>
      </div>
    );
  }
}
