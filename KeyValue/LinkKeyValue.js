import React from 'react'
import {Link} from "react-router-dom";

export default function LinkKeyValue({title,value,link}) {
	return (
		<div className="mt2">
			<p style={{fontSize:'.9rem',color:"rgb(107,114,128)",marginBottom:4,textTransform:'capitalize'}}>{title}</p>
			<Link to={link}  className="pointer">
				<div className='text-regular' style={{wordBreak: 'break-all'}}>{value?value:'NA'}</div>
			</Link>
		</div>
	)
}
