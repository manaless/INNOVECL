import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table,Checkbox,Transfer} from 'element-react';
import { BrowserRouter as Router, Route, Link,Routes } from "react-router-dom";
import axios from 'axios';
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'
import 'element-theme-default';

i18n.use(locale);
export class TransferCriteres extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: [],
          data: []
        }
        this._handleChange = this.handleChange.bind(this);
        this.getdata = props.getdata;
      }

      
      getdata() {
        axios.get('http://localhost/innov_ecl/GetCritere.php').then(res => 
        { 
            this.setState({data: res.data});
        });

      }
      
      render() {
        const { value } = this.state.value;
        return <Transfer titles={['Critères', 'Critères choisis']}  value={value} data={this.data} onChange={this._handleChange}></Transfer>
      }
      
}export default TransferCriteres;