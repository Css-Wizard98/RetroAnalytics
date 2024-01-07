import React, {useRef, useState} from 'react'
import Props from 'prop-types'
import './SidePane.css'
import Portal from '../Portal/Portal'
import Button from '../Button/Button'
import '../Animation/Animation.css'
import {InlineTabs, Loaders, useMobileHook} from '../index'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default SidePane with All classes
 */



function SidePane ({loading, title,zIndex=42, description, button, onClose, onSubmit, className, actions, children, width, preview, tabs, blank}) {

	let Pane_Wrapper = useRef(), Side_Pane= useRef(), Preview_Pane= useRef();
	const [PreviewWidth, setPreviewWidth] = useState(width);
	const [PaneWidth, setPaneWidth] = useState(width);
	const MobileDevice = useMobileHook()
	const [SwitchPane, setSwitchPane] = useState();

	const animateclose = () => {
		Pane_Wrapper.current.classList.add('FadeOut-Effect');
		Side_Pane.current.classList.add('FadeOutRight-Effect');
		if(Preview_Pane.current){
			Preview_Pane.current.classList.add('FadeOutRight-Effect');
		}
		setTimeout(() => {onClose()}, 150);
	}

	let x = 0;

	const mouseDownHandler = function (e) {
		x = e.clientX;
		document.addEventListener('mousemove', mouseMoveHandler);
		document.addEventListener('mouseup', mouseUpHandler);
	};

	const mouseMoveHandler = function (e) {
		const dx = x - e.clientX;

		let pane = PaneWidth + dx
		let preview = PreviewWidth - dx
		if(pane>400){
			setPaneWidth(pane)
		}
		if(preview>500){
			setPreviewWidth(preview)
		}
	};

	const mouseUpHandler = function () {
		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
	};

	return (
		<Portal>
			<div style={{zIndex}} ref={Pane_Wrapper} id='material-theme' className={`FadeIn-Effect relative sidepane-wrapper ${className}`}>
				<div ref={Side_Pane} onClick={e=>e.stopPropagation()} className='FadeInRight-Effect sidepane ' style={{maxWidth: `${PaneWidth}px`, ...(button||actions?{paddingBottom: '5rem'}:undefined)}}>
					<div className='top-bar'>
						{
							!loading ? <div className="relative">
								<div style={{fontSize:30,marginLeft:-12,width:40,height:40,fontWeight:400,borderRadius:30}} onClick={animateclose} className='pointer flex center hoverable adani-hover'><i className="fa fa-close"/></div>
								<div className='title'>{title}</div>
								<div className='description mb2'>{description}</div>
							</div>:<div className="relative">
								<div style={{fontSize:30,marginLeft:-12,width:40,height:40,fontWeight:400,borderRadius:30}} onClick={animateclose} className='pointer flex center hoverable adani-hover'><i className="fa fa-close"/></div>
								<div className="skeleton mt2">
									<div className="skeleton__header"/>
									<div className="skeleton__p"/>
								</div>
							</div>
						}

						{
							MobileDevice&&preview&&<InlineTabs style={{width:'100%'}} tabs={[{title:'Details', onClick: ()=>setSwitchPane(false), active:!SwitchPane},{title:'Preview', onClick: ()=>setSwitchPane(true), active: SwitchPane}]}/>
						}
						{!SwitchPane&&tabs}
					</div>
					<div className='content' style={{padding: blank?'0rem':'var(--size-large)'}}>
						{
							loading
								?<div className='w-100 text-center mt5'><Loaders.Medium/></div>
								:SwitchPane&&preview?preview:children
						}
					</div>
					<div onMouseDown={mouseDownHandler} className='resizer-left'>
						<div className='grab-handle' style={{
							position:'sticky',
							top:'calc(50vh)'
						}}/>
					</div>
				</div>

				{
					(button||actions)?
						<div onClick={e=>e.stopPropagation()} className='FadeInRight-Effect bottom-bar' style={{maxWidth: `${PaneWidth}px`}}>
							{
								button&&
								<Button onClick={onSubmit} className='btn-secondary' margin='mt1'>{button}</Button>
							}
							<div>
								{actions}
							</div>
						</div>
						:<></>
				}
				{
					(preview&&!MobileDevice)&&
					<div ref={Preview_Pane} onClick={e=>e.stopPropagation()} className='FadeInRight-Effect preview' style={{right: `${PaneWidth}px`,  width: `${PreviewWidth}px`}}>
						{preview}
					</div>
				}
			</div>
		</Portal>
	)
}

SidePane.defaultProps = {
	title: 'SidePane',
	description: 'Fill out the details',
	width: 500
}

SidePane.propTypes = {
	/**
	 * Use external css classes
	 */
	className:Props.string,
	/**
	 * Function to handle SidePane close button click
	 */
	onClose:Props.func,
	/**
	 * Function to handle SidePane submit button click
	 */
	onSubmit: Props.func,
	/**
	 * Pass any JSX you want to include in SidePane bottom bar
	 */
	actions: Props.any,
	/**
	 * SidePane submit button name (Submit by default)
	 */
	button: Props.string,
	/**
	 * SidePane title
	 */
	title: Props.string,
	/**
	 * SidePane description
	 */
	description: Props.string,
	/**
	 * Maximum width of sidepane in px (Default 500px)
	 */
	width: Props.number,
	/**
	 * Add more alongside sidepane
	 */
	preview: Props.any,
	/**
	 * Tabs component to add tabs in sidepane
	 */
	tabs: Props.any,
}

export default SidePane;
