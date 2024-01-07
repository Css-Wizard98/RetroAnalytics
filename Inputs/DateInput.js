import React, {useEffect, useId} from 'react'
import Props from 'prop-types'
import moment from 'moment';
import './Input.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default Date Input with All classes
 */

const DateInput = React.forwardRef(({label, onChange, disabled, defaultValue, className}, ref) => {

	const ID = useId();

	const changeEvent = (e) => {
		let val = e.target.value;
		if(onChange){
			val = moment(moment(val,'YYYY-MM-DD')).valueOf()
			onChange(val)
		}
	}


	useEffect(()=>{
		if(defaultValue && ref && ref.current){
			ref.current.value = moment(defaultValue).format('YYYY-MM-DD')
		}
	},[defaultValue])

	return (
		<div className={`mt1 ${className}`}>
			<div className='text-start mb1'>
				{label&&<label htmlFor={ID} className={`text-input-label`}>{label}</label>}
			</div>
			<input type='date' style={{textTransform:'uppercase'}} id={ID} onChange={changeEvent} ref={ref} disabled={disabled} defaultValue={defaultValue?moment(defaultValue).format('YYYY-MM-DD'):moment().format('YYYY-MM-DD')}/>
		</div>
	)
})

DateInput.defaultProps = {
}

DateInput.propTypes = {
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
	 * Make input disabled
	 */
	disabled: Props.bool,
	/**
	 * Label for input
	 */
	label: Props.string,
}

export default DateInput;
