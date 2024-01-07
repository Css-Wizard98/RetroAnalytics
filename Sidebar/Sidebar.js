import React, {useRef, useState} from 'react'
import Props from 'prop-types'
import './Sidebar.css'
import {useHistory, useLocation} from "react-router-dom";
import {Headings, SearchBox, Texts, useMobileHook, useWindowDimensions} from "../index";

function Item({item,toggle}) {
	const MOBILE = useMobileHook();
	const LOCATION = useLocation();
	const [shown,setShown] = useState(true)
	let HISTORY = useHistory();
	if(item.type && item.type==="equals")
		item.active = LOCATION.pathname===item.path
	else
		item.active = LOCATION.pathname.startsWith(item.includes?item.includes:item.path)
	return (
		<>
		<div id={item.id} onClick={()=>{
			if(MOBILE && toggle){
				toggle()
			}
			if(item.items && item.items.length>0){
				if(LOCATION.pathname.startsWith(item.includes?item.includes:item.path)){
					setShown(!shown)
				}else{
					setShown(true)
					HISTORY.push(item.path);
				}
			}else{
				HISTORY.push(item.path);
			}
		}} className={`sidebar-item ${item.active?'active':'clickable'}`}>
			<div className='flex w-100 h-100 align-center' style={{margin:'0 -4px',zIndex:11}}>
				{
					item.icon!==undefined&&<div className="icon">{item.icon}</div>
				}
				{
					item.svgs!==undefined&&<div className={`icons ${item.active?'active':''}`}>
						<img alt='' src={item.active?item.svgs.active:item.svgs.inactive} style={{
							width:24,
							height:24,

						}}/>
					</div>
				}
				{item.name}
				{item.items&&<i className={`fas fa-chevron-${item.active && shown?'up':'down'} absolute`} style={{right:'1.5rem'}}/>}
			</div>
			{
				shown && item.active && item.items && item.items.length?
					<div className="FadeInDown-Effect submenu">
						{
							item.items.map(item=>{
								return (
									<div id={item.id} onClick={(e)=>{e.stopPropagation();if(MOBILE && toggle){toggle()};HISTORY.push(item.path)}} className={(item.type&&item.type==="equals"?LOCATION.pathname===item.path:LOCATION.pathname.startsWith(item.includes?item.includes:item.path))?'subitem-active':'subitem'} key={item.name}>
										<div>{item.name}</div>
										{item.badge?<div className='ml1 text-white text-center rounded-pill' style={{fontSize:10, minWidth:25, padding:'2px 5px', background: 'var(--theme-primary-color)'}}>{item.badge}</div>:''}
									</div>
								)
							})
						}
					</div>
					:undefined
			}
		</div>
		</>
	)
}



function SmallItem({item}) {
	const LOCATION = useLocation();
	const [shown,setShown] = useState(true)
	let HISTORY = useHistory();
	if(item.type && item.type==="equals")
		item.active = LOCATION.pathname===item.path
	else
		item.active = LOCATION.pathname.startsWith(item.includes?item.includes:item.path)
	return (
		<div className="mb3 flex center-horizontally vertically">
			<div className="flex center pointer rounded-md" id={item.id} onClick={()=>{
				if(item.items && item.items.length>0){
					if(LOCATION.pathname.startsWith(item.includes?item.includes:item.path)){
						setShown(!shown)
					}else{
						setShown(true)
						HISTORY.push(item.path);
					}
				}else{
					HISTORY.push(item.path);
				}
			}}  style={{
				width:38,
				height:38,
				...item.active? {border:'1.75px solid var(--theme-primary-color)',background:"#f2f4f8"}: {border:'1.25px solid var(--theme-variant-color)'}
			}}>
				<div style={{width:32,height:32}} className="pl1 flex center">
					{item.icon}
				</div>
			</div>
			<p className="text-truncate mt1 text-center" style={{fontSize:10,maxWidth:60,fontWeight:500}}>
				{item.name}
			</p>
		</div>
	)
}

/**
	@version 1.0.1
	@author [lakshay jain](https://github.com/lakshay-dice)
 	@param logo Logo object
 	@param items Array of items
    @param children Children Object
 	@param data {email : "",name:""}
 */

function Sidebar({children,  items = [],logo,data={
	name:"Loading...",
	email:"Loading...",
	children:(<></>)
}}) {
	const [Show, SetShown] = useState(false)
	const {width} = useWindowDimensions()

	let SIDEBAR = useRef();
	let HISTORY = useHistory();
	let LOCATION = useLocation()
	let {pathname} = LOCATION


	const item = item => {
		return (
			<div key={item.title}>
				<p style={{
					color:"var(--theme-secondary-color)",
					fontSize:'var(--size-small)',
					fontWeight:'var(--font-medium)'
				}} className="regular mr3 ml3 mb2 mt2">
					{item.title}
				</p>
				{
					item.items.map(x=>(
						<Item toggle={()=>{
							SetShown(!Show)
						}} key={x.name} item={x}/>
					))
				}
			</div>
		)
	}

	const smallItem = item => {
		return (
			<div key={item.title}>
				{
					item.items.map(x=>(
						<SmallItem  key={x.name} item={x}/>
					))
				}
			</div>
		)
	}

	if(width>900 && Show){
		return  (
			<div id='sidebar-menu' className="relative collapsed" style={{width:80,height:'100vh',borderRight:'1px solid #dedede'}}>
				<div  id="sidebar-icon" className="clickable" onClick={() => {SetShown((!Show))}}><i className='fas fa-chevron-left'/><i className='fas fa-bars'/></div>
				<div style={{padding:"20px 10px"}} className="">
					{
						logo?
							<img style={{width:40,margin:10}} src={logo} className="sidebar-logo" alt="logo"/>:
							<div style={{width:40,height:40,margin:10}} className='placeholderLogo'/>
					}
					<div className="mt6 overScrollY noScrollbar" style={{maxHeight:'calc(100vh - 100px)'}}>
						{
							items.map(smallItem)
						}
					</div>
				</div>
			</div>
		)
	}

	return (
		<div id='sidebar-menu' ref={SIDEBAR} className={!Show ? 'expanded' : 'collapsed'}>
			<div  id="sidebar-icon" className="clickable" onClick={() => {SetShown((!Show))}}><i className='fas fa-chevron-left'/><i className='fas fa-bars'/></div>
			<div className="relative" id="sidebar">
				<div className={`relative h-100h overScroll scrollbar-autohide pb2`}>
					<div className="sidebar-header pd4 pb1">
						{
							logo?
								<img src={logo} className="sidebar-logo" alt="logo"/>:
								<div className='placeholderLogo'/>
						}
						<div className='relative user-options-wrapper'>
							<div id='sidebar-search'>
								<SearchBox placeholder='Search' onFocus={()=>HISTORY.push(`${pathname}?search=`)}/>
							</div>
							<div className='user-options bg-white'>
								<div className='flex align-center'>
									<Headings.Small className="mt1 medium truncate">{data.name}</Headings.Small>
									{
										data.currency&&
										<div className='ml1 mt1 border flex center text-small' style={{width:25, height:25, borderRadius:25}}>
											{data.currency}
										</div>
									}
								</div>
								<Texts.Light>
									{data.email}
								</Texts.Light>
								{
									data.children
								}
							</div>
						</div>
					</div>
					<div id='sidebar-items'>
						{
							items.map(item)
						}
					</div>
					{children}
				</div>
			</div>
		</div>
	)
}

Sidebar.propTypes = {
	/**
	 *  Logo object can be image or url
	 */
	logo : Props.string
}

export {
	Sidebar,
	Item
}

export default Sidebar;
