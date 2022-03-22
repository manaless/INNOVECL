import React, { Component } from "react";
import { Button, Input, Form } from "element-react";
import { addSeance } from "../actions/seanceActions";

import "element-theme-default";

import axios from "axios";
import { connect } from "react-redux";

class Ajout_seance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                sujet_seance: "",
            },
            rules: {
                sujet_seance: [
                    {
                        required: true,
                        message: "Ecrire le sujet",
                        trigger: "blur",
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value === "") {
                                callback(new Error("sujet vide"));
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
        let sujet_seance = this.state.form.sujet_seance;

        const fd = new FormData();
        fd.append("sujet_seance", sujet_seance);
        axios
            .post("http://localhost/innov_ecl/CreateSeance.php", fd)
            .then((res) => {
                this.props.addSeance(res.data);
                setTimeout(() => {
                    window.location.pathname = "/TableQuestions";
                }, 500);
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

    render() {
        return (
            <Form
                ref='form'
                model={this.state.form}
                rules={this.state.rules}
                labelWidth='100'
                className='demo-ruleForm'
            >
                <Form.Item label='Seance' prop='sujet_seance'>
                    <Input
                        type='text'
                        value={this.state.form.sujet_seance}
                        onChange={this.onChange.bind(this, "sujet_seance")}
                        autoComplete='off'
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type='danger'
                        onClick={this.handleSubmit.bind(this)}
                    >
                        Ajouter
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
export default connect(null, { addSeance })(Ajout_seance);
