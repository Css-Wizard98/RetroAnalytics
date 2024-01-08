import React, {useEffect, useRef} from 'react'
import './index.css'
import Props from 'prop-types'
import {useLocation} from "react-router-dom";
// import useWrapperHook from '../Hooks/useWrapperHook';

/**
 *@author [Lakshay Jain](https://github.com/lakshay-dice)
 */

function Wrapper({style={},children,className="",id="wrapper"}){

	// const type = useWrapperHook();
	const { pathname } = useLocation();
	let WRAPPER = useRef()

	useEffect(() => {
	  if(WRAPPER.current){
		WRAPPER.current.scroll(0,0);
	  }
	}, [pathname]);

	// if(false){
	// 	return (
	// 		<div ref={WRAPPER} id={id} className={`w-100 flex-fill ${className}`} style={{overflowY:'scroll', overflowX:'hidden',...style}}>
	// 			<div style={{paddingBottom:48}}>
	// 				{children}
	// 			</div>
	// 		</div>
	// 	)
	// }else{
		return (
			<div ref={WRAPPER} id={id} className={`w-100 h-100h ${className}`} style={{overflowY:'scroll', overflowX:'hidden',...style}}>
				{children}
			</div>
		)
	// }
}

Wrapper.propTypes = {
	/**
	 * Render Children
	 */
	/**
	 * style = {}
	 */
	style : Props.object,
	/**
	 * Defaults to h-100h flex-1
	 */
	className:Props.string
}

export default Wrapper;
