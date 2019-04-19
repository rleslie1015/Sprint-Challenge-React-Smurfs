import React, { Component } from 'react';
import axios from "axios";
import { Route, Link } from "react-router-dom";
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  componentDidMount() {
    axios.get("http://localhost:3333/smurfs")
    .then(res => {
      this.setState({ smurfs: res.data });
    })
    .catch(err => console.log(err));
  }
  newSmurfList = data => {
    this.setState({
      smurfs: data
    });
  };
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/">Smurfs</Link>
          <Link to="/smurf-form">Add a Smurf</Link>
        </nav>
        <Smurfs smurfs={this.state.smurfs} />
        <Route
            exact
            path="/smurf-form"
            render={props => (
              <SmurfForm {...props} newSmurfList={this.newSmurfList} />
            )}
          />
      </div>
    );
  }
}

export default App;
