import React, {useId} from 'react'
import Props from 'prop-types'
import './Input.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default Textarea Input with All classes
 */

const CheckBox = React.forwardRef(({label, onChange, placeholder, disabled, readonly, rows, cols, className}, ref) => {

	const ID = useId();

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
            <textarea ref={ref} onChange={changeEvent} rows={rows} cols={cols} placeholder={placeholder} readOnly={readonly} disabled={disabled}>

            </textarea>
        </div>
	)
})

CheckBox.defaultProps = {
    placeholder: '',
    rows: 4,
    cols: 50,
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
	 * Make Textarea disabled
	 */
	readonly: Props.bool,
    /**
	 * Make Textarea disabled
	 */
	disabled: Props.bool,
	/**
	 * Label for Textarea
	 */
	label: Props.string,
    /**
	 * Placeholder for Textarea
	 */
	placeholder: Props.string,
    /**
	 * Number of rows
	 */
	rows: Props.number,
    /**
	 * Number of columns
	 */
	cols: Props.number,
    /**
	 * Max length in Chars
	 */
	maxlength: Props.number,
}

export default CheckBox;
