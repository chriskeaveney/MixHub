import '../../App.css';
import { Card, Row, Col } from 'react-bootstrap';
import React, {Component} from 'react'

class About extends React.Component {

  render() {
  return(
    <div className="App">
    <br />< br/>< br/>
    <div className="about-app">
    <Card className="about-card" text="white" style={{ width: '65rem', height: '30rem' }}>
    <Card.Body>
          <div>
            <div>
            <Row>
            <Col md="auto">
            <div className="aboutimg"> </div>
            </Col>
            <Col>
            <h1 class="about-heading">About MixHub</h1>
              <p className="about-text">MixHub is an online platform for buying and selling new or used
                vinyl records. <br/><br/>
              The idea of MixHub is to allow music lovers of all ages to trade their vinyl records through the MixHub
              marketplace with ease. By simply registering one can view the vast variety of records listed here on
              MixHub from genres of all categories. Whether you wish to sell your old records taking up space at home
              or build upon your newly found collection.
              <br/></p><p className="about-text dis">You can view any records from the list provided on
               the homepage showing all latest records in our online collection. One can also list their own records
               from the 'user name' tab at the top of the page or edit & delete their sold or discarded records on the Profile
               page.<br/><br/></p>
              </Col>
              </Row>
              </div>
            </div>
      </Card.Body>
    </Card>
    <br />< br/>< br/>< br/>
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
    </div>
  );
  }
}

export default About;
