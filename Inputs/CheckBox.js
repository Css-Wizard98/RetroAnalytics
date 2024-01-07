import React, {useId} from 'react'
import Props from 'prop-types'
import './Input.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default Checkbox Input with All classes
 */

const CheckBox = React.forwardRef(({label,style, onChange, disabled, checked, className="mt1 center-vertically"}, ref) => {

	const ID = useId();

	const changeEvent = (e) => {
		e.stopPropagation()
		let val = e.target.checked;
		if(onChange){
			onChange(val)
		}
	}

	return (
		<div style={style} className={`flex horizontally ${className}`}>
			<input type='checkbox' onClick={e=>{e.stopPropagation()}} className='check-input mr1' id={ID} onChange={changeEvent} ref={ref} disabled={disabled} checked={checked}/>
            {label&&<label htmlFor={ID} className={`check-label`}>{label}</label>}
		</div>
	)
})

CheckBox.defaultProps = {
}

CheckBox.propTypes = {
	/**
	 * Use external css classes
	 */
	className:Props.string,
	/**
	 * Function to handle onChange event
	 */
	onChange:Props.func,
	/**
	 * Set checked by default
	 */
	checked: Props.bool,
	/**
	 * Make Checkbox disabled
	 */
	disabled: Props.bool,
	/**
	 * Label for Checkbox
	 */
	label: Props.string,
}

export default CheckBox;
