import React from 'react'
import Props from 'prop-types'
import FolderIcon from './folder.webp'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Empty Placeholder
 */
function Empty({label='No Items found',className="center",style}) {

	return (
       <div style={{...style}} className={`w-100 pd6 rounded-sm text flex  ${className}`}>
			<img src={FolderIcon} alt='ICON' style={{width:50, marginRight: '1rem'}}/>
		   	<span>
				{label}
			</span>
	   </div>
	)
}

Empty.propTypes = {
	/**
	 * All Classes
	 */
	className:Props.string,
	/**
	 * Pass function u want to call on click
	 */
	onSubmit:Props.func,
}

export default Empty;

