import './Card.css'
import React from "react";

function Card({children}) {
	return (
		<div className="card-rg">
			{children}
		</div>
	)
}
function Medium({children}) {
	return (
		<div className="card-md">
			{children}
		</div>
	)
}
function Small({children}) {
	return (
		<div className="card-sm">
			{children}
		</div>
	)
}


function Large({children}) {
	return (
		<div className="card-lg">
			{children}
		</div>
	)
}


export default Card;

export {
	Card,
	Small,
	Medium,
	Large
}
