import React, { Component } from 'react';
import axios from "axios";

class App extends Component {
  state = {
    trials: []
  }

  componentWillMount(){
    axios({
      method:'get',
      url:'http://arealwebsite.io/trials'
    })
    .then((data) => {
      this.setState({trials: data.data});
    });
  }

  handleInputChange = (event, id) => {
    let newName = event.target.name, 
      newVal = event.target.value;

      let newTrialValues = this.state.trials.map( trial => {
        if(trial.id === id){
        console.log('updated trial', trial);
          trial[newName] = newVal;
        }
        return trial;
      });

      this.setState({trials: newTrialValues});
  }

  handlePostRequest = (event, id) =>{
    let newVal = event.target.value,
      updated = {};
      updated.name = newVal;
      console.log('updated handlepost', updated);
    axios({
      method: 'post',
      data: updated,
      url:'http://arealwebsite.io/trial/' + id
    })
    .then((data) => {
      console.log(data);
    });
  }

  render() {
    return (
      <div className="App">
      <h1>Trials</h1>
      <table>
      <tr>
      <th>Name</th>
      <th>Archived</th>
      <th>Description</th>
      <th>First Enrollment</th>
      </tr>
      <tbody>
      {this.state.trials.map( trial => (
        <tr key={trial.id}>
        <td>
        <label>
        <input 
        type="text"
        name="name" 
        value={trial.name} 
        onChange={(event)=>this.handleInputChange(event, trial.id)}
        onBlur={(event)=>this.handlePostRequest(event, trial.id)}
        />
        </label>
        </td>
        <td>{trial.archived ? 'Archived' : '-'}
        <label>
        <input 
        type="checkbox"
        name="archived" 
        value={trial.archived}
        checked={trial.archived} 
        onChange={(event)=>{
        this.handleInputChange(event, trial.id);
        this.handlePostRequest(event, trial.id);
        }}
        />
        </label>

        </td>
        <td>{trial.description}</td>
        <td>{trial.firstEnrollmentAt}</td>
        </tr>
        ))}
        </tbody>
        </table>

        </div>
        );
      }
    }

    export default App;
