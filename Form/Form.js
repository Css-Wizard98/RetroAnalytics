import React, {useEffect, useRef} from 'react'
import Props from 'prop-types'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default Form with All classes
 */
function Form({onSubmit=()=>{},className,style={},children,focus=true,containerStyle={}}) {

	let FORM = useRef();

	useEffect(() => {
		if(focus){
			if(FORM.current.elements[0]){
				FORM.current.elements[0].focus();
			}
		}
	}, [focus]);

	return (
       <div style={containerStyle}>
		   <form ref={FORM} onSubmit={e=>{e.preventDefault();onSubmit()}} className={className}>
			   {children}
		   </form>
	   </div>
	)
}

Form.propTypes = {
	/**
	 * All Classes
	 */
	className:Props.string,
	/**
	 * Pass function u want to call on click
	 */
	onSubmit:Props.func,
}

export default Form;

