import React from 'react';


const Calculation = props => {
    return (
        <div className = "leader-card">
            
                <h3 className = 'noteCardTitle '> {props.name} </h3>
                <p className = 'number'>{props.number}</p>
                
            

            
        </div>
    )
}

export default Calculation;