import React from 'react';
// import User from '../User/User';
import axios from 'axios';
import Calculation from './Calculation'

class UserHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calculations: []
        }
    }

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

    
        // addNew = event => {
        //     event.preventDefault();
        //     axios
        //         .post('http://localhost:9000/user/calculations', calculations)
        //         .then (res => {
        //             console.log('adding new calculation', res);
        //             this.setState({calculations: res.data})
        //         })
        //         .catch(err => {
        //             console.log('ERROR', err)
        //         })
        //     }
    render() {
        return (
            <div>
                <h1> Recent Calculations</h1>
                {this.state.calculations.map(calculation => {
                    return (
                        <Calculation
                            key = {calculation.id}
                            name = {calculation.name}
                            number = {calculation.calculation}
                        />
                    )
                })}
            </div>
        )
    }
}

export default UserHistory;