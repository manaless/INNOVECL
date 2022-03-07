import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button,Input,Link,Table,Popover,Tag} from 'element-react';
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'

import 'element-theme-default';

i18n.use(locale);
export class Questions extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          columns: [
            {
              type: 'selection'
            },
            {
              label: "Question",
              prop: "date",
              width: 150
            },
            {
                label: "Catégorie",
                prop: "tag",
                width: 150,
                filters: [{ text: 'Economie', value: 'Economie' }, { text: 'Environnement', value: 'Environnement' }],
                filterMethod(value, row) {
                          return row.tag === value;
                        },
                render: (data, column)=>{
                 if (data['tag'] == 'Economie') {
                    return <Tag type="primary">{data['tag']}</Tag>
                } else if (data['tag'] == 'Environnement') {
                return <Tag type="success">{data['tag']}</Tag>}}}
              ],
          data: [{
            date: 'Question 1',
            tag: 'Economie'
          }, {
            date: 'Question 2',
            tag: 'Environnement'
          }]
        }
      }
    
    
    
    
    
    
    render() {
    return (
    <div>
    <h2>Choix des questions </h2>
    <Table
      style={{width: '100%'}}
      columns={this.state.columns}
      data={this.state.data}
      border={true}
      height={250}
      onSelectChange={(selection) => { console.log(selection) }}
      onSelectAll={(selection) => { console.log(selection) }}
    />
    <Popover placement="right" title="Ajout question" width="400" trigger="click" content={(
        <div>
        <h1>Question</h1>
        <Input placeholder="Entrer la question" />
        <h1>Catégorie</h1>
        <Input placeholder="Entrer la catégorie" />
        
        <Button type="danger">Ajouter</Button>

        </div>
    )}>
      <Button>Cliquer ajouter une question</Button>
    </Popover>
    </div>
    );}
  }
  export default Questions;