import React, { Component } from 'react';
import Display from './components/Display/Display';
import Panel from './components/Panel/Panel';
import calculate from './logic/calculate';
import './App.css';
import User from './components/User/User'
import UserHistory from './components/User History/userHistory';
import Calculation from './components/User History/Calculation';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: null,
            next: null,
            operation: null,
            nameValue: '',
            calculations:[],
            limitTo: 10
        }
}

    // this.handleNameChange = this.handleNameChange.bind(this);
    
    componentDidMount () {
        axios
        .get('http://localhost:9000/calculations')
        .then(response => {
            console.log(response);
            this.setState({calculations: response.data})
          }) 
          .catch (error => {
            console.log('Error', error);
          })
    }

    onLoadMore () {
        this.setState({
           limitTo: this.state.limitTo + 10
        });
    }

    handleClick = (buttonName) => {
        this.setState(calculate(this.state, buttonName));
    }

    handleNameChange(event) {
        event.preventDefault();
        this.setState({nameValue: event.target.value});
    }

    submit = event => {
        event.preventDefault();
        window.location.reload();

        const newInput = {
            name: this.state.nameValue,
            calculation: this.state.total
        }

        axios
            .post("http://localhost:9000/user/calculations", newInput)
git             .then(res => {
                console.log("Adding input", res);
                // this.setState({calculations: res.data})
            })
            .catch(err => {
                console.log('Error', err)
            })

    }
   

    render() {
        return (
            <div className='component-app'>
                <Display value={this.state.next || this.state.total || '0'} />
                <Panel clickHandler={this.handleClick} />
                <form onSubmit={this.handleSubmit}>
                    <label>
                     Submit your calculation:
                    <input placeholder = "Name" type="text" value={this.state.nameValue} onChange={this.handleNameChange.bind(this)} />
                    </label>
                    <button onClick={this.submit}> Submit </button>
                </form>

                <h1> Recent Calculations</h1>
                {this.state.calculations.slice(Math.max(this.state.calculations.length - 10, 1)).reverse().map(calculation => {
                    return (
                        <Calculation
                            key = {calculation.id}
                            name = {calculation.name}
                            number = {calculation.calculation}
                        />
                    )
                })}

                <button onClick = {this.onLoadMore.bind(this)}> Load More </button>

            </div>
        );
    }
}

export default App;
