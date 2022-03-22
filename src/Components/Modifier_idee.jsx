import React, { Component } from "react";
import { Button, Input, Form } from "element-react";

import "element-theme-default";

import axios from "axios";
import { connect } from "react-redux";

class Modifier_idee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            form: {
                id_question: this.props.idee.id_question,
                id_idee: this.props.idee.id_idée,
                enonce_idee: this.props.idee.enonce_idee,
                tags: [],
            },
            rules: {
                enonce_idee: [
                    {
                        required: true,
                        message: "Ecrire l'idée'",
                        trigger: "blur",
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value === "") {
                                callback(new Error("idée vide"));
                            } else {
                                callback();
                            }
                        },
                    },
                ],
            },
        };
    }

    sendData() {
        const fd = new FormData();
        const tags = this.state.form.tags.map((tag) => {
            return tag.value;
        });
        const ft = tags.join(", ");
        fd.append("id_idee", this.state.form.id_idee);
        fd.append("enonce_idee", this.state.form.enonce_idee);
        fd.append("id_seance", this.props.seance.id_seance);
        fd.append("tags", ft);
        axios
            .post("http://localhost/innov_ecl/UpdateIdee.php", fd)
            .then((res) => {
                console.log(res);
                window.location.reload(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.refs.form.validate((valid) => {
            if (valid) {
                alert("submit!");
                this.sendData();
            } else {
                console.log("error submit!!");
                return false;
            }
        });
    }

    handleReset(e) {
        e.preventDefault();
        window.location.reload(false);
    }

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value }),
        });
    }

    componentDidMount() {
        const arr = this.props.idee.tags.split(", ");
        let arr2 = [];
        arr.forEach((elt) => {
            arr2.push({ key: this.state.form.tags.length + 1, value: elt });
        });
        this.setState({
            ...this.state,
            form: { ...this.state.form, tags: arr2 },
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

    render() {
        return (
            <Form
                ref='form'
                model={this.state.form}
                rules={this.state.rules}
                labelWidth='100'
                className='demo-ruleForm'
            >
                <Form.Item label='Idée' prop='enonce_idee'>
                    <Input
                        type='text'
                        value={this.state.form.enonce_idee}
                        onChange={this.onChange.bind(this, "enonce_idee")}
                        autoComplete='off'
                    />
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
                <Button
                    onClick={(e) => this.addTag(e)}
                    style={{
                        display: `${
                            this.state.visible ? "inline-block" : "none"
                        }`,
                        marginBottom: "10px",
                    }}
                >
                    Nouveau Tag
                </Button>
                <Form.Item>
                    <Button
                        type='danger'
                        onClick={this.handleSubmit.bind(this)}
                    >
                        Modifier
                    </Button>
                    <Button
                        plain={true}
                        type='danger'
                        onClick={this.handleReset.bind(this)}
                    >
                        Fermer
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
const mapStateToProps = (state) => ({
    seance: state.seance.seance,
});
export default connect(mapStateToProps)(Modifier_idee);
