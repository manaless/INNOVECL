import React, { Component } from "react";
import { Table, Button, Popover } from "element-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { i18n } from "element-react";
import locale from "element-react/src/locale/lang/en";
import "element-theme-default";
import "./Table.css";
import Modifier_idee from "./Modifier_idee";
import Supprimer_idee from "./Supprimer_idee";
import { connect } from "react-redux";

i18n.use(locale);
export class TableIdees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    type: "expand",
                    expandPannel: function (data) {
                        return (
                            <div>
                                <ol>
                                    <ul>Identifiant: {data.id_idée}</ul>
                                    <ul>
                                        Identifiant question: {data.id_question}
                                    </ul>
                                    <ul>Idèe: {data.enonce_idee}</ul>
                                    <ul>tags: {data.tags}</ul>
                                </ol>
                            </div>
                        );
                    },
                },

                {
                    label: " Id Idee ",
                    prop: "id_idée",
                    width: 100,
                },
                {
                    label: " Id Question ",
                    prop: "id_question",
                    width: 150,
                },
                {
                    label: " Idee ",
                    prop: "enonce_idee",
                    width: 500,
                },
                {
                    label: " Tags ",
                    prop: "tags",
                    width: 200,
                },
                {
                    label: "Operations",
                    width: "200",
                    render: function (data) {
                        return (
                            <span>
                                <Popover
                                    placement='right'
                                    title='Modifier une idèe'
                                    width='400'
                                    trigger='click'
                                    content={<Modifier_idee idee={data} />}
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
                                    title='Supprimer une idèe'
                                    width='400'
                                    trigger='click'
                                    content={<Supprimer_idee idee={data} />}
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
        const fd = new FormData();
        fd.append("id", this.props.seance.id_seance);
        axios.post("http://localhost/innov_ecl/GetIdea.php", fd).then((res) => {
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
                            height='400px'
                            columns={this.state.columns}
                            data={this.state.data}
                            border={true}
                            emptyText="Pas d'idèes"
                        />
                    </div>
                </div>
                <br></br>
                <div></div>
                <div className='footer'>
                    <Button.Group>
                        <Button type='danger' plain={true}>
                            <i className='el-icon-arrow-left el-icon-left'></i>
                            <a
                                style={{ textDecoration: "none" }}
                                href='/Divergence'
                            >
                                Etape précédente
                            </a>
                        </Button>
                        <Button type='danger' plain={true}>
                            <Link
                                style={{ textDecoration: "none" }}
                                to='/TableCriteres'
                            >
                                Etape Suivante
                            </Link>
                            <i className='el-icon-arrow-right el-icon-right'></i>
                        </Button>
                    </Button.Group>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    seance: state.seance.seance,
});

export default connect(mapStateToProps, {})(TableIdees);
