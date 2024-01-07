import React, {useId} from 'react'
import Props from 'prop-types'
import moment from 'moment';
import './Input.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default Time Input with All classes
 */

const Timeinput = React.forwardRef(({label, onChange, disabled, defaultValue, className}, ref) => {

	const ID = useId();

	const changeEvent = (e) => {
		let val = e.target.value;
		if(onChange){
			val = moment(moment(val,'HH:mm')).valueOf()
			onChange(val)
		}
	}

	return (
		<div className={`mt1 ${className}`}>
			<div className='text-start mb1'>
				{label&&<label htmlFor={ID} className={`text-input-label`}>{label}</label>}
			</div>
			<input type='time' style={{textTransform:'uppercase'}} id={ID} onChange={changeEvent} ref={ref} disabled={disabled} defaultValue={defaultValue?moment(defaultValue).format('HH:mm'):moment().format('HH:mm')}/>
		</div>
	)
})

Timeinput.defaultProps = {
}

Timeinput.propTypes = {
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
	defaultValue: Props.number,
	/**
	 * Make input disabled
	 */
	disabled: Props.bool,
	/**
	 * Label for input
	 */
	label: Props.string,
}

export default Timeinput;
