import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button,Input,Link,Table,Popover} from 'element-react';

import 'element-theme-default';

export class Etape1 extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          columns: [
            {
              type: 'selection'
            },
            {
              label: "Critères",
              prop: "date",
              width: 150
            },
            {
              label: "Description",
              prop: "name",
              width: 160
            }
          ],
          data: [{
            date: 'Critere 1',
            name: 'D1',
          }, {
            date: 'Critere 2',
            name: 'D2',
          }, {
            date: 'Critere 3',
            name: 'D3',
          }, {
            date: 'Critere 4',
            name: 'D4',
          }]
        }
      }
    
    
    
    
    
    
    render() {
    return (
    <div>
    <h2>Choix du sujet </h2>
    <Input
      type="textarea"
      autosize={{ minRows: 2, maxRows: 4}}
      placeholder="Entrer le sujet"
    />
    <h2>Choix des critères </h2>
    <Table
      style={{width: '100%'}}
      columns={this.state.columns}
      data={this.state.data}
      border={true}
      height={250}
      onSelectChange={(selection) => { console.log(selection) }}
      onSelectAll={(selection) => { console.log(selection) }}
    />
    <Popover placement="right" title="Ajout critère" width="400" trigger="click" content={(
        <div>
        <h1>Critère</h1>
        <Input placeholder="Entrer le critère" />
        <h1>Description</h1>
        <Input placeholder="Entrer sa description" />
        </div>
    )}>
      <Button>Cliquer ajouter des critères</Button>
    </Popover>
    <p>








        
    </p>
    </div>
    );}
  }
  export default Etape1;