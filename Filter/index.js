import React, {useEffect, useId, useState} from 'react'
import SettingsIcon from "@atlaskit/icon/glyph/settings";
import Moment from "moment";
import Modal from "../Modal/Modal";
import {DateRangePicker} from "react-date-range";
import moment from "moment/moment";
import './index.css'
import Sort from './sort.svg'
import FilterIcon from './filter.svg'
import {Button} from "../index";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";

function Search({onSearch, border = "border-left"}) {
	const ID = useId();
	const [Value, setValue] = useState('');

	const changeEvent = (e) => {
		let val = e.target.value;
		setValue(val)
		if (onSearch) {
			onSearch(val)
		}
	}

	if (!onSearch) {
		return <></>
	}
	return (
		<div className={`flex horizontally hidden ${border} pl2 pr2  center-vertically`} style={{
			width: 200,
			marginTop: 8,
			marginBottom: 8
		}}>
			<i className="fas fa-search" style={{}}/>
			<input className="no-bg" autoComplete="off" type='text' style={{
				border: "none",
				width: 175,
				fontWeight: 500
			}} id={ID} onChange={changeEvent} placeholder="Search" value={Value}/>
		</div>
	)
}

export default function Filter({
								   border = "border-right",
								   sortValue = undefined,
								   sortChoices = [],
								   children,
								   onFilter,
								   onDateChange = undefined,
								   actions = undefined,
								   onSearch,
								   onSort,
								   customizeLabels,
								   margin = "calc(-2rem - 1px) -4rem 0",
								   padding = '0 4rem'
							   }) {
	const [dates, setDates] = useState(onDateChange && onDateChange.default ? onDateChange.default : {
		startDate: Moment().add(-31, 'd').valueOf(),
		endDate: Moment().valueOf()
	})
	const [Range, setRange] = useState(onDateChange && onDateChange.default ? {
		startDate: moment(onDateChange.default.startDate)._d,
		endDate: moment(onDateChange.default.endDate)._d,
		key: 'selection'
	} : {
		startDate: moment().add(-31, 'days')._d,
		endDate: moment().add(1, 'days')._d,
		key: 'selection'
	});
	useEffect(() => {
		if (dates && onDateChange) {
			onDateChange.setRange(dates)
		}
	}, [dates])
	const [sort, setSort] = useState(sortValue)
	const [sortModal, setSortModal] = useState(false)
	const [Picker, setPicker] = useState(false)
	if (!onDateChange) {
		return (
			<div className="border-top filterBar flex horizontally border-bottom overScrollX" style={{
				height: 48,
				margin,
				padding,
				background: "white"
			}}>
				{
					sortModal && <Modal rounded={true} width={375} onClose={() => {
						setSortModal(false)
					}} title="Select Sort Criteria" blank={true}>
						<RadioGroup
							defaultValue={sort}
							aria-labelledby="demo-radio-buttons-group-label"
							name="radio-buttons-group" onChange={e => {
							setSort(e.target.value)
						}}>
							{
								sortChoices.map(item => {
									return <FormControlLabel key={item} value={item} control={<Radio size="small"/>}
															 label={item}/>
								})
							}
						</RadioGroup>
						<div className="flex horizontally center-vertically mt3">
							<Button onClick={() => {
								setSortModal(false)
								if (sort) {
									onSort(sort)
								}
							}} className="btn btn-black" margin="">
								Apply
							</Button>
							<p className="ml2 pointer" style={{textTransform: 'underline'}} onClick={() => {
								setSortModal(false)
							}}>
								Cancel
							</p>
						</div>
					</Modal>
				}
				<Search border={border} onSearch={onSearch}/>
				<div className="flex horizontally h-100 center-vertically">
					{
						onSort && 	<div onClick={() => {
							setSortModal(true)
						}} className="btn-paper fw-500 btn flex horizontally">
							<img alt="sort" src={Sort} style={{width: 16}} className="mr1"/>
							<p className="fw-500">
								Sort
							</p>
						</div>
					}
					{
						onFilter && <div  onClick={onFilter} className="btn-paper  fw-500 btn flex horizontally">
							<img alt="sort" src={FilterIcon} style={{width: 16}} className="mr1"/>
							<p  className="fw-500">
								Filter
							</p>
						</div>
					}
				</div>
				{
					(customizeLabels || actions) &&
					<div style={{margin: 8}} className="flex border-left horizontally center-vertically pl2 pr2">
						{
							customizeLabels && <div onClick={customizeLabels} className="btn-paper fw-500 btn">
								<SettingsIcon size='small'/>
								<p className="ml1">
									Customize Labels
								</p>
							</div>
						}
						{actions}
					</div>
				}
				{
					children && 	<div style={{marginTop: 8, marginBottom: 8}}
										className="flex horizontally center-vertically pl2 ml2 pr2 border-left">
						{children}
					</div>
				}
			</div>
		)
	}
	return (
		<div className="border-top filterBar flex horizontally border-bottom overScrollX" style={{
			height: 48,
			margin,
			padding,
			background: "white"
		}}>
			{
				sortModal && <Modal rounded={true} width={375} onClose={() => {
					setSortModal(false)
				}} title="Select Sort Criteria" blank={true}>
					<RadioGroup
						defaultValue={sort}
						aria-labelledby="demo-radio-buttons-group-label"
						name="radio-buttons-group" onChange={e => {
						setSort(e.target.value)
					}}>
						{
							sortChoices.map(item => {
								return <FormControlLabel key={item} value={item} control={<Radio size="small"/>}
														 label={item}/>
							})
						}
					</RadioGroup>
					<Button onClick={() => {
						setSortModal(false)
						if (sort) {
							onSort(sort)
						}
					}} className="btn btn-black" margin="mt2">
						Apply
					</Button>
				</Modal>
			}
			{
				(onDateChange || onSort) && <div className="border-right flex  center-vertically pr4 mr2"
												 style={{marginTop: 8, height: 'calc(100% - 16px)', marginBottom: 8}}>
					{
						onDateChange && <div onClick={() => {
							setPicker(true)
						}} className="flex pointer  horizontally mr2 center-vertically">
							<i className="fa-calendar fa mr2"/> <p
							style={{width: 125}}
							className="fw-500 text-truncate">{Moment(dates.startDate).format("DD MMM")} - {Moment(dates.endDate).format("DD MMM YY")}</p>
						</div>
					}
				</div>
			}
			<div className="flex horizontally h-100 center-vertically">
				{
					onSort && 	<div onClick={() => {
						setSortModal(true)
					}} className="btn-paper fw-500 btn flex horizontally">
						<img alt="sort" src={Sort} style={{width: 16}} className="mr1"/>
						<p className="fw-500">
							Sort
						</p>
					</div>
				}
				{
					onFilter && <div  onClick={onFilter} className="btn-paper  fw-500 btn flex horizontally">
						<img alt="sort" src={FilterIcon} style={{width: 16}} className="mr1"/>
						<p  className="fw-500">
							Filter
						</p>
					</div>
				}
			</div>
			{
				(customizeLabels || actions) && <div className="flex horizontally center-vertically pl2 pr2">
					{
						customizeLabels && <div onClick={customizeLabels} className="btn-paper fw-500 btn">
							<SettingsIcon size='small'/>
							<p className="ml1">
								Customize Labels
							</p>
						</div>
					}

					{actions}
				</div>
			}
			<div style={{marginTop: 8, marginBottom: 8}}
				 className="flex horizontally center-vertically pl2 ml2 pr2 border-left">
				{children}
			</div>
			<Search onSearch={onSearch}/>
			{
				Picker ?
					<Modal width={400} blank={true} contentStyle={{
						margin: 0
					}} onClose={() => setPicker(undefined)}
						   title={'Select Dates'}
						   description='Select dates from the calender'>
						<div className='daterange-wrapper'>
							<DateRangePicker
								editableDateInputs={true}
								onChange={item => {
									setRange(item.selection);
									if (item.selection.startDate !== item.selection.endDate) {
										setPicker(undefined)
										setDates({
											startDate: moment(item.selection.startDate).startOf('day').valueOf(),
											endDate: moment(item.selection.endDate).endOf('day').valueOf()
										})
									}
								}}
								direction="horizontal"
								moveRangeOnFirstSelection={false}
								ranges={[Range]}
								rangeColors={['#000']}
							/>
						</div>
					</Modal>
					: <></>
			}
		</div>
	)
}
