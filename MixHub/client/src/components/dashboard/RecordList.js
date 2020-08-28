import { Card, Row, Col, Button } from 'react-bootstrap';
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../App.css";

const Record = props => (

  <Col className="col-md-2">
    <div class="thumbnail">
     <Link to={{pathname: `/ViewRecord/${props.record._id}`}}>
       <img src={`http://localhost:5000/uploads/${props.record.record_image}`} height="148px" width="148px" alt="test" />
     </Link>
    </div>
      <p class="title"><b>{props.record.record_title}</b></p>
      <p className = "title" >{props.record.record_artist}< /p><br/>
    <br/>
    </Col>
)

class RecordList extends Component {

Post = e => {
    e.preventDefault();
    const file = document.getElementById("inputGroupFile01").files;
    const formData = new FormData();

    formData.append("img", file[0]);

    fetch(process.env.REACT_APP_BACKEND_URL, {
      method: "POST",
      body: formData
    }).then(r => {
      console.log(r);
    });

    document
      .getElementById("img")
      .setAttribute("src", `http://localhost:5000/${file[0].name}`);
      console.log(file[0]);
};

constructor(props) {
  super(props);
  this.state = {
    records: [],
    search: "",
    isLoaded: false
  };
}

componentDidMount() {
  axios.get(`http://localhost:5000/records/`)
    .then(response => {
        this.setState({isLoaded: true, records: response.data});
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })
}

componentDidUpdate() {
  axios.get(`http://localhost:5000/records/`)
    .then(response => {
        this.setState({records: response.data});
    })
    .catch(function (error) {
        console.log(error);
    })
}

recordList() {
  var search= this.state.search;
  var filteredRecords = this.state.records;
  if (search !== "") {
    filteredRecords = this.state.records.filter(records => {
      // Checks if the title contains the search term
      return records.record_title.toLowerCase().indexOf(search) !== -1;
    });
  }

  return filteredRecords.reverse().map(function(currentRecord, i) {
    return <Record record={currentRecord} key={i} />;
  });
}

  onchange = e => {
    this.setState({ search: e.target.value });
    console.log(this.state.search);
  };

  removeField = e => {
            this.setState({
                item : ''
            });
          };

render() {
  var {
    isLoaded
  } = this.state;

    let recordList =[];
    if (this.state.records[0]!==undefined) {
      recordList = this.recordList();
    }

    // if (this.state.records == "") {
    //   return (
    //     <div className = "records-container">
    //     <div className = "search"><p>It seems there are no records at the moment ¯\_(ツ)_/¯</p></div>
    //     <div className = "search"><p>Add a new record by clicking <Link to="/CreateRecord"><b>HERE</b></Link>!</p></div>
    //     </div>
    //   );
    // }

    const { search } = this.state.search;

    if (!isLoaded) {
      return <div class="loader"></div>;
    } else {

    return (
      <div>
      <div className="container">
        <div style={{ marginTop: "2rem" }} className="row">
          <Card className="home-card" text="white">
          <Row className="search-row">
          <Col xs lg="11" className="keyword-col">
            <div class="input-field">
            <label class="label-icon" for="search"><i class="material-icons">search</i></label>
            <input id="search" style={{height: "48px", paddingLeft: "30px", borderBottom: "0px"}} type="search" required placeholder = "Search for album title." onChange={this.onchange}/>
            <i class="material-icons" style={{ marginTop: "10px" }} onPress={this.removeField}>close</i>
            </div>
          </Col>
          <Col className="button-col">
            <Button href="/CreateRecord" className="plus-button"><i class="material-icons plus">add</i></Button>
          </Col>
          </Row>
          </Card>
          <br /><br />
        </div>

        <Row>
        <p className = "latest" >Latest< /p>
        </Row>

        <Row>
            {recordList}
        </Row>
      </div>
      <footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Extra Content</h5>
                <p class="grey-text text-lighten-4">If you wish to learn more about MixHub and Music in general, there are
                a number a resources you can find here.</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">News & Info</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="/About">About MixHub</a></li>
                  <li><a class="grey-text text-lighten-3" href="/Discover">Dicover New Artists</a></li>
                  <li><a class="grey-text text-lighten-3" href="https://thevinylfactory.com/news/" target="_blank">The Vinyl Factory</a></li>
                  <li><a class="grey-text text-lighten-3" href="https://www.theguardian.com/music/vinyl" target="_blank">The Guardian</a></li>
                </ul>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">More Sites</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="https://www.last.fm/" target="_blank">Last FM</a></li>
                  <li><a class="grey-text text-lighten-3" href="https://www.discogs.com/" target="_blank">Disogs</a></li>
                  <li><a class="grey-text text-lighten-3" href="https://www.adverts.ie/" target="_blank">Adverts.ie</a></li>
                  <li><a class="grey-text text-lighten-3" href="https://therecordhub.com/?gclid=Cj0KCQiAwP3yBRCkARIsAABGiPpYgEnlx-HCaCs4Z_lQ17orDfBViaqy3bocda8KOGlWrIbOhkyylnUaAu4FEALw_wcB" target="_blank">The Record Hub</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            <p className="mixhub-stamp">© 2020 MixHub</p>
            <a class="grey-text text-lighten-5 right" href="https://vinyltimes.com/vinyl-links/" target="_blank">More Links</a>
            </div>
          </div>
        </footer>
    </div>
    );
  }
}
}

RecordList.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(RecordList);
