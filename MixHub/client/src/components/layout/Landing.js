import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row } from 'react-bootstrap';

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="landing-container valign-wrapper">
          <div className="col s12 center-align">
            <h4 class="welcome">
              <b>Welcome</b> to{" "}
              <span style={{ fontFamily: "monospace" }}>MixHub</span>
            </h4>
            <p className="flow-text grey-text text-darken-1">
              A platform for trading vinyl records
            </p>
            <br />
            <Row>
              <div className="col-md-auto" style={{ margin: "auto" }}>
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
                <p> </p>
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable white accent-3"
              >
                Register
              </Link>
                </div>
          </Row>
          <img class="home-image" src="record.png" alt="" width="500" height="500"></img>
          </div>
      </div>
    );
  }
}
export default Landing;
