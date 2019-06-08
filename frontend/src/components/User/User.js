import React from 'react';
import PropTypes from 'prop-types';
// import Modal from 'react-modal';
import './User.css';

class User extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          nameValue: ''
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({nameValue: event.target.value});
    }
  
    handleSubmit(event) {
      console.log('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        
            <form onSubmit={this.handleSubmit}>
            <label>
                Submit your calculation:
                <input placeholder = "Name" type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <button onClick={this.props.submit}> Submit </button>
            </form>
        
      );
    }
  }
export default User;