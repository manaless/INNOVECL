import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button,Input,Link,Table,Popover,Tag,Rate} from 'element-react';
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'

import 'element-theme-default';

i18n.use(locale);
export class Notation extends Component {

    
    constructor(props) {
        super(props);
      
        this.state = {
          columns: [
            {
              label: "Idée",
              prop: "date",
              width: 180
            },

            {
              label: 'Tag',
              prop: 'tag',
              width: 180,
              filters: [{ text: 'Politique', value: 'Politique' }, { text: 'Environnement', value: 'Environnement' }],
              filterMethod(value, row) {
                                return row.tag === value;
                              },
              render: (data, column)=>{
                if (data['tag'] == 'Politique') {
                  return <Tag type="warning">{data['tag']}</Tag>
                } else if (data['tag'] == 'Environnement') {
                  return <Tag type="danger">{data['tag']}</Tag>
                }
              }
            },
            {
                label: "Note",
                prop: "Note",
                width: 180,
                render: function() {
                    return (
                     <Rate
                           showText={true}
                           texts={['1', '3', '5', '7', '10']}
                     />
                   )
                 }
               }
          ],
          data: [{
            date: 'IDEE 1',
            tag: 'Politique',
            Note:''
          }, {
            date: 'IDEE 2',
            tag: 'Environnement',
            Note:''
          }, {
            date: 'IDEE 3',
            tag: 'Politique',
            Note:''
          }, {
            date: 'IDEE 4',
            tag: 'Environnement',
            Note:''
          },
          {
            date: 'IDEE 5',
            tag: 'Politique',
            Note:''
          }]
        }
      }
    
    
    
    
    render() {
    return (
        <Table
        style={{width: '100%'}}
        columns={this.state.columns}
        data={this.state.data}
        border={true}
      />
    );}
  }
  export default Notation;