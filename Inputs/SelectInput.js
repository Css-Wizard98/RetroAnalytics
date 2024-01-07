import React, {useEffect, useId} from 'react'
import Props from 'prop-types'
import './Input.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default Select Input with All classes
 */

const SelectInput = React.forwardRef(({label, hidePlaceholder, onChange, disabled, defaultValue, placeholder, className, options,style={}}, ref) => {

	const ID = useId();

	useEffect(() => {
		if(defaultValue && ref && ref.current){
			ref.current.value = defaultValue
		}
	}, [defaultValue, ref]);

	const changeEvent = (e) => {
		let val = e.target.value;
		if(onChange){
			onChange(val)
		}
	}

	return (
		<div className={`mt1 ${className}`}>
			<div className='text-start mb1'>
				{label&&<label htmlFor={ID} className={`text-input-label`}>{label}</label>}
			</div>
			<div className='select-wrapper' style={{maxWidth:style.maxWidth?style.maxWidth:'auto'}} >
				<select style={style} ref={ref} onChange={changeEvent} disabled={disabled}>
					{
						!hidePlaceholder&&placeholder&&<option value='NONE'>{placeholder}</option>
					}
					{
						options.map((option, index)=>{
							return (
								<option value={option.value} key={index}>
									{option.label}
								</option>
							)
						})
					}
				</select>
				<i className="fas fa-chevron-down" style={{pointerEvents: 'none'}}/>
			</div>
		</div>
	)
})

SelectInput.defaultProps = {
	defaultValue: '',
	placeholder: '',
	options: []
}

SelectInput.propTypes = {
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
	 * Placeholder Value
	 */
	 placeholder: Props.string,
	/**
	 * Make input disabled
	 */
	disabled: Props.bool,
	/**
	 * Label for input
	 */
	label: Props.string,
}

export default SelectInput;
