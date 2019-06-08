import React from 'react';


const Calculation = props => {
    return (
        <div >
            
                <h3 className = 'noteCardTitle '> {props.name} </h3>
                <p>{props.number}</p>
                
            

            
        </div>
    )
}

export default Calculation;