/**
 * @Date:   2019-10-29T13:36:54+00:00
 * @Last modified time: 2019-11-19T13:07:52+00:00
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Navbar,
  Nav,
  Button,
  ButtonToolbar,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import { logoutUser } from "../../actions/authActions";

class NavBar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    let form;

    if (this.props.auth.isAuthenticated) {
      form = (
        <Nav className="mr-auto">
          <Nav.Link href="/About">About Us</Nav.Link>
          <Nav.Link href="/Discover">Discover</Nav.Link>
          <Nav.Link href="/Profile" class="username">
            <b>{user.name.split(" ")[0]}</b>
          </Nav.Link>
          <ButtonToolbar>
            {[""].map(variant => (
              <DropdownButton
                title={variant}
                variant={variant.toLowerCase()}
                id={`dropdown-variants-${variant}`}
                key={variant}
                style={{ marginTop: "0.3rem", marginLeft: "0rem" }}
              >
                <Dropdown.Item eventKey="1" href="/Profile">
                  View Profile
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" href="/CreateRecord">
                  Add New Record
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">
                  <Button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1px"
                    }}
                    onClick={this.onLogoutClick}
                    variant="outline-danger"
                  >
                    Logout
                  </Button>
                </Dropdown.Item>
              </DropdownButton>
            ))}
          </ButtonToolbar>
        </Nav>
      );
    } else {
      form = <p />;
    }

    return (
      <div className="navbar-fixed">
        <Navbar bg="light" variant="light">
          {form}
          <Link
            to="/dashboard"
            style={{ fontFamily: "monospace" }}
            className="brand-logo center black-text"
          >
            MixHub
          </Link>
        </Navbar>
      </div>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBar);
