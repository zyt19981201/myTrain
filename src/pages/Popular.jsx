import React from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
// import ReactBootstrap from 'react-bootstrap';
// import {ListGroup,Spinner,Alert,Container,Nav,Card,Row,Col,Button,ListGroupItem} from 'react-bootstrap';
import 'lazysizes';
import * as ReactBootstrap from 'react-bootstrap';

import img1 from '@/assets/imgs/pic1.png';

const { ListGroup } = ReactBootstrap;
const { Spinner } = ReactBootstrap;
const { Alert } = ReactBootstrap;
const { Container } = ReactBootstrap;
const { Nav } = ReactBootstrap;
const { Card } = ReactBootstrap;
const { Row } = ReactBootstrap;
const { Col } = ReactBootstrap;
const { Button } = ReactBootstrap;
const { ListGroupItem } = ReactBootstrap;

function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return null;
  // console.log('Query variable %s not found', variable);
}
console.log(`lanuage is : ${getQueryVariable('language')}`);
const Header = (props) => {
  const menuItems = [
    'All',
    'Javascript',
    'Ruby',
    'Java',
    'Css',
    'Python',
  ];

  return (
    <div>
      <Container>
        <Nav
          className="justify-content-center"
          style={{ border: 'soild black' }}
          variant="tabs"
          defaultActiveKey="All"
          onSelect={(selectedKey) => props.onClick(selectedKey)}
        >
          {menuItems.map((item, key) => (
            <Nav.Item key={key}>
              <Nav.Link eventKey={item}>{item}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Container>
    </div>
  );
};
const Content = (props) => (
  <div>
    <Container>
      {props.children}
    </Container>
  </div>
);
const Footer = (props) => (
  <div>
    <Container>
      {props.children}
    </Container>
  </div>
);
const RepoCard = (props) => (
  <Card border="primary" style={{ marginTop: '8px', marginBottom: '8px' }}>
    <Card.Header className="text-center bg-white font-weight-bold">{props.no}</Card.Header>
    <Card.Body className="bg-light">
      <Card.Img src={img1} data-src={props.img} className="lazyload" />
      <Card.Title className="text-center"><Card.Link href={props.url} className="text-danger" target="_blank">{props.title}</Card.Link></Card.Title>
      <ListGroup className="list-group-flush">
        <ListGroupItem className="bg-light">
          <Card.Text><i className="fa fa-user fa-lg fa-fw" style={{ color: 'orange' }} />{props.author}</Card.Text>
        </ListGroupItem>
        <ListGroupItem className="bg-light">
          <Card.Text><i className="fa fa-star fa-lg fa-fw" style={{ color: 'yellow' }} />{props.stars}</Card.Text>
        </ListGroupItem>
        <ListGroupItem className="bg-light">
          <Card.Text><i className="fa fa-code-fork fa-lg fa-fw" style={{ color: 'lightblue' }} />{props.forks}</Card.Text>
        </ListGroupItem>
        <ListGroupItem className="bg-light">
          <Card.Text><i className="fa fa-warning fa-lg fa-fw" style={{ color: 'purple' }} />{props.issues}</Card.Text>
        </ListGroupItem>
      </ListGroup>
    </Card.Body>
  </Card>
);
export default class App extends React.Component {
  constructor(props) {
    super(props);
    const cards = [
    ];
    this.state = {
      cards, loading: false, error: null, type: 'all', page: 1,
    };
  }

  componentDidMount() {
    this.handleNavClick();
  }

  handleNavClick = async (type = 'all', page = 1) => {
    const { cards } = this.state;
    let url = '';
    switch (type) {
      case 'Javascript':
        url = 'https://api.github.com/search/repositories?q=stars:%3E1+language:javascript&sort=stars&order=desc&type=Repositories';
        break;
      case 'Ruby':
        url = 'https://api.github.com/search/repositories?q=stars:%3E1+language:ruby&sort=stars&order=desc&type=Repositories';
        break;
      case 'Java':
        url = 'https://api.github.com/search/repositories?q=stars:%3E1+language:java&sort=stars&order=desc&type=Repositories';
        break;
      case 'Css':
        url = 'https://api.github.com/search/repositories?q=stars:%3E1+language:css&sort=stars&order=desc&type=Repositories';
        break;
      default:
        url = 'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories';
    }
    url = `${url}&page=${page}&per_page=10`;
    try {
      const beforeState = { type, loading: true, error: null };
      if (page === 1) {
        beforeState.cards = [];
      }
      this.setState(beforeState);
      const res = await axios.get(url);
      const newCards = res.data.items.map((item, key) => ({
        no: `#${page === 1 ? 1 + key : cards.length + 1 + key}`,
        img: item.owner.avatar_url,
        title: item.full_name,
        author: item.owner.login,
        stars: item.stargazers_count,
        forks: item.forks,
        issues: item.open_issues,
        url: item.html_url,

      }));
      if (page > 1) {
        this.setState((state) => ({ cards: [...state.cards, ...newCards], loading: false, page }));
      } else {
        this.setState({ cards: newCards, loading: false, page });
      }
    } catch (e) {
      this.setState({ loading: false, error: e });
    }
  }

  loadMore = () => {
    const { type, page } = this.state;
    this.handleNavClick(type, page + 1);
  }

  render() {
    const { cards, loading, error } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <h2 style={{ margin: '20px auto' }}>github热门项目</h2>
        <div className="container">
          <Header onClick={this.handleNavClick} />
          <Content>

            <Row className="justify-content-around">
              {cards.map((item, key) => (
                <Col sm={6} md={4} lg={3} key={key}>
                  <RepoCard
                    no={item.no}
                    img={item.img}
                    title={item.title}
                    author={item.author}
                    stars={item.stars}
                    forks={item.forks}
                    issues={item.issues}
                    url={item.url}
                  />
                </Col>
              ))}
            </Row>
            <div className="text-center">
              {error && error.response && <Alert variant="danger">{error.response.status} {error.response.statusText}</Alert>}
            </div>
            <div className="text-center">
              <Button onClick={this.loadMore} disabled={loading}> {loading && (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )} 加载更多
              </Button>
            </div>
          </Content>
          <Footer>
            <div className="text-center text-black jumbotron bg-light">
              <p>版权所有 &copy; 张裕堂</p>
            </div>
          </Footer>
        </div>

      </div>
    );
  }
}
