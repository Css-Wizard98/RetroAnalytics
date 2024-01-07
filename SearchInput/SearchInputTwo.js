import React, {useCallback, useEffect, useRef, useState} from 'react';
import './index.css'
import {get} from '../../App/Network/Axios'
import {debounce} from "../Utils";
import {Portal} from "../index";
import Arrow from './arrow.png'

function Index({label, geocode, placeholder,   value, onSelect, selected, api,resultKey, className='', searchKey='name'}) {
	const [Value, setValue] = useState(value?value:'');
	const [FilteredValues, setFilteredValues] = useState([]);
	let INPUT = useRef(null);
	const [modal,setModal] = useState(false)
	useEffect(() => {
		if(selected){
			if(typeof(selected)==='object'){
				setValue(`${selected[searchKey]?selected[searchKey]:''}`)
			}else{
				//Remove Gecords from user view
				if(selected.includes('@')){
					setValue(selected.split('@')[1])
				}else{
					setValue(selected)
				}
			}
		}
	}, [selected,searchKey]);


	// eslint-disable-next-line
	const onChange = useCallback(debounce(() => {
		let val = INPUT.current.value;
		if(val.length>1){
			get(`${api}`, (e,r)=>{
				if(r){
					if(typeof(r)==='object'){
						let key = Object.keys(r)[0]
						if(resultKey)
							key = resultKey;
						setFilteredValues(r[key])
					}else{
						setFilteredValues(r)
					}
				}
			},{q:val})
		}else{
			setFilteredValues([])
		}
	}), [])

	const selectItem = (item) => {
		if(geocode){
			reverseGeocode(item)
		}else{
			setValue(`${item[searchKey]}`);
			onSelect(item)
			setModal(false)
		}
		setFilteredValues([])
	}

	const reverseGeocode = (location) => {
		get(`/search/geocode.reverse`, (e,r)=>{
			if(r){
				onSelect(`${r.lat}:${r.lng}@${location}`)
			}
		},{name: location})
	}
	let val = INPUT.current?INPUT.current.value:"";
	return (
		<>
			<div className={`relative ${className}`}>
				<div className='text-start mb1'>
					<label className={`text-input-label `}>{label}</label>
				</div>
				<p onClick={()=>{setModal(true)}} className="search-input-mock">
					{
						Value?Value:placeholder?placeholder:label
					}
				</p>
				{
					modal&&
					<Portal>
						<img onClick={()=>{setModal(false)}} src={Arrow} alt="arrow icon" style={{
							width:24,
							height:24,
							zIndex:62,
							position:'fixed',
							left:0,
							top:0,
							cursor:'pointer',
							margin:40
						}}/>
						<div id="search-area" style={{
							top:0,
							position:'fixed',
							left:0,
							right:0,
							display:'flex',
							flexDirection:'column',
							alignItems:'center',
							bottom:0,
							zIndex:61,
							background:"rgba(251,251,251,.98)"
						}}>
							<div style={{
								width:'100%',
								maxWidth:500,
								padding:"100px 40px",
							}}>
								<p style={{fontSize:11,color:"var(--theme-secondary-color)",marginBottom:6}}>
									{label}
								</p>
								<input onChange={onChange} ref={INPUT} placeholder={placeholder?placeholder:label} style={{
									background:'none',
									border:'none',
									fontWeight:700,
									fontSize:41
								}}/>
								<div className='FadeInDown-Effect mt4 scroll-container' style={{
									height:'80vh',
									overflowY:'auto',
									scrollbarWidth:0
								}}>
									<p style={{fontSize:11,color:"var(--theme-secondary-color)",marginBottom:6}}>
										Results
									</p>
									{
										FilteredValues.length ? FilteredValues.map((item,index)=>{
											let text = typeof(item)==='object'
												?item[searchKey]
												:item;
											if(text.includes(val)){
												text = text.replace(val,`<b style="font-weight: 800;color: #111">${val}</b>`)
											}else if(text.includes(val.toLowerCase())){
												text = text.replace(val.toLowerCase(),`<b  style="font-weight: 800;color: #111">${val.toLowerCase()}</b>`)
											}
											return (
												<div dangerouslySetInnerHTML={{__html:text}} onClick={()=>{selectItem(item)}} key={index} style={{
													fontSize:17,
													color:"#333",
													fontWeight:400,
													cursor:'pointer',
													padding:'12px 0'
												}}>

												</div>
											)
										}):undefined
									}
									{
										!FilteredValues.length?
										<p className="mt2" style={{
											fontSize:15,
											color:"var(--theme-text-color)",
										}}>
											Please enter a search criteria to start.
										</p>:
										<></>
									}
								</div>
							</div>
						</div>
					</Portal>
				}
			</div>
		</>
	);
}

export default Index;
