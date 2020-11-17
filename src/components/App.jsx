import React from 'react';
import {
  Container, Nav, Row, Col,
} from 'react-bootstrap';
import Battle from '@/pages/Battle.jsx';
import Popular from '@/pages/Popular.jsx';
// import axios from 'axios'
import { hot } from 'react-hot-loader/root'

// setConfig({
//   showReactDomPatchNotification: false
// });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { route: 'Popular' };
  }

  handleMenu(key) {
    // console.log('key', key);
    this.setState({
      route: key,
    });
  }

  render() {
    const menuItems = [
      'Popular',
      'Battle',
    ];
    const { route } = this.state;
    let page = null;
    switch (route) {
      case 'Battle':
        page = <Battle />;
        break;
      case 'Popular':
        page = <Popular />;
        break;
      default:
        page = <Popular />;
        break;
    }
    return (
      <Container>
        <Row>
          <Col>
            <Nav
              className="justify-content-center"
              style={{ border: 'soild black' }}
              variant="tabs"
              defaultActiveKey="All"
              onSelect={(selectedKey) => this.handleMenu(selectedKey)}
            >
              {menuItems.map((item, key) => (
                <Nav.Item key={key}>
                  <Nav.Link eventKey={item}>{item}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <div>
              {page}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default hot(App);
