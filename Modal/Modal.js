import React, {useRef} from 'react'
import Props from 'prop-types'
import './Modal.css'
import Portal from '../Portal/Portal'
import Button from '../Button/Button'
import '../Animation/Animation.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default Modal with All classes
 */

function Modal ({blank,overflow=true,containerOverflow = true,rounded = false,title,loader=false, btnLoader=false, description,contentStyle={}, button, onClose, onSubmit,tabs=(<div/>), className, actions, children, width=475, height,style={}}) {

    let Modal_Wrapper = useRef(), Modal= useRef();

    const animateclose = (params) => {
		if(onClose){
			Modal_Wrapper.current.classList.add('FadeOut-Effect');
			Modal.current.classList.add('FadeOutDown-Effect');
			setTimeout(() => {onClose()}, 200);
		}
    }

	if(rounded){
		return (
			<Portal>
				<div ref={Modal_Wrapper} style={{
					...containerOverflow?{
						overflow:'auto'
					}:{}
				}} id='material-theme' className={`FadeIn-Effect modal-wrapper ${className}`}>
					<div ref={Modal} onClick={e=>e.stopPropagation()} className='FadeInUp-Effect modal' style={{...style, maxWidth: width}}>
						{
							onClose&&
							<div className="pl3 pr3 pt3">
								<h3>
									{title}
								</h3>
							</div>
						}
						{
							loader?
								<div className="im-loader">
									<div className="im-loader-value"/>
								</div>:<></>
						}
						{
							children&&
							<div style={{
								margin:0,
								...contentStyle,
								...overflow?{
									overflowX:"hidden",
									overflowY:'auto',
								}:{}
							}} className='content pl3 pr3 pb3 pt2'>
								{children}
							</div>
						}
						<div className="flex horizontally center-vertically">
							<div className="flex-1">
								{actions}
							</div>
						</div>
					</div>
				</div>
			</Portal>
		)
	}

	return (
        <Portal>
            <div ref={Modal_Wrapper} style={{
				...containerOverflow?{
					overflow:'auto'
				}:{}
			}} id='material-theme' className={`FadeIn-Effect modal-wrapper ${className}`}>
                <div ref={Modal} onClick={e=>e.stopPropagation()} className='FadeInUp-Effect modal' style={{...style, maxWidth: width}}>
                    {
						onClose&&
						<div className={`top-bar border-bottom`}>
							{
								blank?
								<div className={`w-100  flex align-center justify-between pd2`} style={{borderRadius:'0.25rem 0.25rem 0 0'}}>
									{rounded ? <h3>{title}</h3> : <h4>{title}</h4>}
									<h4 onClick={animateclose} className='pointer mr1'><i className="fas fa-times mr1"/>Close</h4>
								</div>
								:<div className='flex justify-between pd2'>
									<div>
										<div className='title'>{title}</div>
										<div className='description'>{description}</div>
									</div>
									<h2 onClick={animateclose} className='pointer'><i className="fas fa-times me-3"/></h2>
								</div>
							}
							{tabs}
						</div>
					}
					{
						loader?
						<div className="im-loader">
							<div className="im-loader-value"/>
						</div>:<></>
					}
                    {
                        children&&
                        <div style={{
							margin: blank?0:'',
							padding: blank?'1rem':'',
							...contentStyle,
							...overflow?{
								overflowX:"hidden",
								overflowY:'auto',
							}:{}
						}} className='content'>
							{children}
                        </div>
                    }
                    {
                        (button||actions)?
                        <div className='bottom-bar border-top'>
                            {
                                button&&
                                <Button onClick={()=>!btnLoader?onSubmit():undefined} className='btn-primary w-100 w-md-auto' margin='mt1'>
									{
										btnLoader
										?<div className="spinner m-auto"><div className="bounce1" /><div className="bounce2" /><div className="bounce3" /></div>
										:button
									}
								</Button>
                            }
                            <div>
                                {actions}
                            </div>
                        </div>
                        :<></>
                    }
                </div>
            </div>
        </Portal>
	)
}

Modal.defaultProps = {
    title: 'Modal',
    description: 'Fill out the details'
}

Modal.propTypes = {
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

export default Modal;
