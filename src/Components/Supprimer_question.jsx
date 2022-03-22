import React, { Component } from "react";
import { Button, Input, Form } from "element-react";

import "element-theme-default";

import axios from "axios";

class Supprimer_question extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                id_question: this.props.question.id_question,
                enonce_question: this.props.question.enonce_question,
                categorie: this.props.question.categorie,
            },
        };
    }

    sendData() {
        let id = this.state.form.id_question;

        const fd = new FormData();
        fd.append("id", id);

        axios
            .post("http://localhost/innov_ecl/DeleteQuestion.php", fd)
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
        this.sendData();
    }

    handleReset(e) {
        e.preventDefault();
        window.location.reload(false);
    }

    render() {
        return (
            <Form
                ref='form'
                model={this.state.form}
                labelWidth='100'
                className='demo-ruleForm'
            >
                <Form.Item label='Question' prop='enonce_question'>
                    <Input
                        type='text'
                        disabled
                        value={this.state.form.enonce_question}
                        autoComplete='off'
                    />
                </Form.Item>

                <Form.Item label='categorie' prop='categorie'>
                    <Input
                        disabled
                        type='text'
                        value={this.state.form.categorie}
                        autoComplete='off'
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type='danger'
                        onClick={this.handleSubmit.bind(this)}
                    >
                        Supprimer
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
export default Supprimer_question;
