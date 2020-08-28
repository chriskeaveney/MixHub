import "../../App.css";
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import React, {Component} from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';

class EditRecord extends React.Component {
  constructor(props) {
      super(props);

      this.onChangeRecordTitle = this.onChangeRecordTitle.bind(this);
      this.onChangeRecordArtist = this.onChangeRecordArtist.bind(this);
      this.onChangeRecordDescription = this.onChangeRecordDescription.bind(this);
      this.onChangeRecordPrice = this.onChangeRecordPrice.bind(this);
      this.onChangeRecordGenre = this.onChangeRecordGenre.bind(this);
      this.onChangeRecordSize = this.onChangeRecordSize.bind(this);
      this.onChangeRecordType = this.onChangeRecordType.bind(this);
      this.onChangeRecordImage = this.onChangeRecordImage.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state= {
        record_title: '',
        record_artist: '',
        record_description: '',
        record_price: '',
        record_genre: '',
        record_size: '',
        record_type: '',
        record_image: ''
      }
    }

  componentDidMount() {
    axios.get(process.env.REACT_APP_BACKEND_URL + '/records/'+this.props.match.params.id)
      .then(response => {
          this.setState({
            record_title: response.data.record_title,
            record_artist: response.data.record_artist,
            record_description: response.data.record_description,
            record_price: response.data.record_price,
            record_genre: response.data.record_genre,
            record_size: response.data.record_size,
            record_type: response.data.record_type,
            record_image: response.data.record_image
          })
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  onChangeRecordTitle(e) {
    this.setState({
      record_title: e.target.value
    });
  }

  onChangeRecordArtist(e) {
    this.setState({
      record_artist: e.target.value
    });
  }

  onChangeRecordDescription(e) {
    this.setState({
      record_description: e.target.value
    });
  }

  onChangeRecordPrice(e) {
    this.setState({
      record_price: e.target.value
    });
  }

  onChangeRecordGenre(e) {
    this.setState({
      record_genre: e.target.value
    });
  }

  onChangeRecordSize(e) {
    this.setState({
      record_size: e.target.value
    });
  }

  onChangeRecordType(e) {
    this.setState({
      record_type: e.target.value
    });
  }

  onChangeRecordImage(e) {
    this.setState ({
        record_image: e.target.value
    });
  }

  handleFileUpload = (event) => {
    console.log(event);
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('name', 'some value user types');
    data.append('description', 'some value user types');
    // '/files' is your node.js route that triggers our middleware
    axios.post('/files', data).then((response) => {
      console.log(response); // do something with the response
      //if response message is fail replace with generic image
      const message = response.data.message;
      if (message==="Fail") {
        this.setState ({
            record_image: "blank.jpg"
        });
      } else {
        this.setState ({
            record_image: response.data.message
        });
      }

    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      record_title: this.state.record_title,
      record_artist: this.state.record_artist,
      record_description: this.state.record_description,
      record_price: this.state.record_price,
      record_genre: this.state.record_genre,
      record_size: this.state.record_size,
      record_type: this.state.record_type,
      record_image: this.state.record_image
    };

    axios.post('http://localhost:5000/records/update/'+this.props.match.params.id, obj)
      .then(res => console.log(res.data));

    this.props.history.push('/dashboard');
  }

  render() {

  if (this.props.auth.isAuthenticated) {
  return(
          <div style={{marginTop: "30px"}}>
            <Card className="create-card" text="white" style={{height: '671px'}}>
            <Row style={{ marginTop: "2rem" }}>
              <Col>
              <h4 className="form-header">
                <b>Edit Record</b>
              </h4>
              <form onSubmit={this.onSubmit}>
                <Row className="create-row">
                  <label className="create-label" style={{marginTop:"0px"}}>Title: </label>
                </Row>
                <Row style={{marginBottom: "0px"}}>
                  <input type="text"
                         className="app-input"
                         value={this.state.record_title}
                         onChange={this.onChangeRecordTitle}
                    />
                </Row>
                <Row className="create-row">
                  <label className="create-label">Artist: </label>
                </Row>
                <Row style={{marginBottom: "0px"}}>
                  <input type="text"
                         className="app-input"
                         value={this.state.record_artist}
                         onChange={this.onChangeRecordArtist}
                    />
                </Row>

                <Row className="create-row">
                  <label className="description-label" style={{marginLeft: "20px", marginTop: "15px"}}>Description: </label>
                </Row>
                    <Form.Control as="textarea"
                                  style={{marginLeft: "16px", width: "349px", height: "45px"}}
                                  rows="3"
                                  className="form-control"
                                  value={this.state.record_description}
                                  onChange={this.onChangeRecordDescription}/>

                  <Row className="create-row">
                  <label className="create-label">Price(€): </label>
                  </Row>

                  <Row style={{marginBottom: "0px"}}>
                  <input type="number"
                         step="0.1"
                         className="app-input"
                         value={this.state.record_price}
                         onChange={this.onChangeRecordPrice}
                    />
                </Row>

                <Row className="create-row">
                      <label className="create-label">Genre: </label>
                </Row>
                <Row style={{marginBottom: "10px"}}>
                      <input type="text"
                             className="app-input"
                             value={this.state.record_genre}
                             onChange={this.onChangeRecordGenre}
                        />
                    </Row>

                    <div className="size">
                      <label className="create-label">Size: </label>

                      <div className="form-check form-check-inline">
                      <label for="7inch" className="form-check-label">
                      <input style={{display: "none"}}
                             type="radio"
                             name="sizeOptions"
                             id="7inch"
                             value="7"
                             checked={this.state.record_size==='7'}
                             onChange={this.onChangeRecordSize}
                        />
                      <span class="checkmark">7“</span>
                      </label>
                      </div>

                      <div className="form-check form-check-inline">
                      <label for="10inch" className="form-check-label">
                      <input style={{display: "none"}}
                             type="radio"
                             name="sizeOptions"
                             id="10inch"
                             value="10"
                             checked={this.state.record_size==='10'}
                             onChange={this.onChangeRecordSize}
                        />
                      <span class="checkmark">10“</span>
                      </label>
                      </div>

                      <div className="form-check form-check-inline">
                      <label for="12inch" className="form-check-label">
                      <input style={{display: "none"}}
                             type="radio"
                             name="sizeOptions"
                             id="12inch"
                             value="12"
                             checked={this.state.record_size==='12'}
                             onChange={this.onChangeRecordSize}
                        />
                      <span class="checkmark">12“</span>
                      </label>
                      </div>
                    </div>

                      <Row className="create-row">
                      <label className="create-label" style={{marginTop: "15px"}}>Type: </label>
                      </Row>

                      <Form.Control as="select"
                                    style={{width: "342px", marginLeft: "20px"}}
                                    className="form-control"
                                    value={this.state.record_type}
                                    onChange={this.onChangeRecordType}>
                        <option>Single</option>
                        <option>Full Album</option>
                        <option>EP</option>
                        <option>LP</option>
                      </Form.Control>

                      <Row className="create-row">
                      <label className="create-label" style={{marginTop: "15px"}}>Image Cover: </label>
                      </Row>

                    <div className="custom-file">
                    <input type="file" onChange={this.handleFileUpload} id="inputGroupFile01" className="image-text"/>
                    </div>

                <div className="buttons">
                  <Button style={{width: '166px'}} className="cancel-button" variant="outline-danger" type="submit" onClick={this.goBack}>Cancel</Button>
                  <Button style={{width: '166px'}} variant="outline-primary" type="submit" value="Update">Update</Button>
                </div>
              </form>
              </Col>
            </Row>
          </Card>
      </div>
  );
  }
}
}

EditRecord.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(EditRecord);
