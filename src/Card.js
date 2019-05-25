import React from 'react';
import './App.css';

const Card = (props) => {

    return (


        <div className="card-container">
            <span>"{props.quote}"</span>

            <h1>{props.author}</h1>
        </div>


    );
}

export default Card;