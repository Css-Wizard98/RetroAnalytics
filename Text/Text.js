import './Text.css'
import PropTypes from 'prop-types'
import React from 'react'
import ListItem from '@atlaskit/icon/glyph/list'

function Text({children,text = undefined,className="",style={}}){
	if(text){
		return  (
			<p className={`text ${className}`} style={style}>
				{text}
			</p>
		)
	}
	return (
		<p className={`text ${className}`} style={style}>
			{children}
		</p>
	)
}

Text.propTypes = {
	text:PropTypes.string,
	className:PropTypes.string
}


function Small({children,heading=false,text = undefined,className="",style={}}){
	if(heading){
		return  (
			<p className={`fw-500 ${className}`} style={{
				...style,
				fontSize:'1.2rem',
			}}>
				{children}
			</p>
		)
	}
	if(text){
		return  (
			<p className={`text-small ${className}`} style={style}>
				{text}
			</p>
		)
	}
	return (
		<p className={`text-small ${className}`} style={style}>
			{children}
		</p>
	)
}


function Light({children,text = undefined,className="",style={}}){
	if(text){
		return  (
			<p className={`text-small text-light ${className}`} style={style}>
				{text}
			</p>
		)
	}
	return (
		<p className={`text-small text-light ${className}`} style={style}>
		{children}
		</p>
	)
}


function Empty({children,text = undefined,className="",style={}}){
	if(text){
		return  (
			<div className="pd2 rounded-sm border flex horizontally center-vertically">
				<ListItem size="small"/>
				<p className={`text-small ${className} ml1`} style={style}>
					{text}
				</p>
			</div>
		)
	}
	return (
		<div className="pd2  rounded-sm border flex horizontally center-vertically">
			<ListItem size="small"/>
			<p className={`text-small ${className} ml1`} style={style}>
				{children}
			</p>
		</div>
	)
}

Small.propTypes = {
	text:PropTypes.string,
	className:PropTypes.string
}

const Regular = Text;

export {
	Regular,
	Small,
	Light,
	Empty
}

export default Text;
