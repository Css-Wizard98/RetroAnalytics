import React from 'react';
import Props from 'prop-types'
import './DropDown.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default Drop Down Menu with all classes
 */
function DropDown({className, style, label, options,left, bottom,top, right}) {
	return (
		<div className={`dropdown ${className}`} style={style}>
			{label}
			{options.length>0&& <div className='dropdown-menu' style={{
				...(bottom!==undefined&&{bottom}),
				...(right!==undefined&&{right}),
				...(left!==undefined&&{left}),
				...(top!==undefined&&{top}),
				...(bottom!==undefined&&left!==undefined?{transformOrigin: 'bottom left'}:right!==undefined?{transformOrigin: 'bottom right'}:bottom!==undefined?{transformOrigin: 'bottom left'}:right!==undefined?{transformOrigin: 'top right'}:undefined)
			}}>
				{
					options.map((item, index)=>{
						return (
							<div onClick={item.onClick} key={index} className='item'>
								{item.icon&&item.icon} {item.label}
							</div>
						)
					})
				}
			</div>}
		</div>
	);
}

DropDown.propTypes = {
	/**
	 * All Classes
	 */
	className:Props.string,
    /**
	 * Style object
	 */
	style:Props.string,
    /**
	 * Label for Drop down
	 */
	label:Props.any,
	/**
	 * Array of dropdown options
	 */
	 options:Props.array,
}


export default DropDown;
