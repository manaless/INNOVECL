import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Menu} from 'element-react';

import 'element-theme-default';



export class NavBar extends Component {
  onSelect() {

  }

            render(){
            return (
              <div>
                <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
                  <Menu.Item index="1">InnovEcl</Menu.Item>
                  <Menu.Item index="2">Critères</Menu.Item>
                  <Menu.Item index="3">Questions</Menu.Item>
                  <Menu.Item index="4">Divergence</Menu.Item>
                  <Menu.Item index="5">Convergence</Menu.Item>
                </Menu>
                <div className="line"></div>
                
              </div>
            );}
          
          
}
    

 export default NavBar;


