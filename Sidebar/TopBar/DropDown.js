import React from 'react'
import {DropDown} from "../../index";
import {useHistory, useLocation} from "react-router-dom";
import HipchatChevronDownIcon from '@atlaskit/icon/glyph/hipchat/chevron-down'

export default function DropDownRender({title,path,paths,items=[]}){
	const {pathname} = useLocation();
	let HISTORY = useHistory();
	if(!title){
		return (<div/>)
	}
	let active = false;
	if(paths){
		paths.forEach(item=>{
			if(!active){
				if(pathname.includes(item)){
					active = true;
				}
			}
		})
	}
	let DROPDOWNS = [];
	items.forEach(item=>{
		DROPDOWNS.push(
			{
				label :(<div className="flex center-vertically horizontally">
					{item.icon}
					<div>
						<p className="topBar-top">
							{item.name}
						</p>
						<p className="topBar-bottom">
							{item.des}
						</p>
					</div>
				</div>),
				onClick: ()=>HISTORY.push(item.path)
			}
		)
	})
	return(
		<div className={`topBar-title`}>
			<DropDown
				label={
					<div style={active?{background:'var(--theme-primary-container)',color:'var(--theme-on-primary-container)',padding:'8px 16px',borderRadius:8}:{padding:'8px 16px'}} className="flex horizontally center-vertically pointer">
						<div onClick={()=>{
							if(!items || !items.length){
								HISTORY.push(path)
							}
						}} className="flex horizontally center-vertically">
							<p className="ml1 text">
								{title}
							</p>
						</div>
						{
							items.length>0&& <HipchatChevronDownIcon size="medium"/>
						}
					</div>
				}
				top={40}
				left={20}
				options={DROPDOWNS}
			/>
		</div>
	)
}
