import React from 'react';

function Card({ state, confirmed, active, deaths, recovered }){
    return (
        <li className="card" key={state}>
            <h3>{state}</h3>
            <p>Total: {confirmed}</p>
            <p>Active: {active}</p>
            <p>Deaths: {deaths}</p>
            <p>Recovered: {recovered}</p>
        </li>
    )
}

export default Card