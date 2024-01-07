import React from 'react'
import './Shimmer.css'

export default function Shimmer({width,height,style={}}) {
	return (
		<div className="shimmer " style={{height,...style}}>
			<div style={{height}} className="wave"></div>
		</div>
	)
}
