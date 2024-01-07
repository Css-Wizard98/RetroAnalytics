import React, {useRef} from 'react'
import Props from 'prop-types'
import './SidePane.css'
import Portal from '../Portal/Portal'
import Button from '../Button/Button'
import '../Animation/Animation.css'
import {Loaders, useWindowDimensions} from '../index'
import Panel from 'react-split-pane'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default SidePane with All classes
 */

function SidePane({
					  loading,
					  title,
					  description,
					  button,
					  onClose,
					  onSubmit,
					  className,
					  actions,
					  children,
					  width,
					  preview,
					  tabs,
					  blank
				  }) {
	let Pane_Wrapper = useRef(), Side_Pane = useRef(), Preview_Pane = useRef();
	const animateclose = () => {
		Pane_Wrapper.current.classList.add('FadeOut-Effect');
		Side_Pane.current.classList.add('FadeOutRight-Effect');
		if (Preview_Pane.current) {
			Preview_Pane.current.classList.add('FadeOutRight-Effect');
		}
		setTimeout(() => {
			onClose()
		}, 150);
	}
	const windowDimensions = useWindowDimensions()
	if (windowDimensions.width > 1500) {
		width = 650;
	} else if (windowDimensions.width < 1500) {
		width = 575;
	} else if (windowDimensions.width < 1000) {
		width = windowDimensions.width / 2
	}
	if (width < 350) {
		width = 500;
		return (
			<Portal>
				<div ref={Pane_Wrapper} onClick={animateclose} id='material-theme'
					 className={`FadeIn-Effect  sidepane-wrapper ${className}`}>
					<div ref={Side_Pane} onClick={e => e.stopPropagation()}
						 className='FadeInRight-Effect sidepane relative'
						 style={{maxWidth: `${width}px`, ...(button || actions ? {paddingBottom: '5rem'} : undefined)}}>
						<div className='top-bar'>
							<div className="relative">
								<div className='title'>{title}</div>
								<div className='description mb2'>{description}</div>
								<h2 onClick={animateclose} style={{position: 'absolute', right: 0, top: '0.3rem'}}
									className='pointer'><i className="fas fa-times me-3"/></h2>
							</div>
							{tabs}
						</div>
						<div className='content' style={{padding: blank ? '0rem' : 'var(--size-large)'}}>
							{
								loading
									? <div className='w-100 text-center'><Loaders.Medium/></div>
									: children
							}
						</div>
					</div>
					{
						(button || actions) ?
							<div onClick={e => e.stopPropagation()} className='FadeInRight-Effect bottom-bar'
								 style={{maxWidth: `${width}px`}}>
								{
									button &&
									<Button onClick={onSubmit} className='btn-secondary' margin='mt1'>{button}</Button>
								}
								<div>
									{actions}
								</div>
							</div>
							: <></>
					}
					{
						preview &&
						<div ref={Preview_Pane} onClick={e => e.stopPropagation()}
							 className='FadeInRight-Effect preview-two'
							 style={{right: `${width}px`, width: `${width}px`}}>
							{preview}
						</div>
					}
				</div>
			</Portal>
		)
	}
	return (
		<Portal>
			<div ref={Pane_Wrapper} onClick={animateclose} id='material-theme'
				 className={`FadeIn-Effect  sidepane-wrapper ${className}`}/>
			<div style={{
				width: width * 2,
				right: 0,
				top: 0,
				zIndex: 42,
				position: 'fixed',
				bottom: 0
			}}>
				<Panel minSize={width} maxSize={width * 1.5}>
					{
						preview &&
						<div ref={Preview_Pane} onClick={e => e.stopPropagation()} className='preview-two'>
							{preview}
						</div>
					}
					<div ref={Side_Pane} onClick={e => e.stopPropagation()} className='sidepane relative'>
						<div className='top-bar'>
							<div className="relative">
								<div className='title'>{title}</div>
								<div className='description mb2'>{description}</div>
								<h2 onClick={animateclose} style={{position: 'absolute', right: 0, top: '0.3rem'}}
									className='pointer'><i className="fas fa-times me-3"/></h2>
							</div>
							{tabs}
						</div>
						<div className='content' style={{padding: blank ? '0rem' : 'var(--size-large)'}}>
							{
								loading
									? <div className='w-100 text-center'><Loaders.Medium/></div>
									: children
							}
						</div>
						{
							(button || actions) ?
								<div onClick={e => e.stopPropagation()} style={{
									width: `${width}px`,
									position: 'fixed',
									zIndex: 13,
									bottom: 0,
									right: 0,
									padding: 8,
									borderTop: '1px solid var(--theme-variant-color)',
									background: 'var(--theme-surface-color)'
								}}>
									{
										button &&
										<Button onClick={onSubmit} className='btn-secondary'
												margin='mt1'>{button}</Button>
									}
									<div>
										{actions}
									</div>
								</div>
								: <></>
						}
					</div>
				</Panel>
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
	className: Props.string,
	/**
	 * Function to handle SidePane close button click
	 */
	onClose: Props.func,
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
