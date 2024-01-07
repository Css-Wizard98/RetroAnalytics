import React from 'react'

function Page({children,className="",style={paddingTop:'1rem',minHeight:'100vh'}}){
	return (
		<div id="page" className={className} style={style}>
			{children}
		</div>
	)
}

function Title({title,className="",description,children}){
	return (
		<div className={`relative mb1 ${className}`}>
			<h2 className="heading heading">
				{title}
			</h2>
			<div className="text-small">
				{description}
			</div>
			{children}
		</div>
	)
}


export default Page


export {
	Page,
	Title
}
