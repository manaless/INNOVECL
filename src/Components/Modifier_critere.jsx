import React, { Component } from "react";
import { Button, Input, Form } from "element-react";

import "element-theme-default";

import axios from "axios";

class Modifier_critere extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                id_critere: this.props.critere.id_criteres,
                enonce_critere: this.props.critere.enonce_critere,
            },
            rules: {
                enonce_critere: [
                    {
                        required: true,
                        message: "Ecrire le critère",
                        trigger: "blur",
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value === "") {
                                callback(new Error("Critère vide"));
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
        let id_critere = this.state.form.id_critere;
        let enonce_critere = this.state.form.enonce_critere;

        const fd = new FormData();
        fd.append("id_critere", id_critere);
        fd.append("enonce_critere", enonce_critere);

        axios
            .post("http://localhost/innov_ecl/UpdateCritere.php", fd)
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

    render() {
        return (
            <Form
                ref='form'
                model={this.state.form}
                rules={this.state.rules}
                labelWidth='100'
                className='demo-ruleForm'
            >
                <Form.Item label='Critère' prop='enonce_critere'>
                    <Input
                        type='text'
                        value={this.state.form.enonce_critere}
                        onChange={this.onChange.bind(this, "enonce_critere")}
                        autoComplete='off'
                    />
                </Form.Item>

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
export default Modifier_critere;
