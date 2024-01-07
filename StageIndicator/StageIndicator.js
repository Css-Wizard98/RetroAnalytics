import React from 'react';
import Props from 'prop-types'
import './StageIndicator.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Stages Indicator with All classes
 */

function StageIndicator({className="", style, stages, active}) {

    return (
        <div className={`stage-indicator horizontally center-vertically ${className}`} style={style}>
            {
                stages.map((stage, index)=>{
                    index= index+1
                    return (
                        <div key={stage} className={`stage ${active===index?'active':''}`}>
                            {
                                index>1&&<div className='stage-trail'><div/></div>
                            }
                            <div className={`stage-count ${active>index?'completed':active===index?'active':''}`}>
                                {active>index?<i className='fas fa-check'/>:index}
                            </div>
                            <div className='stage-label'>{stage}</div>
                        </div>
                    )
                })
            }
        </div>
    );
}

StageIndicator.propTypes = {
	/**
	 * All Classes
	 */
	className:Props.string,
}


export default StageIndicator;
