import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Menu } from "element-react";
import "./style.css";

import "element-theme-default";
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Routes,
} from "react-router-dom";
import Etape1 from "./Etape1";
import TransferCriteres from "./TransferCriteres";
import Divergence from "./Divergence";
import ChoixCriteres from "./ChoixCriteres";
import TableCriteres from "./TableCriteres";
import Notation from "./Notation";
import TableQuestions from "./TableQuestions";
import TableIdees from "./TableIdees";
import TableNotes from "./TableNotes";
import FinalTable from "./FinalTable";
import TableNotesFinal from "./TableNotesFinal";
import CarouselTest from "./Carousel";
import Questions from "./Questions";
import Etiquettes from "./Etiquettes";
import SelectionPhase1 from "./SelectionPhase1";
import { createContext } from "react";

const AppContext = createContext();

export class NavBar extends Component {
    onSelect() {}

    componentDidMount() {
        const navSize = document.querySelector(".el-menu-demo").offsetHeight;
        const div = document.querySelector(
            ".App > div:first-of-type > div:last-of-type:not(.App)"
        );

        if (div !== null) {
            div.style.minHeight = window.innerHeight - navSize + "px";
            div.style.display = "flex";
            div.style.flexDirection = "column";
            div.style.justifyContent = "space-between";
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <Menu
                        theme='dark'
                        className='el-menu-demo'
                        mode='horizontal'
                        onSelect={this.onSelect.bind(this)}
                    >
                        <Menu.Item index='1'>
                            <NavLink
                                style={{ textDecoration: "none !important" }}
                                to='/'
                            >
                                InnovEcl
                            </NavLink>
                        </Menu.Item>
                        {/* <Menu.Item index="2"><NavLink style={{  textDecoration: 'none !important'  }} to="/TableCriteres">Critères</NavLink></Menu.Item> */}
                        {/* <Menu.Item index="2"><NavLink style={{ textDecoration: 'none !important' }}  to="/">Phase préliminaire</NavLink></Menu.Item>
                  <Menu.Item index="3"><NavLink style={{ textDecoration: 'none !important' }} to="/TableQuestions">Selection de critères et questions</NavLink></Menu.Item>
                  <Menu.Item index="4"><NavLink style={{ textDecoration: 'none !important' }}  to="/Divergence">Divergence</NavLink></Menu.Item>
                  <Menu.Item index="5"><NavLink style={{ textDecoration: 'none !important' }}  to="/Convergence">Convergence</NavLink></Menu.Item> */}
                    </Menu>
                    <div className='line'></div>
                    <Routes>
                        <Route
                            exact
                            path='/Etiquettes'
                            element={<Etiquettes />}
                        />
                        <Route exact path='/' element={<CarouselTest />} />
                        <Route
                            exact
                            path='/Divergence'
                            element={<Divergence />}
                        />
                        <Route
                            exact
                            path='/TableQuestions'
                            element={<TableQuestions />}
                        />
                        <Route
                            exact
                            path='/TableIdees'
                            element={<TableIdees />}
                        />
                        <Route
                            exact
                            path='/TableNotes'
                            element={<TableNotes />}
                        />
                        <Route
                            exact
                            path='/TableNotesFinal'
                            element={<TableNotesFinal />}
                        />
                        <Route
                            exact
                            path='/TableCriteres'
                            element={<TableCriteres />}
                        />
                        <Route
                            exact
                            path='/TableFinal'
                            element={<FinalTable />}
                        />
                        <Route exact path='/Notation' element={<Notation />} />
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default NavBar;
