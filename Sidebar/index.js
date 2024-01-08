import React from 'react'
import Sidebar from "./Sidebar";
import TopBar from './TopBar'
import useWrapperHook from "../Hooks/useWrapperHook";

export default function SidebarRenderer({children, topItems= [],dropDown=[], flexible, items = [],logo,data={
	name:"Loading...",
	email:"Loading...",
	children:(<></>),
}}){
	// const TYPE = useWrapperHook();

	if(window.location !== window.parent.location){
		return <></>
	}


	// if(flexible){
	// 	if(!TYPE){
	// 		return <></>
	// 	}else if(TYPE === "top"){
	// 		return (<TopBar children={children} items={topItems} dropDown={dropDown} logo={logo} data={data}/>)
	// 	}
	// }
	return(<Sidebar children={children} items={items} logo={logo} data={data}/>)
}
