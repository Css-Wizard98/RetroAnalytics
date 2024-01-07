import './Heading.css'
import React from 'react'
import PropTypes from 'prop-types'

function Heading({children,text = undefined,className="",margin="",style={}}){
	if(text){
		return  (
			<h4 className={`heading ${className} ${margin}`} style={style}>
				{text}
			</h4>
		)
	}
	return (
		<h4 className={`heading ${className} ${margin}`} style={style}>
			{children}
		</h4>
	)
}


function Small({children,text = undefined,className="",margin="",style={}}){
	if(text){
		return  (
			<h6 className={`heading-sm ${className} ${margin}`} style={style}>
				{text}
			</h6>
		)
	}
	return (
		<h6 className={`heading-sm ${className} ${margin}`} style={style}>
			{children}
		</h6>
	)
}


function Medium({children,text = undefined,className="",margin="",style={}}){
	if(text){
		return  (
			<h3 className={`heading-md ${className} ${margin}`} style={style}>
				{text}
			</h3>
		)
	}
	return (
		<h3 className={`heading-md ${className} ${margin}`} style={style}>
			{children}
		</h3>
	)
}

function Large({children,text = undefined,className="",margin="",style={}}){
	if(text){
		return  (
			<h2 className={`heading-lg ${className} ${margin}`} style={style}>
				{text}
			</h2>
		)
	}
	return (
		<h2 className={`heading-lg ${className} ${margin}`} style={style}>
			{children}
		</h2>
	)
}

function XLarge({children,text = undefined,className="",margin="",style={}}){
	if(text){
		return  (
			<h2 className={`heading-xlg ${className} ${margin}`} style={style}>
				{text}
			</h2>
		)
	}
	return (
		<h2 className={`heading-xlg ${className} ${margin}`} style={style}>
			{children}
		</h2>
	)
}

Heading.propTypes = {
	text:PropTypes.string,
	className:PropTypes.string
}

Small.propTypes = {
	text:PropTypes.string,
	className:PropTypes.string
}

Medium.propTypes = {
	text:PropTypes.string,
	className:PropTypes.string
}

Large.propTypes = {
	text:PropTypes.string,
	className:PropTypes.string
}

XLarge.propTypes = {
	text:PropTypes.string,
	className:PropTypes.string
}

const Regular = Heading;

export {
	Regular,Small,Medium,Large,XLarge
}

export default Heading;
