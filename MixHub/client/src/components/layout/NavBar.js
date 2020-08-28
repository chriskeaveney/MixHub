/**
 * @Date:   2019-10-29T13:36:54+00:00
 * @Last modified time: 2019-11-19T13:07:52+00:00
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navbar, Nav, Button, ButtonToolbar, DropdownButton, Dropdown } from 'react-bootstrap';
import { logoutUser } from "../../actions/authActions";
import { slide as Menu } from 'react-burger-menu';
import axios from 'axios';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    fetch(`http://localhost:5000/records/`)
      .then(response => {
          this.setState({records: response.data});
          console.log(response.data);
      })
      .catch(function (error) {
          console.log(error);
      })
  }

  showSettings (event) {
    event.preventDefault();
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    let form;

    if (this.props.auth.isAuthenticated) {
      form =

      <div style={{ width: "100%" }}>
        <Menu>
        <a id="home" className="menu-item" href="/About">About Us</a>
        <a id="about" className="menu-item" href="/Discover">Discover</a>
        <a id="map" className="menu-item" href="/MapContainer">Record Hub</a>
        <Link to={{pathname: `/ViewProfile/${this.props.auth.user.id}`}} id="contact" className="menu-item"><b>My Profile</b></Link>
          <Button
            style={{
              width: "100px",
              borderRadius: "3px",
              letterSpacing: "1px",
              marginLeft: "10px"
            }}
            onClick={this.onLogoutClick}
            variant="outline-danger"
          >
            Logout
          </Button>
      </Menu>
      <Nav className="mr-auto">
        <Nav.Link href="/About">About Us</Nav.Link>
        <Nav.Link href="/Discover">Discover</Nav.Link>
        <Nav.Link href="/MapContainer">Record Hub</Nav.Link>
        <i class="large material-icons">person</i>
        <Link to={{pathname: `/ViewProfile/${this.props.auth.user.id}`}} className="username"><b>{user.name.split(" ")[0]}</b></Link>
        <Button
            style={{
              width: "100px",
              borderRadius: "3px",
              letterSpacing: "1px",
              float: "right"
            }}
            onClick={this.onLogoutClick}
            variant="outline-danger"
            className="logout"
          >
            Logout
          </Button>
      </Nav>
    </div>

    } else {
      form = <p></p>;
    }

    return (
      <div className="navbar-fixed">
      <Navbar bg="light" variant="light">
        {form}
        <Link to="/dashboard" style={{ fontFamily: "monospace"}}className="brand-logo center black-text">
          MixHub
        </Link>
        <Link to="/dashboard" style={{ fontFamily: "monospace"}}className="brand-logo-2 center black-text">
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
