import React, { Suspense, lazy } from 'react';
import {
  Container, Nav, Row, Col, ButtonGroup, Button
} from 'react-bootstrap';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
const Battle = lazy(() => import('@/pages/Battle.jsx'))
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

  // handleMenu(key) {
  //   // console.log('key', key);
  //   this.setState({
  //     route: key,
  //   });
  // }

  render() {
    // const menuItems = [
    //   'Popular',
    //   'Battle',
    // ];
    // const { route } = this.state;
    // let page = null;
    // switch (route) {
    //   case 'Battle':
    //     page = <Battle />;
    //     break;
    //   case 'Popular':
    //     page = <Popular />;
    //     break;
    //   default:
    //     page = <Popular />;
    //     break;
    // }
    return (
      <Container>
        {/* <Row>
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
        </Row> */}
        <HashRouter>
          <br />
          <ButtonGroup aria-label="Basic example">
            <Button className='button' variant="primary">
              <Link className="button text-white" to="/Popular/">
                Popular
              </Link>
            </Button>
            <Button className='button text-white' variant="primary">
              <Link className="button text-white" to="/Battle/">
                Battle
              </Link>
            </Button>
          </ButtonGroup>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Popular}></Route>
              <Route exact path="/Popular" component={Popular}></Route>
              <Route path="/Battle" component={Battle}></Route>
            </Switch>
          </Suspense>
        </HashRouter>
      </Container>
    );
  }
}
export default hot(App);
