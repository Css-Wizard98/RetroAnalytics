import React, {useRef} from 'react'
import Props from 'prop-types'
import './index.css'
import Portal from '../Portal/Portal'
import '../Animation/Animation.css'


function FullModal ({blank,title,overflow=false,loader=false, description,contentStyle={},  onClose, tabs=(<div/>), className,  children, width, height,style={}}) {

	if(!contentStyle){
		contentStyle = {}
	}
	if(overflow){
		contentStyle = {
			...contentStyle,
			maxHeight:height?height:500,
			overflowY:'auto'
		}
	}
    let Modal_Wrapper = useRef(), Modal= useRef();

    const animateclose = (params) => {
		if(onClose){
			Modal_Wrapper.current.classList.add('FadeOut-Effect');
			Modal.current.classList.add('FadeOutDown-Effect');
			setTimeout(() => {onClose()}, 200);
		}
    }

	return (
        <Portal>
            <div ref={Modal_Wrapper} onClick={animateclose} id='material-theme' className={`FadeInUp-Effect fmodal-wrapper ${className}`}>
                <div ref={Modal} onClick={e=>e.stopPropagation()} className='relative FadeInUp-Effect fmodal' style={{maxWidth: width,height:'100vh',overflowY:'auto',...style}}>
					<div style={{
						width:'80%',
						maxWidth:650,
						margin:'40px auto'
					}} className="relative border pd4 rounded-md">
						{
							loader?
								<div className="im-loader">
									<div className="im-loader-value"/>
								</div>:<></>
						}
						<div style={{
							position:'absolute',
							right:15,
							zIndex:31,
							top:15
						}}>
							<h3 onClick={animateclose} className='pointer mr1'><i className="fas fa-times mr1"/>Close</h3>
						</div>
						<div className="flex vertically pd4 center">
							<p style={{fontSize:31}} className="fw-bold">
								{title}
							</p>
							<p style={{fontSize:16}}>
								{description}
							</p>
						</div>
						{children}
					</div>
                </div>
            </div>
        </Portal>
	)
}

FullModal.defaultProps = {
    title: 'Modal',
    description: 'Fill out the details'
}

FullModal.propTypes = {
	/**
	 * Use external css classes
	 */
	className:Props.string,
	/**
	 * Function to handle modal close button click
	 */
	onClose:Props.func,
	/**
	 * Function to handle modal submit button click
	 */
	onSubmit: Props.func,
	/**
	 * Pass any JSX you want to include in modal bottom bar
	 */
     actions: Props.any,
    /**
	 * Modal submit button name (Submit by default)
	 */
	button: Props.string,
	/**
	 * Modal title
	 */
	title: Props.string,
    /**
	 * Modal description
	 */
	description: Props.string,
}

export default FullModal;
