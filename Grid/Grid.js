import React from 'react'
import './Grid.css'

/**
 * @author (Aakash Bhadana)
 * @param children
 * @param className
 * @param grid 12 point system
 * @param style
 * @returns {JSX.Element}
 * @constructor
 */
function Grid({children,className="",grid = {mobile:6},style={}}) {
	let classes = "";
	let {mobile,medium,large} = grid;
	if(!mobile){
		if(medium)
			mobile = medium;
		else if(large){
			mobile = large;
		}
	}
	if(!medium){
		medium = mobile;
	}
	if(!large){
		large = medium;
	}
	let values = {
		mobile,medium,large
	}
	classes = `col-${values.mobile}`;
	classes = `${classes} col-md-${values.medium}`;
	classes = `${classes} col-l-${values.large}`;
	return (
		<div style={style} className={`${classes} ${className}`}>
            {children}
		</div>
	)
}

/**
 * @author (Aakash Bhadana)
 * @param children
 * @param className Classes
 * @param style
 * @returns {JSX.Element}
 * @constructor
 */
function Container({children,className="",style={}}){
	return (
		<div style={style} className={`container ${className}`}>
			{children}
		</div>
	)
}


/**
 * @author (Aakash Bhadana)
 * @param children
 * @param className Classes
 * @param style
 * @returns {JSX.Element}
 * @constructor
 */
function Center({children,className="",style={}}){
	return (
		<div style={style} className={`center h-100 w-100 flex ${className}`}>
			{children}
		</div>
	)
}

/**
 * @author (Aakash Bhadana)
 * @param children
 * @param className Classes
 * @param style
 * @returns {JSX.Element}
 * @constructor
 */

function Row({children,className="",style={}}){
	return (
		<div style={style} className={`row ${className}`}>
			{children}
		</div>
	)
}

function Item({children,className="mt5"}){
	return (
		<div className={className}>
			{children}
		</div>
	)
}


export default Grid;

const Column = Grid;

export {
    Grid,
	Container,
	Item,
	Center,
	Column,
	Row
}
