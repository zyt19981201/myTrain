
import React from 'react';
// import ReactDOM from 'react-dom'; 
import { Container, InputGroup, FormControl, Row, Col, Button } from 'react-bootstrap';

import img2 from "../assets/imgs/pic2.png"
import img3 from "../assets/imgs/pic3.png"
import img4 from "../assets/imgs/pic4.png"



export default class Battle extends React.Component {

    render() {

        return (
            <Container className="text-center">
                <br /> <h3>Animal family</h3> <br />
                <Row>
                    <Col >
                        <p>Bear</p>
                        <img src={img2} style={{ 'boxShadow': '0 0 5px 3px #00000042' }} />
                    </Col>
                    <Col>
                        <p>Unicorn</p>
                        <img src={img3} style={{ 'boxShadow': '0 0 5px 3px #00000042' }} />
                    </Col>
                    <Col>
                        <p>Dinosaur</p>
                        <img src={img4} style={{ 'boxShadow': '0 0 5px 3px #00000042' }} />
                    </Col>
                </Row><br />
                <h3>Player</h3> <br />
                <Row>
                    <Col sm={12} md={6} lg={6}>
                        <h5>Player1：</h5>
                        <InputGroup >
                            <FormControl
                                placeholder="github用户名"
                                aria-label="github username"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button variant="primary">提交</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <h5>Player2：</h5>
                        <InputGroup >
                            <FormControl
                                placeholder="github用户名"
                                aria-label="github username"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button variant="primary">提交</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}
