import 'amfe-flexible';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.scss';
const img = require('./i/pop_share.png');
import { Button } from 'antd-mobile';

class App extends Component {
  render () {
    return (
      <div className="page1">
        <div>test-react</div>
        <img className="page1__img" src={img} alt="" />
        <Button type="primary">primary</Button>
        <Button type="primary" disabled>primary disabled</Button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
$('#jquery').html('aaa')