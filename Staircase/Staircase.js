import React from 'react';
import './Staircase.css';

function Staircase({steps, onDelete, className=''}) {
    
    const rederSteps = (item, index)=>{
        return(
            <div key={`step-${index}`} className="step">
                <div className="track-point">
                    <div className='point text-small'>{index+1}</div>
                    <div className='point-text'>{item}</div>
                    {
                        onDelete&&
                        <div onClick={()=>onDelete(item)}><i className='fas fa-trash pointer'/></div>
                    }
                </div>
            </div>
        );
    }

    if(!steps){
        return(<>No Props Passed ....</>);
    }
    
    if(steps.length)
    return (
        <div className={`staircase ${className}`}>
            <div className="track"></div>
            <div className='w-100'>
                {steps?.map(rederSteps)}
            </div>
        </div>
    );

    return <></>
}

export default Staircase;