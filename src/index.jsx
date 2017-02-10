import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { select as d3Select } from 'd3';

import AppContainer from './containers/AppContainer';
import { resizeScreen } from './actions';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
      <AppContainer />
  </Provider>,
  document.querySelectorAll('.main')[0]
);

const onResize = () => store.dispatch(resizeScreen(window.innerWidth, window.innerHeight));
onResize();
d3Select(window).on('resize', onResize);
