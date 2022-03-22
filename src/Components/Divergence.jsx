import React, { Component } from "react";
import { Button, Input, Form } from "element-react";
import { Link } from "react-router-dom";
import { i18n } from "element-react";
import locale from "element-react/src/locale/lang/en";
import "element-theme-default";
import "./Table.css";
import { connect } from "react-redux";
import { addIdeas } from "../actions/ideaAction";
import axios from "axios";

i18n.use(locale);

export class Divergence extends Component {
    constructor(props) {
        super(props);

        this.state = {
            i: 0,
            current: [],
            ideas: [],
            form: {
                enonce_idee: "",
                tags: [{ key: 1, value: "" }],
            },
            visible: true,
            next: true,
            rules: {
                enonce_idee: [
                    {
                        required: true,
                        message: "Ecrire l'idee",
                        trigger: "blur",
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value === "") {
                                callback(new Error("Idee vide"));
                            } else {
                                callback();
                            }
                        },
                    },
                ],
            },
        };
    }

    nextQuestion() {
        this.setState({
            ...this.state,
            i: this.state.i + 1,
            current: {
                ...this.props.selectedQuestions[this.state.i + 1],
            },
        });
        if (this.state.i === this.props.selectedQuestions.length - 1) {
            this.setState({ ...this.state, next: false });
        }

        const ideas = [];
        this.state.ideas.forEach((idea) => {
            const tags = idea.tags.map((tag) => {
                return tag.value;
            });
            const ft = tags.join(", ");
            ideas.push({
                id_question: idea.id_question,
                enonce_idee: idea.enonce_idee,
                tags: ft,
            });
        });
        this.props.addIdeas(ideas);
    }

    addIdea() {
        const fd = new FormData();
        const tags = this.state.form.tags.map((tag) => {
            return tag.value;
        });
        const ft = tags.join(", ");
        fd.append("id_question", this.state.current.id_question);
        fd.append("enonce_idee", this.state.form.enonce_idee);
        fd.append("id_seance", this.props.seance.id_seance);
        fd.append("tags", ft);
        let idee = this.state.form.enonce_idee;
        axios
            .post("http://localhost/innov_ecl/CreateIdee.php", fd)
            .then((res) => {
                const fd1 = new FormData();
                fd1.append("id_idee", res.data);
                fd1.append("idee", idee);
                axios.post(
                    "http://localhost/innov_ecl/AddToFinalScore.php",
                    fd1
                );
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState({
            ...this.state,
            ideas: [
                ...this.state.ideas,
                {
                    id_question: this.state.current.id_question,
                    enonce_idee: this.state.form.enonce_idee,
                    tags: this.state.form.tags,
                },
            ],
            form: { ennonce_idee: "", tags: [{ key: 1, value: "" }] },
        });
    }

    removeTag(index, e) {
        if (index !== -1) {
            this.state.form.tags.splice(index, 1);
            this.forceUpdate();
        }

        if (this.state.form.tags.length !== 3) {
            this.setState({ ...this.state, visible: true });
        }

        e.preventDefault();
    }

    addTag(e) {
        e.preventDefault();

        this.state.form.tags.push({
            key: this.state.form.tags.length,
            value: "",
        });

        if (this.state.form.tags.length === 3) {
            this.setState({ ...this.state, visible: false });
        }
        this.forceUpdate();
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            current: { ...this.props.selectedQuestions[this.state.i] },
        });
    }

    render() {
        return (
            <div className='ideas'>
                <Form
                    ref='form'
                    model={this.state.form}
                    rules={this.state.rules}
                    labelWidth='100'
                    className='demo-dynamic'
                >
                    <label>{`Question ${this.state.i + 1} : 
                ${this.state.current.enonce_question}`}</label>
                    <Form.Item prop='enonce_idee' label='Idee'>
                        <Input
                            value={this.state.form.enonce_idee}
                            onChange={(e) => {
                                this.setState({
                                    ...this.state,
                                    form: {
                                        ...this.state.form,
                                        enonce_idee: e,
                                    },
                                });
                            }}
                        ></Input>
                    </Form.Item>
                    {this.state.form.tags.map((tag, index) => {
                        return (
                            <Form.Item
                                key={index}
                                label={`Tag ${index + 1}`}
                                prop={`tags:${index}`}
                                style={{ textAlign: "left" }}
                                rules={{
                                    type: "object",
                                    required: true,
                                    fields: {
                                        value: {
                                            required: true,
                                            message: "Ecrire le tag",
                                            trigger: "blur",
                                        },
                                    },
                                }}
                            >
                                <Input
                                    value={tag.value}
                                    style={{
                                        width: "50%",
                                        marginRight: "10px",
                                    }}
                                    onChange={(e) => {
                                        let t = this.state.form.tags;
                                        t[index].value = e;
                                        this.setState({
                                            ...this.state,
                                            form: {
                                                ...this.state.form,
                                                tags: [...t],
                                            },
                                        });
                                    }}
                                ></Input>
                                {index === 0 ? (
                                    ""
                                ) : (
                                    <Button
                                        onClick={(e) => {
                                            this.removeTag(index, e);
                                        }}
                                    >
                                        Supprimer
                                    </Button>
                                )}
                            </Form.Item>
                        );
                    })}
                    <Form.Item style={{ textAlign: "left" }}>
                        <button
                            className='el-button el-button--danger'
                            onClick={(e) => {
                                e.preventDefault();
                                this.refs.form.validate((valid) => {
                                    if (valid) {
                                        this.addIdea();
                                    } else {
                                        return false;
                                    }
                                });
                            }}
                        >
                            Ajouter Idee
                        </button>
                        <Button
                            onClick={(e) => this.addTag(e)}
                            style={{
                                display: `${
                                    this.state.visible ? "inline-block" : "none"
                                }`,
                            }}
                        >
                            Nouveau Tag
                        </Button>
                    </Form.Item>
                    <Form.Item style={{ textAlign: "right" }}>
                        <button
                            className='el-button el-button--danger is-plain createBtn'
                            style={{
                                display: `${
                                    this.state.next ? "inline-block" : "none"
                                }`,
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                this.nextQuestion();
                            }}
                        >
                            Question Suivante
                        </button>
                    </Form.Item>
                </Form>

                <div className='footer' style={{ marginBottom: "30px" }}>
                    <Button.Group>
                        <Button type='danger' plain={true}>
                            <i className='el-icon-arrow-left el-icon-left'></i>
                            <Link
                                style={{ textDecoration: "none" }}
                                to='/TableQuestions'
                            >
                                Etape Précédente
                            </Link>
                        </Button>

                        <Button
                            type='danger'
                            plain={true}
                            onClick={(e) => {
                                e.preventDefault();
                                this.nextQuestion();
                            }}
                        >
                            <Link
                                style={{ textDecoration: "none" }}
                                to={{
                                    pathname: "/TableIdees",
                                    state: this.props.selectedQuestions,
                                }}
                            >
                                Etape Suivante
                            </Link>
                            <i className='el-icon-arrow-right el-icon-right'></i>
                        </Button>
                    </Button.Group>
                </div>
                {/* <Radio.Group size="small" value={this.state.labelPosition} onChange={this.onPositionChange.bind(this)}>
        <Radio.Button value="left">Left</Radio.Button>
        <Radio.Button value="right">Right</Radio.Button>
        <Radio.Button value="top">Top</Radio.Button>
      </Radio.Group>
      <div style={{ margin: 20 }}></div>
      <Form className="demo-form-stacked" model={this.state.form} labelPosition={this.state.labelPosition} labelWidth="100">
      <Etiquettes array= {this.props.dynamicTags}/>
        <Form.Item label="Question 1 ?">
          <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
        </Form.Item>
        <Form.Item>
        <Button type="danger" nativeType="submit">Envoyer</Button>
        <Button>Annuler</Button>
      </Form.Item>
      <div className='footer' style={{marginBottom:'30px'}}>
      <Button.Group>
      
          
          <Button plain={true} type="danger"><i className="el-icon-arrow-left el-icon-left"></i>
          <a style={{ textDecoration: 'none' }} href="/TableQuestions">Etape précédente</a>
          </Button>
          
          
          <Button plain={true} type="danger"><i className="el-icon-arrow-right el-icon-right"></i>
          <a style={{ textDecoration: 'none' }} href="/TableCriteres">Etape Suivante</a>
          </Button>
          
      </Button.Group>
      </div>
      </Form> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedQuestions: state.questions.selectedQuestions.questions,
    seance: state.seance.seance,
});
export default connect(mapStateToProps, { addIdeas })(Divergence);
