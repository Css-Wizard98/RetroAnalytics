import React from 'react'
import Props from 'prop-types'
import './Tabs.css'
import {Link, useHistory, useLocation} from "react-router-dom";

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Tabs container with all classes
 */

function Tabs ({className="",sticky=false, top='0px', background='var(--theme-surface-color)', tabs, style}) {
	const LOCATION = useLocation();
	const HISTORY = useHistory();
	return (
		<div style={{top: top,...sticky?{position:'sticky'}:{}, background: background, ...style}} className={`tabs-wrapper scrollbar-hidden ${className}`}>
            {
                tabs.filter(item=>item!==undefined).map((tab,index)=>{
					if(tab.href){
						return (<Link to={tab.href} key={index} className={LOCATION.pathname.includes(tab.href)?'tab-option-active':'tab-option'}>
							{tab.title}
						</Link>)
					}else  if(tab.path){
						let active = false;
						if(tab.type==='includes'&&LOCATION.pathname.includes(tab.path)){
							active = true;
						}
						if(tab.type!=='includes' && tab.path===LOCATION.pathname){
							active  = tab.path===LOCATION.pathname
						}
						if(active){
							return (<div key={index} onClick={()=>{
								HISTORY.push(tab.path)
							}} className={'tab-option relative'}>
								{tab.title}
								<div style={{
									height:4,
									borderTopLeftRadius:8,
									borderTopRightRadius:8,
									bottom:-2,
									background:"var(--theme-primary-color)"
								}} className="absolute FadeInLeft-Effect  left-0 right-0">

								</div>
							</div>)
						}
						return (
							<div key={index} onClick={()=>{
								HISTORY.push(tab.path)
							}} className={
								tab.type==='includes'&&LOCATION.pathname.includes(tab.path)?'tab-option-active':
								tab.path===LOCATION.pathname?'tab-option-active':'tab-option'}>
								{tab.title}
							</div>
						)
					}else{
						return (
							<div key={index} onClick={tab.onClick} className={tab.active?'tab-option-active':'tab-option'}>
								{tab.title}
							</div>
						)
					}
                })
            }
        </div>
	)
}

Tabs.propTypes = {
	/**
	 * Use external css classes
	 */
	className:Props.string,
    /**
	 * Array of Tab labels
	 */
	tabs:Props.array,
    /**
	 * Label of currently active Tab
	 */
	active:Props.string,
    /**
	 * Function to change active Tab
	 */
	onClick:Props.func,
}

export default Tabs;
export {default as TabBody} from './TabBody'
