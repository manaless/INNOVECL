import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Menu} from 'element-react';
import './style.css';

import 'element-theme-default';
import { BrowserRouter as Router, Route, NavLink,Routes } from "react-router-dom";
import CarouselTest from './Carousel';
import Etape1 from './Etape1';
import Questions from './Questions';
import Divergence from './Divergence';
import Notation from './Notation';

import { createContext } from 'react';

const AppContext = createContext();

export class NavBar extends Component {
  onSelect() {

  }

            render(){
            return (
              <Router>
              <div>
                <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
                  <Menu.Item index="1"><NavLink style={{  textDecoration: 'none !important'  }} to="/">InnovEcl</NavLink></Menu.Item>
                  <Menu.Item index="2"><NavLink style={{ textDecoration: 'none !important' }}  to="/Questions">Critères</NavLink></Menu.Item>
                  <Menu.Item index="3"><NavLink style={{ textDecoration: 'none !important' }} to="/Questions">Questions</NavLink></Menu.Item>
                  <Menu.Item index="4"><NavLink style={{ textDecoration: 'none !important' }}  to="/">Divergence</NavLink></Menu.Item>
                  <Menu.Item index="5"><NavLink style={{ textDecoration: 'none !important' }}  to="/">Convergence</NavLink></Menu.Item>
                </Menu>
                <div className="line"></div>
                <Routes>
                <Route exact path='/' element={<CarouselTest/>}/>
                <Route exact path='/Questions' element={<Questions/>}/>                
                </Routes>
                
              </div>
              </Router>
            );}
          
          
}
    

 export default NavBar;


