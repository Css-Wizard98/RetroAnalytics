import React, {useEffect, useId, useState} from 'react'
import Props from 'prop-types'
import './Input.css'
import {sanitizeInput} from '../Utils'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default Text Input with All classes
 */

const DeltaInput = React.forwardRef(({label,margin="mt1", allowSpecialCharacters, placeholder, type, morph, onChange, onUpdate, disabled, validation, defaultValue, className}, ref) => {
	morph = false;
	if(!placeholder)
		placeholder = `Enter ${label.toLowerCase()}`
	const ID = useId();
	const [Value, setValue] = useState('');
	const [Valid, setValid] = useState(undefined);
	const [Delta, setDelta] = useState(undefined);

	useEffect(() => {
		if(defaultValue){
			setValue(defaultValue)
			setDelta(undefined)
		}
	}, [defaultValue]);

	const changeEvent = (e) => {
		let val = e.target.value
		if(!allowSpecialCharacters){
			val = sanitizeInput(val);
		}
		if(onChange){
			onChange(val)
		}
		if(validation){
			if(val){
				if(validation(val)){
					setValid(true)
				}else{
					setValid(false)
				}
			}else{
				setValid(undefined)
			}
		}else {
			if(val){
				setValid(true)
			}else{
				setValid(false)
			}
		}
		if(val!==defaultValue){
			setDelta(true)
		}else{
			setDelta(undefined)
		}

		setValue(val)
	}

	return (
		<div className={`${margin} ${className}`}>
			<div className='text-start mb1'>
				{(label&&!morph)&&<label htmlFor={ID} className={`text-input-label ${Valid===true?'valid':''} ${Valid===false?'invalid':''}`}>{label}</label>}
			</div>
			<div className={`relative`}>
				<input className={`${Valid===true?'valid':''} ${Valid===false?'invalid':''}`} id={ID} onChange={changeEvent} ref={ref} type={type} placeholder={!morph?placeholder:''} disabled={disabled} value={Value}/>
				{(label&&morph)&&<label htmlFor={ID} className={`morph-label ${Value?'morph-active':''} ${Valid===true?'valid':''} ${Valid===false?'invalid':''}`}>{label}</label>}
				{
					Delta&&<div onClick={()=>onUpdate(Value)} className='delta-btn'><i className="text-white fas fa-check"></i></div>
				}
				{
					disabled&&<div className='delta-btn'><i className="text-white fas fa-lock"></i></div>
				}
			</div>
		</div>
	)
})

DeltaInput.defaultProps = {
	defaultValue: '',
	placeholder: '',
	morph:false,
	type: 'text'
}

DeltaInput.propTypes = {
	/**
	 * Use external css classes
	 */
	className:Props.string,
	/**
	 * Function to handle onChange event
	 */
	onChange:Props.func,
	/**
	 * Default value of input
	 */
	defaultValue: Props.any,
	/**
	 * Make input disabled
	 */
	disabled: Props.bool,
	/**
	 * Function for validating input
	 */
	validation: Props.func,
	/**
	 * Label for input
	 */
	label: Props.string,
	/**
	 * Placeholder for input
	 */
	placeholder: Props.string,
	/**
	 * Label doubles as placeholder
	 */
	morph: Props.bool,
	/**
	 * Field Type
	 * text
	 * number
	 * password
	 * email
	 */
	type: Props.string
}

export default DeltaInput;
