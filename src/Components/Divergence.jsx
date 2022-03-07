import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button,Input,Link,Table,Popover,Tag,Form,Radio} from 'element-react';
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'
import Etiquettes from './Etiquettes';
import 'element-theme-default';

i18n.use(locale);
export class Divergence extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          labelPosition: 'right',
          form: {
            name: '',
            region: '',
            type: ''
          }
        };
      }
      
      onPositionChange(value) {
        this.setState({ labelPosition: value });
      }
      
      onChange(key, value) {
        this.setState({
          form: Object.assign(this.state.form, { [key]: value })
        });
      }
    render() {
    return (
<div>
      <Radio.Group size="small" value={this.state.labelPosition} onChange={this.onPositionChange.bind(this)}>
        <Radio.Button value="left">Left</Radio.Button>
        <Radio.Button value="right">Right</Radio.Button>
        <Radio.Button value="top">Top</Radio.Button>
      </Radio.Group>
      <div style={{ margin: 20 }}></div>
      <Form className="demo-form-stacked" model={this.state.form} labelPosition={this.state.labelPosition} labelWidth="100">
      <Etiquettes/>
        <Form.Item label="Question 1 ?">
          <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
        </Form.Item>
        <Etiquettes/>
        <Form.Item label="Question 2 ?">
          <Input value={this.state.form.region} onChange={this.onChange.bind(this, 'region')}></Input>
        </Form.Item>
        <Etiquettes/>
        <Form.Item label="Question 3 ?">
          <Input value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}></Input>
        </Form.Item>
        <Etiquettes/>
        <Form.Item label="Question 4 ?">
          <Input value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}></Input>
        </Form.Item>
        <Etiquettes/>
        <Form.Item label="Question 5 ?">
          <Input value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}></Input>
        </Form.Item>
        <Etiquettes/>
        <Form.Item label="Question 6 ?">
          <Input value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}></Input>
        </Form.Item>
        <Etiquettes/>
        <Form.Item label="Question 7 ?">
          <Input value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}></Input>
        </Form.Item>
        <Form.Item>
        <Button type="danger" nativeType="submit">Envoyer</Button>
        <Button>Annuler</Button>
      </Form.Item>
      </Form>
    </div>
    );}
  }
  export default Divergence;