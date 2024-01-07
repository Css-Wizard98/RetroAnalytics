import './Animation.css'
import React from 'react'


/**
 *@author [Lakshay Jain](https://github.com/lakshay-dice)
 */
function Animation({children, className}){
	return (
		<div className={`FadeIn-Effect ${className}`}>
			{children}
		</div>
	)
}

/**
 *@author [Lakshay Jain](https://github.com/lakshay-dice)
 */
function FadeInLeft({children, className}){
	return (
		<div className={`FadeInLeft-Effect ${className}`}>
			{children}
		</div>
	)
}

/**
 *@author [Lakshay Jain](https://github.com/lakshay-dice)
 */
function FadeInRight({children, className}){
	return (
		<div className={`FadeInRight-Effect ${className}`}>
			{children}
		</div>
	)
}

/**
 *@author [Lakshay Jain](https://github.com/lakshay-dice)
 */
function FadeInUp({children, className}){
	return (
		<div className={`FadeInUp-Effect ${className}`}>
			{children}
		</div>
	)
}

/**
 *@author [Lakshay Jain](https://github.com/lakshay-dice)
 */
function FadeInDown({children, className}){
	return (
		<div className={`FadeInDown-Effect ${className}`}>
			{children}
		</div>
	)
}


/**
 *@author [Lakshay Jain](https://github.com/lakshay-dice)
 */
function FadeOut({children}){
	return (
		<div className="FadeOut-Effect">
			{children}
		</div>
	)
}

/**
 *@author [Lakshay Jain](https://github.com/lakshay-dice)
 */
function FadeOutRight({children}){
	return (
		<div className="FadeOutRight-Effect">
			{children}
		</div>
	)
}

/**
 *@author [Lakshay Jain](https://github.com/lakshay-dice)
 */
function FadeOutDown({children}){
	return (
		<div className="FadeOutDown-Effect">
			{children}
		</div>
	)
}

/**
 *@author [Lakshay Jain](https://github.com/lakshay-dice)
 */
function FadeOutLeft({children}){
	return (
		<div className="FadeOutLeft-Effect">
			{children}
		</div>
	)
}

/**
 *@author [Lakshay Jain](https://github.com/lakshay-dice)
 */
function FadeOutUp({children}){
	return (
		<div className="FadeOutUp-Effect">
			{children}
		</div>
	)
}


const FadeIn = Animation;

export default Animation

export {
	FadeIn,
	FadeInUp,
	FadeInRight,
	FadeInLeft,
	FadeInDown,
	FadeOutLeft,
	FadeOut,
	FadeOutUp,
	FadeOutDown,
	FadeOutRight
}
