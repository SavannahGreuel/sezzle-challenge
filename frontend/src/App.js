import React, { Component } from 'react';
import Display from './components/Display/Display';
import Panel from './components/Panel/Panel';
import calculate from './logic/calculate';
import './App.css';
import socketIOClient from 'socket.io-client'
// import User from './components/User/User'
// import UserHistory from './components/User History/userHistory';
import Calculation from './components/User History/Calculation';
import axios from 'axios';

const URL = 'https://guarded-hamlet-96437.herokuapp.com'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: null,
            next: null,
            operation: null,
            nameValue: '',
            calculations:[],
            limitTo: 10,
            endpoint: "https://guarded-hamlet-96437.herokuapp.com/"
        }
}

    // this.handleNameChange = this.handleNameChange.bind(this);
    
    componentDidMount () {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("FromAPI", data => this.setState({calculations: data }));
        // axios
        // .get(`${URL}/calculations`)
        // .then(response => {
        //     console.log(response);
        //     this.setState({calculations: response.data})
        //   }) 
        //   .catch (error => {
        //     console.log('Error', error);
        //   })
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
        // event.preventDefault();
        
        const newInput = {
            name: this.state.nameValue,
            calculation: this.state.total
        }
        
        axios
        .post(`${URL}/user/calculations`, newInput)
        .then(res => {
            console.log("Adding input", res);
            // this.setState({calculations: res.data})
        })
        .catch(err => {
            console.log('Error', err)
        })
        
        // window.location.reload();
    }
   

    render() {
        return (
            <div className='component-app'>
                <div className = "calculator">
                <Display value={this.state.next || this.state.total || '0'} />
                <Panel clickHandler={this.handleClick} />
                </div>
                
                <form onSubmit={this.handleSubmit}>
                    
                     <p className = 'leaderBoard'>Submit your calculation to our leader board:</p>
                <div className = 'input'>
                    <input className = 'selection' placeholder = "Name" type="text" value={this.state.nameValue} onChange={this.handleNameChange.bind(this)} />
                    <button className = "submit-button" onClick={this.submit}> Submit </button>
                </div>
                </form>

                <h1 className = "calculations"> Leader Board</h1>
                <div className = 'individual'>
                {this.state.calculations.slice(Math.max(this.state.calculations.length - 10, 1)).reverse().map(calculation => {
                    return (
                        
                            <Calculation
                                
                                key = {calculation.id}
                                name = {calculation.name}
                                number = {calculation.calculation}
                            />
                        
                    )
                })}
                </div>

                {/* <button onClick = {this.onLoadMore.bind(this)}> Load More </button> */}

            </div>
        );
    }
}

export default App;
