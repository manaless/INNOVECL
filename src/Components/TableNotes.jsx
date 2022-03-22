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
export class TableNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    label: " ID idèe ",
                    prop: "id_idee",
                    width: 160,
                },
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
        this.props.selectedCriteria.forEach((c, index) =>
            arr.push({
                label: `Critère 0${index + 1}`,
                prop: `critere_0${index + 1}`,
                width: 160,
            })
        );
        arr.push({ label: `Score`, prop: `score`, width: 160 });

        this.setState({
            ...this.state,
            columns: this.state.columns.concat(arr),
        });

        let notes = [];
        const fd = new FormData();
        fd.append("id", this.props.seance.id_seance);
        axios.post("http://localhost/innov_ecl/GetNote.php", fd).then((res) => {
            notes = res.data;
            notes.forEach((note, index) => {
                let idNote = note.id_note;
                const fd = new FormData();
                fd.append("id", note.id_idee);
                axios
                    .post("http://localhost/innov_ecl/GetIdeaById.php", fd)
                    .then((res) => {
                        const found = this.state.ideas.some(
                            (el) => el.id_idée === res.data.id_idée
                        );

                        if (!found) {
                            let ideeNotes = {};
                            let indexes = [];
                            let score = 1;
                            if (this.props.step !== 3) {
                                this.props.notes[
                                    Math.abs(this.props.step - 3) - 1
                                ].forEach((nt) => {
                                    if (nt.id_idee === res.data.id_idée) {
                                        score = score * nt.score;
                                    }
                                });
                            }
                            switch (this.props.selectedCriteria.length) {
                                case 1:
                                    this.props.selectedCriteria.forEach(
                                        (criteria) => {
                                            indexes.push(
                                                notes.findIndex((note) => {
                                                    return (
                                                        note.id_critere ===
                                                            criteria.id_criteres &&
                                                        note.id_idee ===
                                                            res.data.id_idée
                                                    );
                                                })
                                            );
                                        }
                                    );
                                    ideeNotes = {
                                        critere_01: notes[indexes[0]].note,
                                        score:
                                            parseInt(notes[indexes[0]].note) *
                                            score,
                                    };
                                    break;
                                case 2:
                                    this.props.selectedCriteria.forEach(
                                        (criteria) => {
                                            indexes.push(
                                                notes.findIndex((note) => {
                                                    return (
                                                        note.id_critere ===
                                                            criteria.id_criteres &&
                                                        note.id_idee ===
                                                            res.data.id_idée
                                                    );
                                                })
                                            );
                                        }
                                    );
                                    ideeNotes = {
                                        critere_01: notes[indexes[0]].note,
                                        critere_02: notes[indexes[1]].note,
                                        score:
                                            parseInt(notes[indexes[0]].note) *
                                            parseInt(notes[indexes[1]].note) *
                                            score,
                                    };
                                    break;
                                case 3:
                                    this.props.selectedCriteria.forEach(
                                        (criteria) => {
                                            indexes.push(
                                                notes.findIndex((note) => {
                                                    return (
                                                        note.id_critere ===
                                                            criteria.id_criteres &&
                                                        note.id_idee ===
                                                            res.data.id_idée
                                                    );
                                                })
                                            );
                                        }
                                    );
                                    ideeNotes = {
                                        critere_01: notes[indexes[0]].note,
                                        critere_02: notes[indexes[1]].note,
                                        critere_03: notes[indexes[2]].note,
                                        score:
                                            parseInt(notes[indexes[0]].note) *
                                            parseInt(notes[indexes[1]].note) *
                                            parseInt(notes[indexes[2]].note) *
                                            score,
                                    };

                                    break;
                                default:
                                    return;
                            }
                            this.setState({
                                ...this.state,
                                ideas: [...this.state.ideas, res.data],
                            });
                            this.setState({
                                ...this.state,
                                data: [
                                    ...this.state.data,
                                    {
                                        id_idee: res.data.id_idée,
                                        id_note: idNote,
                                        idee: res.data.enonce_idee,
                                        ...ideeNotes,
                                    },
                                ],
                                done: true,
                            });
                            const step = Math.abs(this.props.step - 3);
                            const data = this.state.data;
                            this.props.addNotes({
                                step,
                                notes: data,
                            });

                            if (
                                this.props.notes[step].length ===
                                this.props.ideas.length
                            ) {
                                console.log("hi");
                                let arr = this.props.notes[
                                    Math.abs(this.props.step - 3)
                                ].sort((a, b) => {
                                    return a.score - b.score;
                                });
                                let i = 0;
                                let ind = [];
                                for (i; i < this.state.count; i++) {
                                    ind.push(i);
                                    const fd = new FormData();
                                    fd.append("id", arr[i]?.id_idee);
                                    axios
                                        .post(
                                            "http://localhost/innov_ecl/DeleteIdea.php",
                                            fd
                                        )
                                        .then((res) => {
                                            axios.post(
                                                "http://localhost/innov_ecl/DeleteNotes.php"
                                            );
                                        });
                                }
                                arr = arr.slice(
                                    ind[ind.length - 1] + 1,
                                    arr.length
                                );

                                this.props.addNotes({
                                    step,
                                    notes: arr,
                                });
                            }
                        }
                    });
            });
        });
    }
    getdata() {
        axios.get("http://localhost/innov_ecl/GetNote.php").then((res) => {
            this.setState({ data: res.data });
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
                <h2>
                    {`Les Notes (Phase ${Math.abs(this.props.step - 3) + 1})`}{" "}
                </h2>

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
                        <Button type='danger' plain={true}>
                            <i className='el-icon-arrow-left el-icon-left'></i>
                            <a
                                style={{ textDecoration: "none" }}
                                href='/Notation'
                            >
                                Etape précédente
                            </a>
                        </Button>
                        <Button
                            type='danger'
                            plain={true}
                            onClick={(e) => {
                                if (this.props.step !== 1) {
                                    window.location.pathname = "/TableCriteres";
                                } else {
                                    window.location.pathname =
                                        "/TableNotesFinal";
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
    selectedCriteria:
        state.criteria.selectedCriteria[Math.abs(state.steps - 3)],
    ideas: state.ideas,
    notes: state.notes,
    step: state.steps,
    seance: state.seance.seance,
});

export default connect(mapStateToProps, { addNotes, addIdeas })(TableNotes);
