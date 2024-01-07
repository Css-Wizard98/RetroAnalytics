import React from 'react'
import './InlineTabs.css'
import {useHistory, useLocation} from "react-router-dom";

export default function InlineTabs({size="large",margin='-2rem 0 32px', path = false,tabs = [], className, style, version = "v1" }) {
	const LOCATION = useLocation();
	const HISTORY = useHistory();
	if(version==="v2"){
		if(path){
			tabs = tabs.map((item,index)=>{
				return {
					...item,
					active:LOCATION.pathname===item.path,
					onClick:()=>{
						HISTORY.push(item.path)
					}
				}
			})
		}
		return  (
			<div style={{height:50,marginTop:'calc(-2rem - 1px)',paddingLeft:'4rem',paddingRight:'4rem',marginLeft:'-4rem',marginRight:'-4rem',marginBottom:0}} className="border-bottom flex horizontally center-vertically overScrollX noScrollbar border-top">
				{
					tabs.map((item,index)=>{
						return (
							<div style={{
								marginRight:36,
								letterSpacing:.35,
								fontWeight:item.active?700:600,
								color:item.active?'var(--theme-primary-color)':'rgb(55,65,81)',
								fontSize:14,
								cursor:'pointer'
							}} key={index} onClick={item.onClick}>
								{item.title}
							</div>
						)
					})
				}
			</div>
		)
	}

	if(size==="small"){
		return (
			<div style={{margin,height:60}} className="flex horizontally center-vertically">
				{
					tabs.map((item,index)=>{
						return (
							<div style={{
								...item.path===LOCATION.pathname? {
									padding:'6px 18px',
									background:'#f2f2f2'
								}:
								{
									padding:'12px 18px',
									margin:'8px 0'
								}
							}} className={`fw-500 rounded-sm pointer`} key={index} onClick={()=>{
								HISTORY.push(item.path)
							}} >
								{item.title}
							</div>
						)
					})
				}
			</div>
		)
	}
	if(path){
		return (
			<div className={`inline-tabs ${className}`} style={style}>
				{
					tabs.map((item,index)=>{
						return (
							<div className={`tab ${item.path===LOCATION.pathname?'active':''}`} key={index} onClick={()=>{
								HISTORY.push(item.path)
							}} >
								{item.title}
							</div>
						)
					})
				}
			</div>
		)
	}
	return (
		<div className={`inline-tabs ${className}`} style={style}>
            {
                tabs.map((item,index)=>{
                    return (
                        <div className={`tab ${item.active?'active':''}`} key={index} onClick={item.onClick}>
                            {item.title}
                        </div>
                    )
                })
            }
		</div>
	)
}
