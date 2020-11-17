import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar, faUserCircle, faExclamationTriangle, faShareAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  Container, InputGroup, FormControl, Row, Col, Button, Card, ListGroup, ListGroupItem
} from 'react-bootstrap';
export default class BatteAfter extends React.Component {

  render() {
    const LiSyle = {
      width: '100%',
      textAlign: 'left',
      paddingLeft: '15%',
      boxSizing: 'border-box',
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '15px',
      // height:'4%',
      // overflow: "hidden"
    };
    let one = "";
    let two = "";
    const win = () => {
      if (this.props.Item1.stargazers_count && this.props.Item2.stargazers_count) {
        if (this.props.Item1.stargazers_count > this.props.Item2.stargazers_count) {
          one = "Winning"
          two = "Failed"
        } else {
          two = "Winning"
          one = "Failed"
        }
      }
    }
    win();
    return (
      <Container style={{ display: 'flex', flexDirection: 'column' }}>
        <Row style={{ padding: '10px auto' }}>
          <Col>
            <Card border="primary" style={{ margin: '8px auto', width: '18rem' }}>
              <Card.Header><h4 className="text-center  font-weight-bold text-danger">{one}</h4></Card.Header>
              <Card.Body className="bg-light">
                <Card.Img className="lazyload" src={this.props.Name1 ? `https://github.com/${this.props.Name1}.png?size=200` : "./img/1.png"} alt="" style={{ width: '200px', height: '200px' }} />
                <Card.Title className="text-center" style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}><Card.Link className="text-danger" target="_blank" style={{ fontSize: '28px' }}>{this.props.Name1}</Card.Link></Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroupItem className="bg-light">
                    <Card.Text><i className="fa fa-user fa-lg fa-fw" style={{ color: 'orange' }} />{this.props.Item1.name ? this.props.Item1.name : ""}</Card.Text>
                  </ListGroupItem>
                  <ListGroupItem className="bg-light">
                    <Card.Text><i className="fa fa-star fa-lg fa-fw" style={{ color: 'yellow' }} />{this.props.Item1.stargazers_count ? this.props.Item1.stargazers_count : ""}</Card.Text>
                  </ListGroupItem>
                  <ListGroupItem className="bg-light">
                    <Card.Text><i className="fa fa-code-fork fa-lg fa-fw" style={{ color: 'lightblue' }} />{this.props.Item1.forks_count ? this.props.Item1.forks_count : ""}</Card.Text>
                  </ListGroupItem>
                  <ListGroupItem className="bg-light">
                    <Card.Text><i className="fa fa-warning fa-lg fa-fw" style={{ color: 'purple' }} />{this.props.Item1.open_issues_count ? this.props.Item1.open_issues_count : ""}</Card.Text>
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card border="primary" style={{ margin: '8px auto', width: '18rem' }}>
              <Card.Header><h4 className="text-center  font-weight-bold text-danger">{two}</h4></Card.Header>
              <Card.Body className="bg-light">
                <Card.Img className="lazyload" src={this.props.Name2 ? `https://github.com/${this.props.Name2}.png?size=200` : "./img/1.png"} alt="" style={{ width: '200px', height: '200px' }} />
                <Card.Title className="text-center" style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}><Card.Link className="text-danger" target="_blank" style={{ fontSize: '28px' }}>{this.props.Name2}</Card.Link></Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroupItem className="bg-light">
                    <Card.Text><i className="fa fa-user fa-lg fa-fw" style={{ color: 'orange' }} />{this.props.Item2.name ? this.props.Item2.name : ""}</Card.Text>
                  </ListGroupItem>
                  <ListGroupItem className="bg-light">
                    <Card.Text><i className="fa fa-star fa-lg fa-fw" style={{ color: 'yellow' }} />{this.props.Item2.stargazers_count ? this.props.Item2.stargazers_count : ""}</Card.Text>
                  </ListGroupItem>
                  <ListGroupItem className="bg-light">
                    <Card.Text><i className="fa fa-code-fork fa-lg fa-fw" style={{ color: 'lightblue' }} />{this.props.Item2.forks_count ? this.props.Item2.forks_count : ""}</Card.Text>
                  </ListGroupItem>
                  <ListGroupItem className="bg-light">
                    <Card.Text><i className="fa fa-warning fa-lg fa-fw" style={{ color: 'purple' }} />{this.props.Item2.open_issues_count ? this.props.Item2.open_issues_count : ""}</Card.Text>
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container >
    )
  }
}