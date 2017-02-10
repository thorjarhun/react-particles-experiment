import React, { Component } from 'react';
import { connect } from 'react-redux';

import App from '../components';
import { tick } from '../actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  tick: () => dispatch(tick())
});

const ReduxContainer = connect(mapStateToProps, mapDispatchToProps);

class AppContainer extends Component {
  componentDidMount() {
    const ticker = () => {
      this.props.tick();
      window.requestAnimationFrame(ticker);
    };
    window.requestAnimationFrame(ticker);
  }
  render() {
    return (
      <App />
    );
  }
};

export default ReduxContainer(AppContainer);
