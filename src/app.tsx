import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { setGlobalData } from "./utils/const/global";
import dva from './dva'
import models from './models/index'
import './assets/css/custom-variables.scss';
import './assets/css/font/iconfont.css';
import './app.scss'

const dvaApp = dva.createApp({
  initialState: {},
  models
});
const store = dvaApp.getStore();

class App extends Component {
  componentWillMount(): void {
    setGlobalData('tabName', 'index');
  }

  // this.props.children 是将要会渲染的页面
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
