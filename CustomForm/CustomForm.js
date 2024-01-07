import React, {useEffect, useRef, useState} from 'react'
import {DateInput, FileInput, Input, SearchInput, SelectInput, Timeinput, TOAST} from '../index'
import {MasterInput} from './Master'
import moment from 'moment'

function FormRenderer({forms, handleRef, callback, token, prefill}) {

	let INPUTS = useRef({}), FILES = useRef({});
	const [LOCATIONS, setLOCATIONS] = useState({});
	const [CITY, setCITY] = useState({});
	const [AIRPORTS, setAIRPORTS] = useState({});
	const [Master, setMaster] = useState({});

	const [OthersInput, setOthersInput] = useState({});

	let hideFieldId = prefill && Object.keys(prefill).length>0 ? prefill["-3"] || '-1' : "-1"

	const mapItems = (item) => {
		if (item.type === 'EMAIL' || item.type === 'NUMBER' || item.type === 'TEXT') {
			return (
				<Input defaultValue={prefill?prefill[item.id]:''} key={item.id} className='mt2' label={item.name} type={item.type.toLowerCase()} placeholder={item.placeholder} ref={ref=>INPUTS.current[`input_${item.id}`] = ref}/>
				)
		} else if (item.type === "DATE") {
			let defaultValue = prefill?prefill[item.id]:''
			if(defaultValue&&defaultValue.includes('-'))
			defaultValue = moment(moment(prefill[item.id],'DD-MM-YYYY')).valueOf()

			return (
				<DateInput defaultValue={defaultValue} key={item.id} className='mt2' label={item.name} placeholder={item.placeholder} ref={ref=>INPUTS.current[`input_${item.id}`] = ref}/>
			)
		} else if (item.type === "SELECT") {
			return (
				<>
				<SelectInput defaultValue={prefill?prefill[item.id]:''} key={item.id} className='mt2' label={item.name} placeholder={item.name} options={item.values.map(item=>({label: item.value, value: item.key}))} onChange={val=>setOthersInput(prev=>({...prev, [`input_${item.id}`]: val}))} ref={ref=>INPUTS.current[`input_${item.id}`] = ref}/>
				{
					OthersInput[`input_${item.id}`] === 'Others' &&
					<Input key={item.id} className='mt2' label='Enter value for others' type='text' placeholder='Others' ref={ref=>INPUTS.current[`input_${item.id}`] = ref}/>
				}
				</>
			)
		} else if (item.type === "FILE") {
			return (
				<div key={item.id} className='flex flex-wrap'>
					<FileInput mono={true} className='mt2' label={item.name} updateFiles={(file)=>{FILES.current[`input_${item.id}`] = file}}/>
				</div>
			)
		} else if(item.type === 'MASTER') {
			return(
				<div key={item.id}>
					<MasterInput defaultValue={prefill?prefill[item.id]:''}  className='mt2'
						label={`${item.name} ${item.required?'*':''}`}
						placeholder={`Search ${item.name}`}
						fieldId={item.fieldId?item.fieldId:item.name}
						master={Master}
						handleRef={ref => {INPUTS.current[`input_${item.id}`] = ref}}
						details={item}
						token={token}
						onUpdate={(key,value)=>{
							let obj = {...Master};
							obj[key] = value;
							setMaster({obj})
						}}

					/>
				</div>
			)
		} else if(item.type === 'LOCATION') {
			return(
				<div style={{
					display:`${hideFieldId}` === `${item.id}` ? "none" : "block"
				}}>
					<SearchInput geocode={true} key={item.id} value={prefill?prefill[item.id]:''} className='mt2' api='/search/places' onSelect={(place)=>{setLOCATIONS(prev=>({...prev,[`input_${item.id}`]:place}))}} selected={LOCATIONS[`input_${item.id}`]} label={item.name} placeholder={item.name}/>
				</div>
			)
		} else if(item.type === 'AIRPORT') {
			return(
				<SearchInput key={item.id} value={prefill?prefill[item.id]:''} className='mt2' api='/search/airports' onSelect={(place)=>{setAIRPORTS(prev=>({...prev,[`input_${item.id}`]:place}))}} selected={AIRPORTS[`input_${item.id}`]} label={item.name} placeholder={item.name}/>
			)
		} else if(item.type === 'CITY') {
			return(
				<SearchInput key={item.id} value={prefill?prefill[item.id]:''} className='mt2' api='/search/cities' onSelect={(place)=>{setCITY(prev=>({...prev,[`input_${item.id}`]:place}))}} selected={CITY[`input_${item.id}`]} label={item.name} placeholder={item.name}/>
			)
		} else if(item.type === 'RATING') {
			return(
				<div key={item.id}>

				</div>
			)
		} else if(item.type === 'TIME') {
			return(
				<div key={item.id}>
					<Timeinput defaultValue={prefill?prefill[item.id]:''} key={item.id} className='mt2' label={item.name} placeholder={item.placeholder} ref={ref=>INPUTS.current[`input_${item.id}`] = ref}/>
				</div>
			)
		}

	}

	useEffect(() => {
		if(handleRef){
			handleRef(() => {
				if(forms&&forms.length){
					let data = {}
					for (let item of forms) {

						if (item.type === 'EMAIL' || item.type === 'NUMBER' || item.type === 'TEXT') {
							let value = INPUTS.current[`input_${item.id}`].value;
							if (!value && item.required) {
								TOAST.error(`${item.name} is required`)
								return false;
							}
							data[item.id] = value.toString();
						} else if (item.type === 'DATE') {
							let value = INPUTS.current[`input_${item.id}`].value;
							if (!value && item.required) {
								TOAST.error(`${item.name} is required`)
								return false;
							}
							data[item.id] = moment(moment(value,'YYYY-MM-DD')).valueOf().toString();
						} else if (item.type === 'SELECT') {
							let value = INPUTS.current[`input_${item.id}`].value;
							if (!value || value === "NONE" && item.required) {
								TOAST.error(`Select a value for ${item.name}`)
								return false;
							}
							data[item.id] = value.toString();
						} else if (item.type === 'FILE') {
							let value = FILES.current[`input_${item.id}`];
							if (!value && item.required) {
								TOAST.error(`${item.name} attachment is required`)
								return false;
							}
							data[item.id] = value.toString();
						} else if(item.type === 'MASTER') {
							let value = INPUTS.current[`input_${item.id}`].getValue();
							if(!value && item.required) {
								TOAST.error(`${item.name} is required`)
								return false;
							}
							data[item.id] = value.toString();
						} else if (item.type === 'LOCATION') {
							let value = LOCATIONS[`input_${item.id}`];
							if (!value && item.required) {
								TOAST.error(`${item.name} location is required`)
								return false;
							}
							data[item.id] = value.toString();
						} else if (item.type === 'AIRPORT') {
							let value = AIRPORTS[`input_${item.id}`];
							if (!value && item.required) {
								TOAST.error(`${item.name} location is required`)
								return false;
							}
							data[item.id] = value.toString();
						} else if (item.type === 'CITY') {
							let value = CITY[`input_${item.id}`];
							if (!value && item.required) {
								TOAST.error(`${item.name} location is required`)
								return false;
							}
							data[item.id] = value.cityId?.toString();
						} else if (item.type === 'TIME') {
							let value = INPUTS.current[`input_${item.id}`].value;
							if (!value && item.required) {
								TOAST.error(`${item.name} is required`)
								return false;
							}
							data[item.id] = moment(moment(value,'HH:mm')).valueOf().toString();
						}
					}
					if(callback){
						callback(data)
					}
					return data
				}else{
					return {}
				}
			})
		}
	}, [handleRef, callback, forms, FILES, LOCATIONS, AIRPORTS, CITY]);

	if(!forms.length){
		return <></>
	}
	return (
		forms.map(mapItems)
	);
}

export default FormRenderer;
