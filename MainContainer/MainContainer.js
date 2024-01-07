import React from 'react'
import Props from 'prop-types'
import FloatingUrl from "../FloatingUrl/FloatingUrl";
import {CheckInternet} from "../index";
import {Alert} from "../Alert/Alert";
import useWrapperHook from "../Hooks/useWrapperHook";

function MainContainer({style = {}, children, className = "force-white h-100h w-100w white", flexible = false}) {
	const type = useWrapperHook();
	if(flexible && type === "top") {
		return (
			<>
				<div id="topBar-wrapper" className={`${className} flex column`} style={{overflow: 'hidden', ...style}}>
					{children}
					<FloatingUrl/>
					<CheckInternet/>
					<Alert.Container mobile={false}/>
				</div>
			</>
		)
	}else {
		return (
			<>
				<div id="sidebar-wrapper" className={`${className} flex`} style={{overflow: 'hidden', ...style}}>
					{children}
					<FloatingUrl/>
					<CheckInternet/>
					<Alert.Container mobile={false}/>
				</div>
			</>
		)
	}
}

MainContainer.propTypes = {
	/**
	 * Render Children
	 */
	/**
	 * style = {}
	 */
	style: Props.object,

	flexible: Props.bool,
	/**
	 * Defaults to h-100h w-100w bg-w
	 */
	className: Props.string
}

export default MainContainer;
