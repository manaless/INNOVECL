import React, { Component } from "react";
import { Button, Input, Form } from "element-react";

import "element-theme-default";

import axios from "axios";

class Supprimer_idee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                id_idee: this.props.idee.id_idée,
                enonce_idee: this.props.idee.enonce_idee,
            },
        };
    }

    sendData() {
        let id = this.state.form.id_idee;

        const fd = new FormData();
        fd.append("id", id);

        axios
            .post("http://localhost/innov_ecl/DeleteIdea.php", fd)
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
                <Form.Item label='Idée' prop='enonce_idee'>
                    <Input
                        type='text'
                        disabled
                        value={this.state.form.enonce_idee}
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
export default Supprimer_idee;
