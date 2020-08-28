import "../../App.css";
import axios from 'axios';
import { Card, Row, Col, Button } from 'react-bootstrap';
import React, {Component} from 'react'
import  {Link} from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Record = props => (
  <Col className="col-md-2">
    <div className="thumbnail"></div>
    <p className = "title" ><b>Artist Name</b>< /p>
      <p>{props.record.record_title}</p>
      <p>{props.record.record_artist}</p>
    <br/>
    </Col>
)

class ViewRecord extends React.Component {
  constructor(props) {
    console.log("View Record called");
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      record: {},
      _id : this.props.match.params.id
    };
  }

  componentDidMount() {
    fetch(`http://localhost:5000/records/`).then(res => res.json())
    // Loops through array of matches and filters by the title passed in through props
      .then(json => {
          this.setState({
            record: json.filter(record => record._id === this.state._id)
          });
          console.log(this.state.record);
      })
      .catch(function (error) {
          console.log(error);
      })
  }

  record() {
    return this.state.records.map(function(currentRecord, i) {
      return <Record record={currentRecord} key={i} />;
    });
  }

  delete(id) {
        console.log("deleting");

        axios.delete(`http://localhost:5000/records/delete/`+id)
            .then(response => {
                console.log(response);
                let records = this.state.records;
                let index = -1
                let counter = 0;
                for (let record of records) {
                    if (record._id === id) {
                        index = counter;
                        break
                    }
                    counter++;
                }

                if (index !== -1) {
                    records.splice(index, 1);
                    this.setState({
                        records: records
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    // Function to return to previous page
    goBack() {
      this.props.history.goBack();
    }

  render() {
  const { user } = this.props.auth;
  if (this.state.record[0]!==undefined) {
    console.log(this.state.record[0].record_title);
    console.log(this.state.record[0].record_artist);
  }


  let deleteButton;
  let editButton;

  if (this.state.record[0]!==undefined) {
    if (this.state.record[0].record_owner===this.props.auth.user.id) {
      deleteButton = <Button variant="outline-danger" className="delete-button"
        onClick={() => {
          this.delete(this.state.record[0]._id);
          this.props.history.push('/dashboard');
          }
          }
          >Delete</Button>;
      editButton =<Button variant="outline-primary" href={"/edit/"+this.state.record[0]._id} className="edit-button"> Edit </Button>
    } else {
      deleteButton = <Button variant = "outline-danger" onClick={this.goBack} className="delete-button"> Go Back </Button>;
      editButton = <Button variant = "outline-primary" href={'mailto:' + this.state.record[0].record_owner_email + '?Subject=MixHub%20Offer'} target='_blank' className="edit-button"> Send Email </Button>
    }

  } else{
    deleteButton = <div></div>;
    editButton = <div></div>
  }


  if (this.props.auth.isAuthenticated && this.state.record[0]!==undefined) {
  return (
    <div className="bg11">
    <br/><br/>
    <Row>
    <p className = "view-header" ><b>{ this.state.record[0].record_title }</b>< /p>
    </Row>
    <Card className="alter-card" text="white" style={{width: '37rem', height: '345px'}}>
    <Row style={{margin: '0'}}>
      <Col>
        <div>
        <img className="profile-image" src={`http://localhost:5000/uploads/${this.state.record[0].record_image}`} height="148px" width="148px" alt="test" />
        </div>
      </Col>
      <Col>
      <Row>
      <div className="view-record-text">
      <p className="v-subtext"><p className="price"><b>Asking Price: € { this.state.record[0].record_price }</b></p></p>
      <p className="v-subtext"><p className="username"><b>Artist:</b> { this.state.record[0].record_artist } | <b>Size:</b> { this.state.record[0].record_size }“</p></p>
      <p className="v-subtext"><p className="username"><b>Genre:</b> { this.state.record[0].record_genre } | <b>Type: </b> { this.state.record[0].record_type }</p></p><br/>
      <p className="v-subtext"><p className="username">{ this.state.record[0].record_description.substring(0, 95) }...</p></p><br/>

  <p className="v-subtext"><p className="usertext">• Seller: <b>{ this.state.record[0].record_owner_name }</b></p></p>
  <p className="v-subtext"><p className="usertext">• Listed: <i>{ this.state.record[0].date.substring(0,10) }</i> | <i>{ this.state.record[0].record_owner_location }</i></p></p>
      </div>
      </Row>
      </Col>
    </Row>
    <Row className="button-row">
    {deleteButton}
    {editButton}
    </Row>
    </Card>

 <br/><br/><br/><br/>
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
}else {
  return (<div></div>);
}
  }
  }

ViewRecord.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(ViewRecord);
