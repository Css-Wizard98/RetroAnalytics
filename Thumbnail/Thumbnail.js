import React from 'react';
import Props from 'prop-types'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Letter thumbnail with all classes and style prop
 */

const Thumbnail = ({size, dim, font, img, letter, style, className})=>{
	size = size.toUpperCase();
	if(!dim && !font){
		switch (size) {
			case 'XS':
				dim = '14px';
				font = '0.7rem';
				break;
			case 'small':
			case 'S':
				dim = '22px';
				font = '0.8rem';
				break;
			case 'M':
				dim = '30px';
				font = '0.9rem';
				break;
			case 'L':
				dim = '40px';
				font = '1.4rem';
				break;
			default:
				dim = '40px';
				font = '1.2rem';
				break;
		}
	}

	const pallete = {a: "#C62828",b: "#AD1457",c: "#6A1B9A",d: "#4527A0",e: "#283593",f: "#1565C0",g: "#0277BD",h: "#00838F",i: "#00695C",j: "#2E7D32",k: "#558B2F",l: "#9E9D24",m: "#F57F17",n: "#E65100",o: "#4E342E",p: "#424242",q: "#37474F",r: "#884EA0",s: "#239B56",t: "#626567",u: "#C62828",v: "#880E4F",w: "#4A148C",x: "#4527A0",y: "#5D4037",z: "#212121"};

	if(img){
		return (
			<img className={`${className}`} alt="Thumbnail" src={img} style={{
				width: dim,
				height: dim,
				borderRadius: "100px",
				objectFit:'contain'
}}/>
		)
	}
	return (
		<div className={className} style={{display: "inline-block"}}>
			<div style={{
				backgroundColor: pallete[letter.toLowerCase()] ? pallete[letter.toLowerCase()] : "#1490D4",
				width: dim,
				height: dim,
				borderRadius: "100px",
				color: '#fff',
				fontSize: font,
				...style
			}} className='flex center uppercase'>{letter}</div>
		</div>
	);
}

Thumbnail.defaultProps = {
	size: 'M'
}

Thumbnail.propTypes = {
	/**
	 * Size of the Letter thumbnail
	 */
	size:Props.string,
	/**
	 * Alphabet for the thumbnail
	 */
	letter:Props.string,
	/**
	 * Classes to customize component
	 */
	 className:Props.string,
	/**
	 * Url for using image as thumbnail
	 */
	img: Props.string,
}

export default Thumbnail;

