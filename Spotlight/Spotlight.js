import React, {useEffect, useRef, useState} from 'react'
import Props from 'prop-types'
import './Spotlight.css'
import {Headings, Portal} from '../index'
import '../Animation/Animation.css'
import {useHistory, useLocation} from 'react-router-dom'
import {UrlListener} from '../../retro'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Spotlight
 */

function Spotlight({className, style, config, extend}) {

	let HISTORY = useHistory()
	let LOCATION = useLocation()

    let pathname = LOCATION.pathname;
    let params = new URLSearchParams(LOCATION.search)
	let search = params.get('search')

	let SearchBox = useRef();

	const [RESULTS , setRESULTS ] = useState([]);
	const [Calculation, setCalculation] = useState(undefined);
	const [ExtendedResult, setExtendedResult] = useState(undefined);

	useEffect(() => {
		document.addEventListener('keydown', function(event) {
			if (event.ctrlKey && event.key === 'k') {
				setRESULTS([])
				HISTORY.push(`${window.location.pathname}?search=`)
			}else if(event.key==='Escape'){
				setRESULTS([])
				HISTORY.push(window.location.pathname)
			}
		  });
		  // eslint-disable-next-line
	}, []);

	useEffect(() => {
		if(SearchBox.current){
			SearchBox.current.focus()
		}
	}, [search]);

	const checkMath = (val) => {
		if(val.includes('+')||val.includes('-')||val.includes('/')||val.includes('*')||val.includes('%')){
			try{
				// eslint-disable-next-line
				setCalculation(eval(val))
			}
			catch (e){
				console.log(e)
				return
			}
			return
		}else{
			setCalculation(undefined)
		}
	}

	const checkLink = (val) => {
		if(val.startsWith('http')){
			UrlListener.$emit(val)
			HISTORY.push(window.location.pathname)
			return
		}
	}

	const doSearch = (e) => {
		checkMath(e.target.value)
		checkLink(e.target.value)

		if(extend){
			setExtendedResult(extend(e.target.value))
		}

		let val = e.target.value.toLowerCase();

		if(val){

			let results = []
			config.forEach(object => {
				let searches = {title: object.title, icon: object.icon, matches: object.list.filter((item)=>object.searchFunction(item,val))}
				results.push(searches)
			});

			setRESULTS(results)
		}else{
			setRESULTS([])
		}
	}

	const mapSections = (section, i) => {
		if(section.matches.length){
			return (
				<div key={i} className='section'>
					<div className='heading'>{section.title}</div>
					{
						section.matches.map((match, j)=>mapMatches(section, match, j))
					}
				</div>
			)
		}
	}

	const mapMatches = (section, match, index) => {
		return (
			<div key={index} onClick={()=>{HISTORY.push(match.url)}} className='item'>
				<div className='icon'>
					{section.icon}
				</div>
				<div className='title'>
					{match.title}
				</div>
			</div>
		)
	}

	if(search===null){
		return <></>
	}else{
		return (
			<Portal>
			<div onClick={()=>HISTORY.push(pathname)} className='FadeIn-Effect spotlight-wrapper'>
				<div className='absolute text-white text-small' style={{top:'2rem'}}>You can also press Ctrl + k to open search</div>
				<div onClick={e=>e.stopPropagation()} className='FadeInUp-Effect spotlight' style={style}>
					<div className='search'>
						<i className='fa fa-search search-icon'/>
						<input defaultValue={search} ref={SearchBox} type='text' onChange={doSearch} className='search-box' placeholder='Search' />
					</div>
					{
						Calculation?
						<div className='ml2 mt1'>
							<Headings.Large className='text-truncate'>= {Calculation.toFixed(2)}</Headings.Large>
						</div>
						:<></>
					}
					{
						ExtendedResult?
						<div>
							{ExtendedResult}
						</div>
						:<></>
					}
					{
						RESULTS.length?
						<div className='FadeInDown-Effect results'>
							{
								RESULTS.map(mapSections)
							}
						</div>
						:<></>
					}
					<div className='text-small ml2 mt2'>Quick Links</div>
					<div className='quick-links'>
						<div onClick={()=>HISTORY.push('/settings')} className='link'>
							<i className='fas fa-cog mr1'/>
							<span>Settings</span>
						</div>
						<div onClick={()=>HISTORY.push('/faqs')} className='link'>
							<i className='fas fa-comment-dots mr1'/>
							<span>FAQs</span>
						</div>
						<div onClick={()=>HISTORY.push('/support')} className='link'>
							<i className='fas fa-user-alt mr1'/>
							<span>Support</span>
						</div>
					</div>
				</div>
			</div>
		</Portal>
		)
	}
}

Spotlight.propTypes = {
	/**
	 * All Classes
	 */
	className:Props.string,
	/**
	 * Array of Searhable Objects
	 */
	 config:Props.array,
}

export default Spotlight;

