import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTestData } from "../actions/simple.action";

import './index.scss';

class App extends Component {
  render() {
    return (
      <div>
        <h1>React-Redux</h1>
        <button onClick={() => this.props.getTestData()}>
          Make network call
        </button>
        <pre>{JSON.stringify(this.props.test)}</pre>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    test: state.test
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getTestData }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
