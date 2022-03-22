import React, {Component, useState} from 'react';
import ReactDOM from 'react-dom';
import { Button, Input, Form } from 'element-react';

import 'element-theme-default';

import axios from 'axios';

class Ajout_critere extends Component
{
  
  constructor(props) {
    super(props);
  
    this.state = {
      form: {
        enonce_critere: '',
        
      },
      rules: {
        enonce_critere: [
          { required: true, message: 'Ecrire la question', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('champ vide !'));
            } else {
              callback();
            }
          } }
        ]
       

      }
    };
  }

  sendData() {
    let enonce_critere = this.state.form.enonce_critere

    const fd = new FormData();
    fd.append('enonce_critere',enonce_critere)

    axios.post('http://localhost/innov_ecl/CreateCritere.php',fd).then(res =>
    {
        console.log(res); 
    }).catch(
      function(error)
      {
        console.log(error)
      }
    )
    
  }
  
  handleSubmit(e) {
    e.preventDefault();
  
    this.refs.form.validate((valid) => {
      if (valid) {
        alert('submit!');
        this.sendData()
      } else {
        console.log('error submit!!');
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
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }
  
  render() {
    return (
      <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100" className="demo-ruleForm">
        <Form.Item label="Critère" prop="enonce_critere">
          <Input type="text" value={this.state.form.enonce_critere} onChange={this.onChange.bind(this, 'enonce_critere')} autoComplete="off" />
        </Form.Item>

        

        <Form.Item>
          <Button type="danger" onClick={this.handleSubmit.bind(this)}>Ajouter</Button>
          <Button plain={true} type="danger" onClick={this.handleReset.bind(this)}>Fermer</Button>
        </Form.Item>
      </Form>
    )
  }

 

}
export default Ajout_critere;
