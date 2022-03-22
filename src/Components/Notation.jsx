import React, { Component } from "react";
import { Button, Form, Select } from "element-react";
import { i18n } from "element-react";
import locale from "element-react/src/locale/lang/en";
import axios from "axios";

import "element-theme-default";
import { connect } from "react-redux";

i18n.use(locale);
export class Notation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            done: false,
            count: 1,
            ideas: [],
            current: {},
            currentIdea: 1,
            form: {
                notes: [],
            },
            rules: {
                notes: [
                    {
                        required: true,
                        type: "array",
                        message: "Donner une note",
                        trigger: "change",
                    },
                ],
            },
            options: [
                {
                    value: 1,
                    label: "1",
                },
                {
                    value: 3,
                    label: "3",
                },
                {
                    value: 7,
                    label: "7",
                },
                {
                    value: 10,
                    label: "10",
                },
            ],
        };
    }

    sendData() {
        this.state.form.notes.forEach((note, index) => {
            let mark = note;
            let id_critere = this.props.selectedCriteria[index].id_criteres;
            let id_idee = this.state.current.id_idée;

            const fd = new FormData();
            fd.append("note", mark);
            fd.append("id_critere", id_critere);
            fd.append("id_idee", id_idee);
            fd.append("id_seance", this.props.seance.id_seance);
            axios
                .post("http://localhost/innov_ecl/CreateNote.php", fd)
                .then((res) => {
                    console.log(res);
                })
                .catch(function (error) {
                    console.log(error);
                });
            const fd1 = new FormData();
            fd1.append("id", id_idee);
            axios
                .post("http://localhost/innov_ecl/GetIdeaScore.php", fd1)
                .then((res) => {
                    const fd2 = new FormData();
                    fd2.append("id", id_idee);
                    fd2.append("score", parseInt(res.data.score) * mark);
                    axios.post(
                        "http://localhost/innov_ecl/UpdateIdeaScore.php",
                        fd2
                    );
                });
        });
        this.setState({
            ...this.state,
            done: true,
        });
    }

    componentDidMount() {
        const fd = new FormData();
        fd.append("id", this.props.seance.id_seance);
        axios.post("http://localhost/innov_ecl/GetIdea.php", fd).then((res) => {
            this.setState({
                ...this.state,
                ideas: res.data,
                current: res.data[this.state.currentIdea - 1],
            });
        });
    }

    render() {
        return (
            <div
                style={{
                    width: "75%",
                    margin: "0 auto",
                    textAlign: "left",
                }}
            >
                <br></br>
                <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
                    Notation des idées selon les critères choisis
                </h2>
                <label>
                    {this.state.ideas.length === 0
                        ? "Pas d'idèes a évaluer"
                        : `Idee ${
                              this.state.currentIdea < 10
                                  ? `0${this.state.currentIdea}`
                                  : `${this.state.currentIdea}`
                          } : ${this.state.current.enonce_idee}`}
                </label>
                <Form
                    ref='form'
                    model={this.state.form}
                    rules={this.state.rules}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        marginTop: "40px",
                    }}
                >
                    {this.props.selectedCriteria.map((criteria, index) => {
                        return (
                            <Form.Item key={index} prop='notes'>
                                <label>{`Critère 0${index + 1} : ${
                                    criteria.enonce_critere
                                }`}</label>
                                <Select
                                    placeholder='Choisir une note'
                                    value={
                                        this.state.form.notes.length === 0
                                            ? 0
                                            : this.state.form.notes[index]
                                    }
                                    clearable={true}
                                    onClear={(e) => {
                                        /* this.state.form.notes.splice(index, 1); */
                                        let arr = this.state.form.notes;
                                        arr[index] = 0;
                                        this.setState({
                                            ...this.state,
                                            form: { notes: arr },
                                        });
                                    }}
                                    onChange={(e) => {
                                        if (e !== "") {
                                            let arr = this.state.form.notes;
                                            arr[index] = e;
                                            this.setState({
                                                ...this.state,
                                                form: { notes: arr },
                                            });
                                        }
                                    }}
                                >
                                    {this.state.options.map((el) => {
                                        return (
                                            <Select.Option
                                                key={el.value}
                                                label={el.label}
                                                value={el.value}
                                            />
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        );
                    })}
                </Form>
                <div>
                    <Button
                        className='el-button el-button--danger is-plain createBtn'
                        disabled={this.state.done}
                        onClick={(e) => {
                            e.preventDefault();
                            this.refs.form.validate((valid) => {
                                const index = this.state.form.notes.indexOf(0);
                                if (valid && index === -1) {
                                    this.sendData();
                                } else {
                                    return false;
                                }
                            });
                        }}
                    >
                        Enregistrer les notes
                    </Button>
                    <Button
                        className='el-button el-button--danger createBtn'
                        style={{ float: "right" }}
                        disabled={
                            this.state.currentIdea !== this.state.ideas.length
                                ? false
                                : true
                        }
                        onClick={(e) => {
                            e.preventDefault();
                            this.refs.form.validate((valid) => {
                                if (valid) {
                                    if (
                                        this.state.currentIdea !==
                                        this.state.ideas.length
                                    ) {
                                        this.setState({
                                            ...this.state,
                                            currentIdea:
                                                this.state.currentIdea + 1,
                                            current:
                                                this.state.ideas[
                                                    this.state.currentIdea
                                                ],
                                            done: false,
                                            form: { notes: [] },
                                        });
                                    }
                                    this.forceUpdate();
                                } else {
                                    return false;
                                }
                            });
                        }}
                    >
                        Idée Suivante
                    </Button>
                </div>
                <div className='footer' style={{ textAlign: "center" }}>
                    <Button.Group>
                        <Button type='danger' plain={true}>
                            <i className='el-icon-arrow-left el-icon-left'></i>
                            <a
                                style={{ textDecoration: "none" }}
                                href='/TableCriteres'
                            >
                                Etape précédente
                            </a>
                        </Button>
                        <Button type='danger' plain={true}>
                            <a
                                style={{ textDecoration: "none" }}
                                href='/TableNotes'
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
});
export default connect(mapStateToProps)(Notation);
