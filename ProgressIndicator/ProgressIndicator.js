import React from 'react';
import Props from 'prop-types'
import './ProgressIndicator.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Progress Indicator with All classes
 */

function ProgressIndicator({className="", style, stages, active}) {

    let indicators = []

    for(let i=0; i<stages; i++){
        indicators.push(<div key={i} className={active===i+1?'level-active':'level'}/>)
    }

    return (
        <div className={`progress-indicator horizontally center-vertically ${className}`} style={style}>
            {
                indicators.map((stage)=>stage)
            }
        </div>
    );
}

ProgressIndicator.propTypes = {
	/**
	 * All Classes
	 */
	className:Props.string,
}


export default ProgressIndicator;
