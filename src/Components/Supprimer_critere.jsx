import React, { Component } from "react";
import { Button, Input, Form } from "element-react";

import "element-theme-default";

import axios from "axios";

class Supprimer_critere extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                id_critere: this.props.critere.id_criteres,
                enonce_critere: this.props.critere.enonce_critere,
            },
        };
    }

    sendData() {
        let id = this.state.form.id_critere;

        const fd = new FormData();
        fd.append("id", id);

        axios
            .post("http://localhost/innov_ecl/DeleteCritere.php", fd)
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
                <Form.Item label='Critère' prop='enonce_critere'>
                    <Input
                        type='text'
                        disabled
                        value={this.state.form.enonce_critere}
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
export default Supprimer_critere;
