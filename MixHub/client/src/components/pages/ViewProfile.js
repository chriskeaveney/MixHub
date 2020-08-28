import "../../App.css";
import { Card, Row, Col, Button } from 'react-bootstrap';
import React, {Component} from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";

const User = props => (
  <Col className="col-md-2">
    <div className="thumbnail"></div>
    <p className = "title" ><b>Artist Name</b>< /p>
      <p>{props.user.name}</p>
      <p>{props.user.email}</p>
    <br/>
    </Col>
)

class ViewProfile extends React.Component {
  constructor(props) {
    console.log("View Record called");
    super(props);
    this.state = {
      user: {},
      _id : this.props.match.params.id
    };
  }

  componentDidMount() {
    fetch(`http://localhost:5000/users/`).then(res => res.json())
    // Loops through array of matches and filters by the title passed in through props
      .then(json => {
          this.setState({
            record: json.filter(user => user._id === this.state._id)
          });
          console.log(this.state.user);
      })
      .catch(function (error) {
          console.log(error);
      })
  }

  record() {
    return this.state.users.map(function(currentUser, i) {
      return <User user={currentUser} key={i} />;
    });
  }

  render() {
  const { user } = this.props.auth;

  if (this.props.auth.isAuthenticated) {
  return (
    <div>
    <br/><br/>
    <Row>
    <p className = "search" > Profile < /p>
    </Row>
    <Card className="profile-card" text="white" style={{width: '19rem', height: '468px'}}>
    <Row style={{marginBottom: "0"}}>
        <img style={{marginLeft: "auto", marginRight: "auto"}} src="../../images/17004.png" alt="" height="230px" width="230px"></img>
      </Row>
      <Row style={{marginBottom: "0px"}}>
      <div class="profile-text">
      <p class="p-subtext"><p className="username pro"><b>Full Name : </b>{user.name.split(" ")[0]}</p></p>
      <p class="p-subtext"><p className="username pro"><b>Location : </b>{user.location}</p></p>
      <p class="p-subtext"><p className="username pro"><b>Email Address : </b>{user.email}</p></p>
      </div>
      </Row>
    <Row style={{marginBottom: "0px"}}>
    <Button variant = "outline-danger" onClick={this.goBack} className="back-button"> Go Back </Button>
    </Row>
    <Row>
    <Button href={'mailto:' + user.email + '?Subject=MixHub%20Offer'} target='_blank' variant = "outline-primary" className="send-button"> Send Email </Button>
    </Row>
    </Card>
    </div>
  );
  }
  }
  }

ViewProfile.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(ViewProfile);
