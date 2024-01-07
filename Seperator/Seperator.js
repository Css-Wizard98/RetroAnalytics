import React from 'react';
import Props from 'prop-types'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Horizontal line sperator with all classes
 */

function Seperator({className, style, margin=3}) {
    return (
        <div className={`border-top w-100 mt${margin} mb${margin}`} style={style}/>
    );
}


Seperator.propTypes = {
	/**
	 * All Classes
	 */
	className:Props.string,
    /**
	 * Style Object
	 */
	style:Props.string,
    /**
	 * Top and Bottom margin [1,2,3,4,5,6]
	 */
	margin:Props.number,
}

export default Seperator;
