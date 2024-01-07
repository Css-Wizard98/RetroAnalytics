import React, {useState} from 'react'
import Props from 'prop-types'
import moment from 'moment';
import './Input.css'
import './Range.css'
import {RangeDatePicker, SingleDatePicker} from "../index";
import './override.css'


const DateRangeInputNew = React.forwardRef(({label, initialChange=true, backDateSelection=true, minDate, size, disabledDates=[], onChange, disabled, type, defaultValue, className, style}, ref) => {
	const [Range] = useState(defaultValue?{
		startDate: moment(defaultValue.startDate)._d,
		endDate: moment(defaultValue.endDate)._d
	}:{
		startDate: moment().startOf('day')._d,
		endDate: moment().add(1,'days').endOf('day')._d
	});
	if(type==="range"){
		return (
			<RangeDatePicker minDate={minDate?minDate._d:undefined} startDate={Range.startDate} endDate={Range.endDate} onChange={(startDate,endDate)=>{
				if(startDate && endDate){
					onChange({
						startDate: moment(startDate).startOf('day').valueOf(),
						endDate: moment(endDate).endOf('day').valueOf()
					})
				}
			}}/>
		)
	}else{
		return (
			<SingleDatePicker minDate={minDate?minDate._d:undefined} startDate={Range.startDate} onChange={(startDate)=>{
				onChange({
					startDate: moment(startDate).valueOf(),
				})
			}}/>
		)
	}

})

DateRangeInputNew.defaultProps = {}

DateRangeInputNew.propTypes = {
	/**
	 * Use external css classes
	 */
	className: Props.string,
	/**
	 * Function to handle onChange event
	 */
	onChange: Props.func,
	/**
	 * Default date
	 */
	defaultValue: Props.any,
	/**
	 * Make input disabled
	 */
	disabled: Props.bool,
	/**
	 * Label for input
	 */
	label: Props.string,
	/**
	 * Set type 'range' if require range selection
	 */
	type: Props.string,
}

export default DateRangeInputNew;
