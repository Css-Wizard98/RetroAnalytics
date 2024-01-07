import React from 'react'
import './Loader.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Loader Animation
 */

function Loader() {
	return (
		<div className="pt3 pb3">
			<div className="mini-loader"/>
		</div>
	)
}

const Small = () => {
	return (
		<div className="mini-loader"/>
	)
}

const Medium = () => {
	return <span className="spinner-loader"></span>
}

export default Loader;
export {Small, Medium}
