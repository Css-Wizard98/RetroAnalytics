import React from 'react'
import Props from 'prop-types'
import {Attachment} from '../../retro'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Key Value Pair Compaonet with all classes
 */
function KeyValue({className="align-center",horizontal=false,skipHttp=false, margin='mb2', title, value='NA',children}) {
	if(horizontal){
		return  (
			<div className="flex horizontally space-bw">
				<p style={{color:"var(--theme-secondary-color)"}}>{title}:</p>
				<div className="text-truncate flex-1 ml1">{value ? value:'NA'}</div>
			</div>
		)
	}
	value = String(value)
	if(value.startsWith('[')){
		let files = JSON.parse(value)
		return (
			<div className={`flex w-100 ${className}`}>
				<p style={{fontSize:'.9rem',color:"rgb(107,114,128)",marginBottom:4,textTransform:'capitalize'}}>{title}</p>
				<div className='flex flex-wrap'>
					{
						files.map((file, index)=>{
							return <Attachment key={index} url={file}/>
						})
					}
				</div>
			</div>
		)
	}
	if(skipHttp){
		return (
			<div className={`w-100 ${className} ${margin}`}>
				<p style={{fontSize:'.9rem',color:"rgb(107,114,128)",marginBottom:4,textTransform:'capitalize'}}>{title}</p>
				{
					value!=='.child'?
						<div className="text-truncate">{value ? value:'NA'}</div>
						:children
				}
			</div>
		)
	}

	if(!skipHttp && value.startsWith('http')){
		return (
			<div className={`${className}`}>
				<div className='text-muted mr4 uppercase' style={{minWidth: '80px', maxWidth: '120px', wordBreak: 'break-all'}}>{title}</div>
				<Attachment url={value}/>
			</div>
		)
	}
	return (
        <div className={`w-100 ${className} ${margin}`}>
            <p style={{fontSize:'.9rem',color:"rgb(107,114,128)",marginBottom:4,textTransform:'capitalize'}}>{title}</p>
			{
				value!=='.child'?
				<div>{value ? value:'NA'}</div>
				:children
			}
        </div>
	)
}

KeyValue.propTypes = {
	/**
	 * All Classes
	 */
	className:Props.string,
    /**
	 * Title for value
	 */
     title:Props.string,
    /**
	 * Value
	 */
	value:Props.any,
}

export default KeyValue;

