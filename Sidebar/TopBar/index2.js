import React from 'react'
import './topbar.css'
import Account from './Account'
import DropDown from "./DropDown";
import {useMobileHook} from "../../index";
import {useHistory, useLocation} from "react-router-dom";

export default function TopBarTwo({children,dropDown=[],  items = [],logo,data={
    name:"Loading...",
    email:"Loading...",
    children:(<></>)
}}) {
	let MOBILE  = useMobileHook();
	const HISTORY = useHistory();
	const {pathname} = useLocation();
	const render = item => {
		if(!item.items){
			let active = pathname===item.path;
			return (
				<div style={active?{background:'var(--theme-primary-container)',color:'var(--theme-on-primary-container)',padding:'8px 16px',borderRadius:8}:{padding:'8px 16px'}} className="flex horizontally center-vertically pointer">
					<div onClick={()=>{
						HISTORY.push(item.path)
					}} className="flex horizontally center-vertically">
						<p className="ml1 text fw-600">
							{item.title}
						</p>
					</div>
				</div>
			)
		}
		else if(item.items && item.items.length>1){
			return(<DropDown mobile={MOBILE} {...item} key={item.title}/>)
		}else{
			let active = pathname.includes(item.items[0].path);
			return (
				<div style={active?{background:'var(--theme-primary-container)',color:'var(--theme-on-primary-container)',padding:'8px 16px',borderRadius:8}:{padding:'8px 16px'}} className="flex horizontally center-vertically pointer">
					<div onClick={()=>{
						HISTORY.push(item.items[0].path)
					}} className="flex horizontally center-vertically">
						<p className="ml1 text  text-truncate fw-600">
							{item.items[0].name}
						</p>
					</div>
				</div>
			)
		}
	}
	return (
		<div  id='sidebar-menu' style={{

            borderBottom:'1px solid var(--theme-border-color)',
        }}>
			<div className="flex center-vertically horizontally topBar relative"  style={{
				height:70,
			}}>
				<div onClick={()=>{HISTORY.push("/app")}} style={{maxWidth:150,cursor:'pointer'}} className="ml2">
					{
						logo?
							<img src={logo} className="topBar-logo" alt="logo"/>:
							<div className='placeholderLogo'/>
					}
				</div>
				<div className="flex-1 noHover flex horizontally center-vertically mr4 ml4">
					{
						items.map(render)
					}
				</div>
				{children}
			</div>
		</div>
	)
}
