import React, {useEffect, useId, useState} from 'react'
import Props from 'prop-types'
import {Calendar, DateRangePicker} from 'react-date-range';
import moment from 'moment';
import Modal from '../Modal/Modal';
import './Input.css'
import './Range.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * DateRange component derived from 'react-date-range' and 'date-fns'
 */

const DateRangeInput = React.forwardRef(({label, initialChange=true, backDateSelection=true, minDate, size, disabledDates=[], onChange, disabled, type, defaultValue, className, style}, ref) => {
	const ID = useId();
	const [Picker, setPicker] = useState(undefined);
	const [Range, setRange] = useState(defaultValue?{
		startDate: moment(defaultValue?.startDate?defaultValue.startDate:defaultValue)._d,
		endDate: moment(defaultValue?.endDate?defaultValue.endDate:moment(defaultValue).add(1,'days').valueOf())._d,
		key: 'selection'
	}:{
		startDate: moment()._d,
		endDate: moment().add(1,'days')._d,
		key: 'selection'
	});
	useEffect(() => {
		if(initialChange){
			if(onChange){
				if(type==='range'){
					onChange({
						startDate: moment(Range.startDate).startOf('day').valueOf(),
						endDate: moment(Range.endDate).endOf('day').valueOf()
					})
				}else{
					onChange(moment(Range.startDate).valueOf())
				}
			}
		}
	}, [type]);

	return (
		<>
			<div className={`relative ${className}`}>
				{label!==undefined &&<div className='text-start mb1'>
					<label htmlFor={ID} className={`text-input-label`}>{label}</label>
				</div>
				}
				<input style={{fontSize: size, textIndent: '1.8rem', ...style}} readOnly={true} onClick={() => setPicker(true)} className='pointer'
					   type='text' id={ID} ref={ref} disabled={disabled}
					   value={type === 'range' ? `${moment(Range.startDate).format('DD MMM YY')} | ${moment(Range.endDate).format('DD MMM YY')}` : `${moment(Range.startDate).format('DD MMM YY')}`}
				/>
				<i className='fas fa-calendar absolute' style={{bottom:'1rem', left:'1rem'}}/>
			</div>
			{
				Picker ?
					<Modal width={type === 'range' ? 400:380} blank={true} contentStyle={{
						margin:0
					}} onClose={() => setPicker(undefined)}
						   title={type === 'range' ? 'Select Dates' : 'Select Date'}
						   description='Select dates from the calender'>
						<div className='daterange-wrapper'>
							{
								type === 'range' ?
									<DateRangePicker
										editableDateInputs={true}
										onChange={item => {
											setRange(item.selection);
											if (item.selection.startDate !== item.selection.endDate) {
												setPicker(undefined)
												onChange&&onChange({
													startDate: moment(item.selection.startDate).startOf('day').valueOf(),
													endDate: moment(item.selection.endDate).endOf('day').valueOf()
												})
											}
										}}
										direction="horizontal"
										moveRangeOnFirstSelection={false}
										ranges={[Range]}
										minDate={minDate?minDate:!backDateSelection?new Date():undefined}
										disabledDates={disabledDates}
										rangeColors={['#000']}
									/> :
									<Calendar
										onChange={item => {
											setRange(prev=>({
												...prev,
												startDate: moment(item).startOf('day')._d,
												endDate: moment(item).add(1,'days').endOf('day')._d
											}))
											setPicker(undefined)
											onChange&&onChange(moment(item).valueOf())
										}}
										date={Range.startDate}
										minDate={minDate?minDate:!backDateSelection?new Date():undefined}
										disabledDates={disabledDates}
										color='#000'
									/>
							}
						</div>
					</Modal>
					: <></>
			}
		</>
	)
})

DateRangeInput.defaultProps = {}

DateRangeInput.propTypes = {
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

export default DateRangeInput;

