import React from "react"
import axios from "axios"
import { HashRouter as Router, Link } from 'react-router-dom'
import BatteAfter from "@/components/BattleAfter.jsx"
import BatteAgo from "@/components/BattleAgo.jsx"
import {
  Button,
} from 'react-bootstrap';


export default class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName1: "",
      userName2: "",
      userItem1: [],
      userItem2: [],
      openKey: 0,
      oneKey: 0,
      twoKey: 0
    }
  }

  async componentDidMount() {
    if (window.location.href.indexOf('&') != -1) {
      let str = window.location.href

      str = str.match(/battle\/(\S*)/) && str.match(/battle\/(\S*)/)[1]
      console.log(str);
      const arr = str.split("&")
      await this.setState({
        userName1: arr[0],
        userName2: arr[1],
        openKey: 1,
        oneKey: 1,
        twoKey: 1
      })
      this.getNewData1();
      this.getNewData2()
    }
  }

  getNewData1 = () => {
    axios.get(`https://api.github.com/search/repositories?q=${this.state.userName1}&order=desc&sort=stars`)
      .then(res => {
        this.setState({
          userItem1: res.data.items[0],
        })
      })
      .catch(err => {
        console.error(err);
      })
  }

  getNewData2 = () => {
    axios.get(`https://api.github.com/search/repositories?q=${this.state.userName2}&order=desc&sort=stars`)
      .then(res => {
        this.setState({
          userItem2: res.data.items[0],
        })
      })
      .catch(err => {
        console.error(err);
      })
  }

  getData = (data) => {
    const { userName1, userName2, userItem1, userItem2, oneKey, twoKey } = data
    this.setState({
      userName1,
      userName2,
      userItem1,
      userItem2,
      oneKey,
      twoKey
    })
  }

  openBattle = () => {
    if (this.state.openKey) {
      this.setState({
        openKey: 0,
        oneKey: 0,
        twoKey: 0
      })
    } else {
      this.setState({
        openKey: 1,
      })
    }
  }

  render() {
    return (
      <div className="text-center">
        {this.state.openKey ? (
          <BatteAfter Name1={this.state.userName1} Name2={this.state.userName2} Item1={this.state.userItem1} Item2={this.state.userItem2} />
        ) : (
            <BatteAgo getChildData={this.getData} />
          )}
        <Router>
          {this.state.oneKey && this.state.twoKey ? (<Link to={{ pathname: this.state.openKey ? `/battle` : `/battle/${this.state.userName1}&${this.state.userName2}` }}><Button className='button' type="button" variant="primary" onClick={this.openBattle}>{this.state.openKey ? "GOBACK" : "BATTLE"}</Button></Link>) : null}
        </Router>
      </div>
    )
  }
}
