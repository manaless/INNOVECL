import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table,Checkbox,Button} from 'element-react';
import { BrowserRouter as Router, Route, Link,Routes } from "react-router-dom";
import axios from 'axios';
import TableQuestions from './TableQuestions';
import TablesCriteres from './TableCriteres';
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'
import 'element-theme-default';

i18n.use(locale);
export class SelectionPhase1 extends Component {
    render(){
        return (
            <div>
            <div >
                <TableQuestions/>     
            </div>
            <div >
                <TablesCriteres/>
            </div>
            </div>
          );

    }

}export default SelectionPhase1;