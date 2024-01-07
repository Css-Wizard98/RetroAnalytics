import React, {useEffect} from 'react'
import AppSwitcherIcon from "@atlaskit/icon/glyph/app-switcher";
import ListIcon from "@atlaskit/icon/glyph/list";
import {useLocation} from 'react-router-dom';

export default function TableViewSwitch({size="large",selected, setSelected, className=''}) {
	let {pathname} = useLocation()
	let viewKey = `view:${pathname}`
	useEffect(()=>{
		if(localStorage.getItem(viewKey)){
			setSelected(localStorage.getItem(viewKey))
		}
	},[])
	if(size==="small"){
		if(selected === "list"){
			return (
				<div style={{width:100}} onClick={()=>{
					localStorage.setItem(viewKey,'card')
					setSelected('card')
				}} className="flex pointer horizontally center-vertically">
					<ListIcon size="small"/>
					<p className="ml1 fw-500">
						List View
					</p>
				</div>
			)
		}
		return (
			<div style={{width:100}} onClick={()=>{
				localStorage.setItem(viewKey,'list')
				setSelected('list')
			}} className="flex pointer horizontally center-vertically">
				<AppSwitcherIcon size="small"/>
				<p className="ml1 fw-500">
					Card View
				</p>
			</div>
		)
	}
	return (
		<div className={`flex center-vertically ml2 horizontally  ${className}`} style={{
			background: 'var(--theme-variant-color)',
			borderRadius: '8rem',
			padding:3
		}}>
			<div  data-tip="Switch to Card View" onClick={() => {
				localStorage.setItem(viewKey,'card')
				setSelected('card')
			}} className="center flex  transition-ease" style={{
				cursor: 'pointer',
				padding:'0.5rem',
				...selected === "card" ? {
					background: 'white',
					borderRadius: '8rem',
					boxShadow:"2px 1px 1px rgba(1,1,1,.075)"
				} : {},
			}}>
				<AppSwitcherIcon/>
			</div>
			<div data-tip="Switch to List View" onClick={() => {
				localStorage.setItem(viewKey,'list')
				setSelected('list')
			}} className="center flex transition-ease" style={{
				...selected === "list" ? {
					background: 'white',
					borderRadius: '8rem',
					boxShadow:"2px 1px 1px rgba(1,1,1,.075)"
				} : {},
				cursor: 'pointer',
				padding:'0.5rem'
			}}>
				<ListIcon/>
			</div>
		</div>
	)
}
