import React, { Component } from "react";
import { Table, Checkbox, Button, Popover, Input } from "element-react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import axios from "axios";
import { i18n } from "element-react";
import locale from "element-react/src/locale/lang/en";
import "element-theme-default";
import "./Table.css";
import Ajout_question from "./Ajout_question";
import Modifier_question from "./Modifier_question";
import Supprimer_question from "./Supprimer_question";
import { addQuestions } from "../actions/questionActions";
import { connect } from "react-redux";

i18n.use(locale);
export class TableQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    type: "selection",
                },
                {
                    type: "expand",
                    expandPannel: function (data) {
                        return (
                            <div>
                                <ol>
                                    <ul>Identifiant: {data.id_question}</ul>
                                    <ul>Catégorie: {data.categorie}</ul>
                                    <ul>Question: {data.enonce_question}</ul>
                                </ol>
                            </div>
                        );
                    },
                },

                {
                    label: " Id ",
                    prop: "id_question",
                    width: 60,
                },
                {
                    label: " Catégorie ",
                    prop: "categorie",
                    width: 160,
                },
                {
                    label: " Question ",
                    prop: "enonce_question",
                    width: 500,
                },
                {
                    label: "Operations",
                    width: "200",
                    render: function (data) {
                        return (
                            <span>
                                <Popover
                                    placement='right'
                                    title='Modifier une question'
                                    width='400'
                                    trigger='click'
                                    content={
                                        <Modifier_question question={data} />
                                    }
                                >
                                    <Button
                                        plain={true}
                                        type='info'
                                        size='small'
                                        style={{ marginRight: "10px" }}
                                    >
                                        Modifier
                                    </Button>
                                </Popover>
                                <Popover
                                    placement='right'
                                    title='Supprimer une question'
                                    width='400'
                                    trigger='click'
                                    content={
                                        <Supprimer_question question={data} />
                                    }
                                >
                                    <Button type='danger' size='small'>
                                        Supprimer
                                    </Button>
                                </Popover>
                            </span>
                        );
                    },
                },
            ],
            data: [],
            rowClicked: [],
            idRow: "",
        };
        this.getdata = props.getdata;
    }

    componentDidMount() {
        window.onload = function () {
            if (!window.location.hash) {
                window.location = window.location + "#loaded";
                window.location.reload();
            }
        };
        window.onload();
        axios.get("http://localhost/innov_ecl/GetQuestion.php").then((res) => {
            this.setState({ data: res.data });
        });
    }
    getdata() {
        axios.get("http://localhost/innov_ecl/GetQuestion.php").then((res) => {
            this.setState({ data: res.data });
        });
    }
    onRowClick(row) {
        this.setState({ rowClicked: row }, function () {
            console.log(this.state.rowClicked);
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
                <h2>Choisissez les questions de divergence</h2>

                <div className='flex-center'>
                    <div className='ContainerTable'>
                        <Table
                            style={{ width: "100%" }}
                            columns={this.state.columns}
                            data={this.state.data}
                            border={true}
                            emptyText='Pas de questions'
                            onSelectChange={(selection) => {
                                this.props.addQuestions(selection);
                            }}
                            onSelectAll={(selection) => {
                                this.props.addQuestions(selection);
                            }}
                        />
                    </div>
                </div>
                <br></br>
                <div>
                    <Popover
                        placement='right'
                        title='Ajouter une question'
                        width='400'
                        trigger='click'
                        content={<Ajout_question />}
                    >
                        <Button
                            className='createBtn'
                            plain={true}
                            type='danger'
                        >
                            Ajouter une question
                        </Button>
                    </Popover>
                </div>
                <div className='footer'>
                    <Button.Group>
                        <Button
                            type='danger'
                            plain={true}
                            onClick={(e) => {
                                if (this.props.selectedQuestions.length === 0) {
                                    alert("Choisir au moins une question.");
                                    e.preventDefault();
                                } else {
                                    window.location.pathname = "/Divergence";
                                }
                            }}
                        >
                            Etape Suivante
                            <i className='el-icon-arrow-right el-icon-right'></i>
                        </Button>
                    </Button.Group>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedQuestions: state.questions.selectedQuestions.questions,
});

export default connect(mapStateToProps, { addQuestions })(TableQuestions);
