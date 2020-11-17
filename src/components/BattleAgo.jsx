import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from "axios"
import {
  Container, InputGroup, FormControl, Row, Col, Button, Card
} from 'react-bootstrap';

import img2 from '@/assets/imgs/pic2.png';
import img3 from '@/assets/imgs/pic3.png';
import img4 from '@/assets/imgs/pic4.png';

export default class BatteAgo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName1: "",
      userName2: "",
      userItem1: [],
      userItem2: [],
      oneKey: 0,
      twoKey: 0,
      loadKey1: false,
      loadKey2: false,
      bKey1: 1,
      bKey2: 1
    }
  }

  userChange = (ev) => {
    ev.persist();
    this.setState(
      { userName1: ev.target.value }
    )
  }

  userChange2 = (ev) => {
    ev.persist();
    this.setState(
      { userName2: ev.target.value }
    )
  }

  userSubmit = async () => {
    if (this.state.userName1 === '') {
      return;
    }
    this.setState({
      loadKey1: true,
      bKey1: 0
    })
    await axios.get(`https://api.github.com/search/repositories?q=${this.state.userName1}&order=desc&sort=stars`)
      .then(res => {
        // console.log("数据1", res);
        this.setState({
          userItem1: res.data.items[0],
          oneKey: 1,
          loadKey1: false,
          bKey1: 1
        })
      })
      .catch(err => {
        console.error(err);
      })
    this.props.getChildData(this.state)
  }

  twoSubmit = async () => {
    if (this.state.userName2 === '') {
      return;
    }
    this.setState({
      loadKey2: true,
      bKey2: 0
    })
    await axios.get(`https://api.github.com/search/repositories?q=${this.state.userName2}&order=desc&sort=stars`)
      .then(res => {
        this.setState({
          userItem2: res.data.items[0],
          twoKey: 1,
          loadKey2: false,
          bKey2: 1
        })
      })
      .catch(err => {
        console.error(err);
      })
    this.props.getChildData(this.state)
  }

  selKey1 = async () => {
    await this.setState({
      oneKey: 0,
      userName1: ""
    })
  }

  selKey2 = async () => {
    await this.setState({
      twoKey: 0,
      userName2: ""
    })
  }

  render() {
    return (
      <div>
        <Container className="text-center" style={{ display: 'flex', flexDirection: 'column' }}>
          <Row>
            <Col className="text-center" style={{ margin: '20px auto', flex: 1 }}>
              <h2>Instrutions</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5
                className="text-info"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>Enter Two Users</h5>
              <div>
                <img src={img2} alt="" />
              </div>
            </Col>
            <Col>
              <h5 className="text-info">Battle</h5>
              <img src={img3} alt="" />
            </Col>
            <Col>
              <h5
                className="text-info"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>See The Winner</h5>
              <img src={img4} alt="" />
            </Col>
          </Row>
          <Row style={{ margin: '80px auto' }}>
            <Col style={{ margin: '20px 20px' }}>
              <div className="player1">
                {this.state.oneKey ? (
                  <div>
                    <Card border="primary" style={{ width: '18rem' }} style={{ margin: '10px auto' }}>
                      <Card.Img variant="top" src={0 ? `${this.state.userItem1.owner.avatar_url}?size=200` : `https://github.com/${this.state.userName1}.png?size=200`} alt="" className="lazyload" style={{ width: '200px', height: '200px', margin: '0 auto' }} />
                      <Card.Body className="bg-light">
                        <Card.Title className="text-danger">{this.state.userName1}</Card.Title>
                        <Button variant="primary" onClick={this.selKey1}>close</Button>
                      </Card.Body>
                    </Card>
                  </div>
                ) : (
                    <div className="input">
                      <h4 className="text-info">palyers one</h4>
                      <InputGroup className="mb-3">
                        <FormControl
                          placeholder="Github UserName"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          value={this.state.userName1} onChange={this.userChange} onKeyDown={() => { if (window.event.keyCode === 13) { this.userSubmit() } }}
                        />
                        <InputGroup.Append>
                          {this.state.userName1 !== "" && this.state.bKey1 ? <Button variant="primary" onClick={this.userSubmit}>Submit</Button> : <Button disabled="disabled" variant="outline-secondary"> Input</Button>}
                        </InputGroup.Append>
                      </InputGroup>
                      {this.state.loadKey1 ? (
                        <h5 style={{ textAlign: 'center' }} className="loading">
                          <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '30px' }} />
                          <span className="sr-only">Loading...</span>
                        </h5>
                      ) : <span />}
                    </div>
                  )}
              </div>
            </Col>
            <Col style={{ margin: '20px 20px' }}>
              <div className="player2">
                {this.state.twoKey ? (
                  <div>
                    <Card border="primary" style={{ width: '18rem' }} style={{ margin: '10px auto' }}>
                      <Card.Img variant="top" src={0 ? `${this.state.userItem2.owner.avatar_url}?size=200` : `https://github.com/${this.state.userName2}.png?size=200`} alt="" className="lazyload" style={{ width: '200px', height: '200px', margin: '0 auto' }} />
                      <Card.Body className="bg-light">
                        <Card.Title className="text-danger">{this.state.userName2}</Card.Title>
                        <Button variant="primary" onClick={this.selKey2}>close</Button>
                      </Card.Body>
                    </Card>
                  </div>
                ) : (
                    <div className="input">
                      <h4 className="text-info">palyers two</h4>
                      <InputGroup className="mb-3">
                        <FormControl
                          placeholder="Github UserName"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          value={this.state.userName2} onChange={this.userChange2} onKeyDown={() => { if (window.event.keyCode === 13) { this.twoSubmit() } }}
                        />
                        <InputGroup.Append>
                          {this.state.userName2 !== "" && this.state.bKey2 ? <Button variant="primary" onClick={this.twoSubmit}>Submit</Button> : <Button disabled="disabled" variant="outline-secondary" > Input</Button>}
                        </InputGroup.Append>
                      </InputGroup>
                      {this.state.loadKey2 ? (
                        <h5 style={{ textAlign: 'center' }} className="loading"><FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '30px' }} />
                          <span className="sr-only">Loading...</span>
                        </h5>
                      ) : <span />}
                    </div>
                  )}
              </div>
            </Col>
          </Row>

        </Container>
      </div>
    )
  }
} 