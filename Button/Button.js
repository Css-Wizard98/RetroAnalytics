import React from 'react'
import Props from 'prop-types'
import './Button.css'
import {Utils} from '../'


/**
 *@author [Lakshay Jain](https://github.com/lakshay-dice)
 *
 * Default Button with All classes
 */
function Button({onClick,disabled=false, id='', className="btn-primary",time=150,debounce=true,children,margin="", loading,type,style={}}) {
	let click = onClick;
	if(debounce){
		click = Utils.debounce(onClick,time)
	}
	if(disabled){
		return (
			<button style={{
				cursor:"not-allowed",
				background:"#bcbcbc",
				color:"#222",
				border:"none",
			}} className={`btn fw-500 ${margin}`} disabled={true}>
				<i className="fa fa-lock mr1"/>{children}
			</button>
		)
	}
	return (
		<button id={id} type={type} onClick={loading?()=>{}:e=>{
			e.stopPropagation()
			click()
		}} style={style} className={`btn ${margin} ${className}`}>
			{
                loading?
                <div className="spinner m-auto">
                    <div className="bounce1" />
                    <div className="bounce2" />
                    <div className="bounce3" />
                </div>
                :children
            }
		</button>
	)
}

Button.defaultProps = {
	margin:"mt2",
	className:"btn-black",
	type: 'button'
}

Button.propTypes = {
	/**
	 * Use Margin Classes
	 * m0 - m6
	 * mb0 - mb6
	 * mt0 - mt6
	 * mro - mr6
	 * ml0 - ml6
	 */
	margin:Props.string,
	/**
	 * btn-primary
	 * btn-secondary
	 * btn-link
	 * btn-success
	 * btn-danger
	 * btn-inactive
	 */
	className:Props.string,
	/**
	 * Pass function u want to call on click
	 */
	onClick:Props.func,
}

export default Button;

