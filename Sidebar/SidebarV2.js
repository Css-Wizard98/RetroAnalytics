import React from 'react'
import Sidebar from "./LeftV2Sidebar";
import TopBar from './TopBar/index2'
import useWrapperHook from "../Hooks/useWrapperHook";

export default function SidebarV2Renderer({children, topItems= [],dropDown=[], items = [],logo,data={
	name:"Loading...",
	email:"Loading...",
	children:(<></>),
}}){
	const TYPE = useWrapperHook();
	// Check if its iframe and hide in iframe setup
	if(window.location !== window.parent.location){
		return <></>
	}
	if(TYPE === "top"){
		return (<TopBar children={children} items={topItems} dropDown={dropDown} logo={logo} data={data}/>)
	}
	return(<Sidebar items={items} logo={logo} data={data}/>)
}
