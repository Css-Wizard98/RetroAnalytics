import React, {useEffect, useId, useState} from 'react'
import Props from 'prop-types'
import './Input.css'
import {sanitizeInput} from '../Utils'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default Text Input with All classes
 */

const Input = React.forwardRef(({id='', allowSpecialCharacters, label, placeholder, type, onChange,children, disabled,onBlur, validation, defaultValue, className="mt1", min, max, style,onKeyDown}, ref) => {
	const morph = false;
	const ID = useId();
	const [Value, setValue] = useState('');
	const [Valid, setValid] = useState(defaultValue?true:undefined);

	useEffect(() => {
		if(defaultValue){
			setValue(defaultValue)
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
		if(type==='number'&& ((min!==undefined&&Number(val)<min) || ( max!==undefined&&Number(val)>max))){
			return
		}
		console.log(val);
		setValue(val)
	}

	const disableScrollForNumberInput = (e) => {
		/* If input type is number disable scrolling behavior to change the number on focus */
		if (type === 'number') {
			e.target.blur();
		}
	}

	return (
		<div id={id} className={`${className}`} style={style}>
			<div className='text-start mb1 text-truncate'>
				{(label&&!morph)&&<label htmlFor={ID} className={`text-input-label ${Valid===true?'valid':''} ${Valid===false?'invalid':''}`}>{label}</label>}
			</div>
			<div className={`relative`}>
				<input onKeyDown={onKeyDown} className={`${Valid===true?'valid':''} ${Valid===false?'invalid':''}`} id={ID} onBlur={()=>{
					if(onBlur)
						onBlur()
				}} onChange={changeEvent} ref={ref} type={type} placeholder={!morph?placeholder:''} disabled={disabled} value={Value}

				onWheel={disableScrollForNumberInput}
				/>
				{(label&&morph)&&<label htmlFor={ID} className={`morph-label ${Value?'morph-active':''} ${Valid===true?'valid':''} ${Valid===false?'invalid':''}`}>{label}</label>}
				{children}
			</div>
		</div>
	)
})

Input.defaultProps = {
	defaultValue: '',
	placeholder: '',
	morph:false,
	type: 'text'
}

Input.propTypes = {
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
	defaultValue: Props.string,
	/**
	 * Min Value for number Input
	 */
	 min: Props.number,
	 /**
	 * Max Value for number Input
	 */
	max: Props.number,
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

export default Input;
export {Input};
export {default as SearchBox} from './SearchBox'
