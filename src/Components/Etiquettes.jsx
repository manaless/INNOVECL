import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button,Input,Link,Table,Popover,Tag,Form,Radio} from 'element-react';
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'

import 'element-theme-default';

i18n.use(locale);
export class Etiquettes extends Component {
  

    constructor(props) {
        super(props);
      
        this.state = {
          dynamicTags: [],
          inputVisible: false,
          inputValue: '',
          type: 'danger'
        }
      }
      
      onKeyUp(e) {
        if (e.keyCode === 13) {
          this.handleInputConfirm();
        }
      }
      
      onChange(value) {
        this.setState({ inputValue: value });
      }
      
      handleClose(index) {
        this.state.dynamicTags.splice(index, 1);
        this.forceUpdate();
      }
      
      showInput() {
        this.setState({ inputVisible: true }, () => {
          this.refs.saveTagInput.focus();
        });
      }
      
      handleInputConfirm() {
        let inputValue = this.state.inputValue;
      
        if (inputValue) {
          this.state.dynamicTags.push(inputValue);
        }
      
        this.state.inputVisible = false;
        this.state.inputValue = '';
      
        this.forceUpdate();
      }
    render() {
    return (
        <div>
      {
        this.state.dynamicTags.map((tag, index) => {
          return (
            <Tag
              key={Math.random()}
              closable={true}
              closeTransition={false}
              onClose={this.handleClose.bind(this, index)}>{tag}</Tag>
          )
        })
      }
      {
        this.state.inputVisible ? (
          <Input
            className="input-new-tag"
            value={this.state.inputValue}
            ref="saveTagInput"
            size="mini"
            onChange={this.onChange.bind(this)}
            onKeyUp={this.onKeyUp.bind(this)}
            onBlur={this.handleInputConfirm.bind(this)}
          />
        ) : <Button className="button-new-tag"  size="small" onClick={this.showInput.bind(this)}>+ New Tag</Button>
      }
    </div>

    );}
  }
  export default Etiquettes;