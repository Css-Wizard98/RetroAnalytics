import React from 'react'
import Props from 'prop-types'
import './Switch.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Toggle Switch with All classes
 */
function Switch({ style, onChange, state, handleRef}) {
	
	return (
		<label className="switch" style={{...style}}>
			<input ref={handleRef} onChange={(e)=>{if(onChange)onChange(e.target.checked)}} type="checkbox" checked={state}/>
			<span className="togglerSlider round"/>
		</label>
	)
}

Switch.propTypes = {
	/**
	 * All Classes
	 */
	className:Props.string,
	/**
	 * Fucation that receives state of switch on change
	 */
	 onChange:Props.func,
	 /**
	 * Boolean to set switch ON/OFF
	 */
	  state:Props.bool,
	 /**
	 * Label for Switch
	 */
	  label:Props.string,
}

export default Switch;

