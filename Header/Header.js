import React, {useEffect, useRef, useState} from 'react'
import './Header.css'
import {transform} from "framer-motion";
import _ from 'lodash'
import {Headings} from "../index";
import LeftArrow from './arrow.png'
import {useHistory} from "react-router-dom";

export default function Header({title,bottom,children,onBack=false}) {
	let Bar = useRef();
	const HISTORY = useHistory();
	const [mTop,setTop] = useState(70)
	const [style,setStyle] = useState({
		top:{
			marginTop:12,
			marginLeft:0
		},
		header : {
			fontSize:48,
		},
		text:{
			fontSize:14,
		}
	})
	useEffect(()=>{
		const wrapper = document.getElementById('wrapper');
		if(!wrapper){
			return
		}
		let padding = wrapper.offsetWidth>800?70:30;
		let top = mTop;
		let val = padding-top;
		if(top>(padding-1)){
			Bar.current.style.width = `100%`;
			Bar.current.style.marginLeft = `0px`;
			Bar.current.style.paddingTop = '0px';
			Bar.current.style.paddingBottom = '0px';
			Bar.current.style.paddingLeft = '0px';
			Bar.current.style.borderBottom = "1px solid var(--theme-border-color)";
			setStyle({
				top:{
					marginTop:12,
					marginLeft:0
				},
				header: {
					fontSize:48,
				},
				text: {
					fontSize:14,
				},
				left:{
					position:'absolute',
					left:-8,
					top:-28
				},
			})
		}else if(top<2){
			Bar.current.style.width = `calc(100% + 140px)`;
			Bar.current.style.marginLeft = `-${padding}px`;
			Bar.current.style.paddingTop = '15px';
			Bar.current.style.paddingLeft = '60px';
			Bar.current.style.borderBottom = "1px solid var(--theme-border-color)";
			setStyle({
				top:{
					marginTop:4,
				},
				header: {
					fontSize:24,
					marginTop:-6
				},
				left:{
					position:'absolute',
					left:20,
					top:20
				},
				text: {
					fontSize:10,
					marginTop:-2
				}
			})
		}
		else{
			Bar.current.style.width = `calc(100% + ${val*2}px)`;
			Bar.current.style.marginLeft = `-${val}px`;
			let paddingLeft = 0-(val*((0-15)/padding));
			Bar.current.style.paddingTop =`${paddingLeft}px`;
			Bar.current.style.paddingLeft = `${0-(val*((0-60)/padding))}px`;
			Bar.current.style.borderBottom = "1px solid var(--theme-border-color)";
			setStyle({
				top:{
					marginTop:transform([0,padding],[4,12])(top),
				},
				header: {
					fontSize:transform([0,padding],[24,48])(top),
					marginTop:transform([0,padding],[-6,0])(top),
				},
				text: {
					fontSize:transform([0,padding],[10,14])(top),
					marginTop:transform([0,padding],[-2,0])(top),
				},
				left:{
					position:'absolute',
					left:transform([0,padding],[20,-8])(top),
					top:transform([0,padding],[20,-28])(top),
				},
			})
		}
	},[mTop])
	useEffect(() => {
		const animate = _.throttle(() => {
			let {top} = Bar.current.getBoundingClientRect();
			setTop(Math.ceil(top))
		},1)
		const wrapper = document.getElementById('wrapper');
		if(wrapper){
			wrapper.addEventListener('scroll', animate, false);
		}
		return ()=>{
			if(wrapper){
				wrapper.removeEventListener('scroll', animate);
			}
		}
	}, [mTop]);


	return (
		<>
			<div ref={Bar} className="header">
				{
					onBack&&<img  src={LeftArrow} alt="LeftArrow" onClick={()=>{
						HISTORY.go(-1)
					}} className="display-none display-md hoverable" style={{
						width:36,
						cursor:'pointer',
						height:36,
						padding:8,
						borderRadius:18,
						marginBottom:6,
						color:'var(--theme-on-primary-container)',
						...style.left
					}}/>
				}
				<div className="relative hidden">
					<Headings.XLarge style={style.header}>
						{title}
					</Headings.XLarge>
					<div style={style.text} className="text-light">
						{bottom}
					</div>
					{
						children?
							<div style={style.top}>
								{children}
							</div>:<div style={{height:15}}/>
					}
				</div>
			</div>
		</>
	)
}
