import React from 'react';
import Props from 'prop-types'
import './SideBarMini.css'
import '../Animation/Animation.css'
import {useHistory, useLocation} from 'react-router-dom';

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default Mini Sidebar for only Icons menu
 */

function SideBarMini({logo, items, profile, top}) {

	const HISTORY = useHistory()
	const LOCATION = useLocation()

	const renderItems = (item, index) => {
		if(item.type && item.type==="equals"){
			item.active = LOCATION.pathname===item.path
		}else{
			item.active = LOCATION.pathname.startsWith(item.path)
		}
		return (
			<div data-tooltip-content={item.name} data-tooltip-id="sideBar" key={index} onClick={()=>{
				if(!item.active){
					HISTORY.push(item.path)
				}
			}} className={'item relative'}>
				{
					item.active&&<div className="accordin"/>
				}
				{item.icon}
			</div>
		)
	}

    return (
        <div className='sidebar-mini'>
			<div className='logo'>
				<img src={logo} className='w-100' alt='Logo'/>
			</div>
			{top}
			<div className='items'>
				{
					items.map(renderItems)
				}
			</div>
			{
				profile&&
				<div className='profile'>
					{profile}
				</div>
			}
        </div>
    );
}

SideBarMini.propTypes = {
	/**
	 * All Classes
	 */
	className:Props.string,
    /**
	 * Array of sidebar items
	 */
	items:Props.array,
	/**
	 * Array of sidebar functions
	 */
	 fixed:Props.array,
}

export default SideBarMini;
