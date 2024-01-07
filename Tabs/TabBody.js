import React from 'react'
import Props from 'prop-types'
import './Tabs.css'
import '../Animation/Animation.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Tabs body container with all classes
 */

function TabBody ({active, label, children, className}) {

	if(active===label){
        return (
            <div className={`FadeInRight-Effect mt3 ${className}`}>
                {children}
            </div>
        )
    }else{
        return <></>
    }
}

TabBody.propTypes = {
	/**
	 * Use external css classes
	 */
	className:Props.string,
    /**
	 * Label of currently active tab
	 */
	active:Props.string,
    /**
	 * label of tab with which this content is tied
	 */
     label:Props.string,
}

export default TabBody;
