import React, { Component } from "react";
import { Table, Button, Popover } from "element-react";
import axios from "axios";
import { i18n } from "element-react";
import locale from "element-react/src/locale/lang/en";
import "element-theme-default";
import "./Table.css";
import Ajout_critere from "./Ajout_critere";
import Modifier_critere from "./Modifier_critere";
import Supprimer_critere from "./Supprimer_critere";
import { addCriteria } from "../actions/criteriaActions";
import { addIdeas } from "../actions/ideaAction";
import { endStep } from "../actions/stepActions";
import { connect } from "react-redux";

i18n.use(locale);
export class TablesCriteres extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
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
                                    <ul>Id du critère: {data.id_criteres}</ul>
                                    <ul>Critère: {data.enonce_critere}</ul>
                                </ol>
                            </div>
                        );
                    },
                },

                {
                    label: " Id ",
                    prop: "id_criteres",
                    width: 60,
                },
                {
                    label: " Critère ",
                    prop: "enonce_critere",
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
                                    title='Modifier un critère'
                                    width='400'
                                    trigger='click'
                                    content={
                                        <Modifier_critere critere={data} />
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
                                    title='Supprimer un critère'
                                    width='400'
                                    trigger='click'
                                    content={
                                        <Supprimer_critere critere={data} />
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
        axios.get("http://localhost/innov_ecl/GetCritere.php").then((res) => {
            this.setState({ data: res.data });
            const fd = new FormData();
            fd.append("id", this.props.seance.id_seance);
            axios
                .post("http://localhost/innov_ecl/GetIdea.php", fd)
                .then((res) => {
                    this.props.addIdeas(res.data);
                    if (this.props.notes[0].length !== 0) {
                        this.props.endStep();
                    }
                });
        });
    }

    getdata() {
        axios.get("http://localhost/innov_ecl/GetCritere.php").then((res) => {
            this.setState({ data: res.data });
        });
    }
    onRowClick(row) {
        this.setState({ rowClicked: row }, function () {
            console.log(this.state.rowClicked);
        });
    }
    refreshPage() {
        window.location.reload(false);
    }
    render() {
        return (
            <div>
                {" "}
                <br></br>
                <h2>{`Choisissez les critères de notation de cette phase (Phase ${
                    Math.abs(this.props.step - 3) + 1
                })`}</h2>
                <div className='flex-center'>
                    {/* <Button   plain={true} type="success" >
                <Link style={{ textDecoration: 'none' }} to="/Ajout_critere">Ajouter un critère</Link>
                </Button> */}
                    <br></br>
                    <div className='ContainerTable'>
                        <Table
                            style={{ width: "100%" }}
                            columns={this.state.columns}
                            data={this.state.data}
                            border={true}
                            emptyText='Pas de critères'
                            onSelectChange={(selection) => {
                                this.props.addCriteria({
                                    step: Math.abs(this.props.step - 3),
                                    criteria: selection,
                                });
                            }}
                            onSelectAll={(selection) => {
                                this.props.addCriteria({
                                    step: Math.abs(this.props.step - 3),
                                    criteria: selection,
                                });
                            }}
                        />
                        <br></br>
                        <br></br>
                    </div>
                </div>
                <div>
                    <Popover
                        placement='bottom'
                        title='Ajouter un critère'
                        width='400'
                        trigger='click'
                        content={<Ajout_critere />}
                    >
                        <Button
                            className='createBtn'
                            plain={true}
                            type='danger'
                            style={{ marginTop: "40px" }}
                        >
                            Ajouter un critère
                        </Button>
                    </Popover>
                </div>
                <div className='footer'>
                    <Button.Group>
                        <Button type='danger' plain={true}>
                            <i className='el-icon-arrow-left el-icon-left'></i>
                            <a
                                style={{ textDecoration: "none" }}
                                href='/TableIdees'
                            >
                                Etape précédente
                            </a>
                        </Button>
                        <Button type='danger' plain={true}>
                            <a
                                style={{ textDecoration: "none" }}
                                href='/Notation'
                                onClick={(e) => {
                                    if (
                                        this.props.selectedCriteria.length > 3
                                    ) {
                                        e.preventDefault();
                                        alert(
                                            "Le maximum nombre de critères est 3."
                                        );
                                    } else if (
                                        this.props.selectedCriteria.length === 0
                                    ) {
                                        e.preventDefault();
                                        alert("Choisir au moins un critère.");
                                    }
                                }}
                            >
                                Etape Suivante
                            </a>
                            <i className='el-icon-arrow-right el-icon-right'></i>
                        </Button>
                    </Button.Group>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedCriteria:
        state.criteria.selectedCriteria[Math.abs(state.steps - 3)],
    seance: state.seance.seance,
    step: state.steps,
    notes: state.notes,
    ideas: state.ideas,
});
export default connect(mapStateToProps, {
    addCriteria,
    addIdeas,
    endStep,
})(TablesCriteres);
