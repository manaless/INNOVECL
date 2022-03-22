import React, { Component } from "react";
import { Table, Button } from "element-react";
import axios from "axios";
import { i18n } from "element-react";
import locale from "element-react/src/locale/lang/en";
import "element-theme-default";
import "./Table.css";
import { addNotes } from "../actions/noteActions";
import { addIdeas } from "../actions/ideaAction";
import { connect } from "react-redux";

i18n.use(locale);
export class FinalTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: false,
            columns: [
                {
                    label: " ID ",
                    prop: "id_idee",
                    width: 160,
                },
                {
                    label: " Idée ",
                    prop: "idee",
                    width: 300,
                },
                {
                    label: " Score ",
                    prop: "score",
                    width: 160,
                },
            ],
            data: [],
        };
        this.getdata = props.getdata;
    }

    componentDidMount() {
        axios
            .get("http://localhost/innov_ecl/GetAllIdeasScore.php")
            .then((res) => {
                this.setState({ ...this.state, data: res.data });
            });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        return (
            <div>
                <br></br>
                <h2>Les idées avec le score</h2>

                <div className='flex-center'>
                    <div className='ContainerTable'>
                        <Table
                            style={{ width: "100%" }}
                            columns={this.state.columns}
                            data={this.state.data}
                            height='400px'
                            border={true}
                            emptyText="Pas d'idées"
                        />
                    </div>
                </div>
                <br></br>
                <div className='footer'>
                    <Button.Group>
                        <Button
                            type='danger'
                            plain={true}
                            onClick={(e) => {
                                window.localStorage.clear();
                                window.location.pathname = "/";
                                axios
                                    .post("http://localhost/innov_ecl/DeleteALLIdea.php")
                                    .then((res) => {
                                        console.log(res);
                                        window.location.reload(false);
                                })
                                    .catch(function (error) {
                                        console.log(error);
                                });
                               
                                
                                window.localStorage.clear();
                                window.location.pathname = "/";
                              
                            }}
                        >
                            Accueil
                            <i className='el-icon-arrow-right el-icon-right'></i>
                        </Button>
                    </Button.Group>
                </div>
            </div>
        );
    }
}

export default FinalTable;
