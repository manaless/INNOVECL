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
export class TableNotesFinal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: false,
            columns: [
                {
                    label: " Idée ",
                    prop: "idee",
                    width: 160,
                },
            ],
            data: [],
            rowClicked: [],
            idRow: "",
            ideas: [],
            count: Math.floor(this.props.ideas.length / 2),
            eliminated: [],
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

        let arr = [];
        let num = 0;
        this.props.selectedCriteria.forEach((c, indexOne) => {
            c.forEach((criteria, indexTwo) => {
                num++;
                arr.push({
                    label: `Critère 0${indexTwo + 1}`,
                    prop: `critere_0${num}`,
                    width: 160,
                });
            });
        });
        arr.push({ label: `Score`, prop: `score`, width: 160 });

        this.setState({
            ...this.state,
            columns: this.state.columns.concat(arr),
            done: true,
        });

        axios.get("http://localhost/innov_ecl/GetCritere.php").then((res) => {
            let sortedArr = this.props.notes[2].sort(
                ({ score: a }, { score: b }) => b - a
            );
            sortedArr.forEach((note, index) => {
                if (index < 10) {
                    const firstStep = this.props.notes[0].filter((n) => {
                        return n.id_idee === note.id_idee;
                    });
                    const secondStep = this.props.notes[1].filter((n) => {
                        return n.id_idee === note.id_idee;
                    });
                    let data = {};
                    data.idee = note.idee;
                    data.score = parseInt(note?.score);
                    let cr = 0;
                    this.props.selectedCriteria.forEach((c, index) => {
                        let d = {};
                        switch (index) {
                            case 0:
                                d = firstStep[0];
                                break;
                            case 1:
                                d = secondStep[0];
                                break;
                            case 2:
                                d = note;
                                break;
                            default:
                                return;
                        }
                        c.forEach((c1, index) => {
                            cr++;
                            if (d !== undefined) {
                                data[`critere_0${cr}`] =
                                    d[`critere_0${index + 1}`];
                            }
                        });
                    });

                    this.setState({
                        ...this.state,
                        data: [...this.state.data, data],
                    });
                }
            });
        });
    }

    onRowClick(row) {
        this.setState({ rowClicked: row }, function () {
            console.log(this.state.rowClicked);
        });
    }
    removeItems(array, itemsToRemove) {
        return array.filter((v) => {
            return !itemsToRemove.includes(v);
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
                <h2>Top 10 idées selon le score</h2>

                <div className='flex-center'>
                    <div className='ContainerTable'>
                        <Table
                            style={{ width: "100%" }}
                            columns={this.state.columns}
                            data={this.state.data}
                            height='400px'
                            border={true}
                            emptyText='Pas de notes'
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
                                window.location.pathname = "/TableFinal";
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
    selectedCriteria: state.criteria.selectedCriteria,
    ideas: state.ideas,
    notes: state.notes,
});

export default connect(mapStateToProps, { addNotes, addIdeas })(
    TableNotesFinal
);
