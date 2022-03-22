import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Transfer} from 'element-react';
import axios from 'axios';
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'
import 'element-theme-default';

i18n.use(locale);
var array = new Array();
export class ChoixCriteres extends Component {


  constructor(props) {
    super(props);
    this.state = {
      value: []
    }
    this._handleChange = this.handleChange.bind(this);
  }
  
  get data() {
    const data = [];
    for (let i = 1; i <= 15; i++) {
      data.push({
        key: i,
        label: `Option ${ i }`,
        disabled: i % 4 === 0
      });
    }
    return data;
  }
  
  handleChange(value) {
    this.setState({ value })
  }
  
  render() {
    const { value } = this.state;
    return <Transfer value={value} data={this.data} onChange={this._handleChange}></Transfer>
  }  
} export default ChoixCriteres;