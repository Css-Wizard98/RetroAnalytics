import React from 'react'
import Props from 'prop-types'
import './Tags.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Tags with All classes
 */
function Tags({className="mt3", style, onDelete, node, tags, setTags, align, tagCounts}) {

    const removeTag = (val) => {
        if(onDelete){
            onDelete(val)
        }
        let arr = []
        if(node){
            arr = tags.filter((tag)=>tag[node]!==val)
        }else{
            arr = tags.filter((tag)=>tag!==val)
        }
        setTags(arr)
    }

	return (
       <div style={style} className={className}>
            <div className='mt1 flex align-center flex-wrap' style={{justifyContent: align}}>
                {
                    tags.map((tag,index)=>{
                        return (
                            <div key={index} className='chip flex align-center justify-between' style={{maxWidth:'100%'}}>
                                <div className='flex text-truncate'>
                                    {tagCounts&&<div className='text-white flex center mr1' style={{width:20, minWidth:20, height:20, borderRadius:15, fontSize:'0.7rem', background:'#222'}}>{index+1}</div>}
                                    <div className='text-truncate'>{node?tag[node]:tag}</div>
                                </div>
                                <i onClick={()=>removeTag(node?tag[node]:tag)} className="ml2 pointer fas fa-times"/>
                            </div>
                        )
                    })
                }
            </div>
	   </div>
	)
}

Tags.propTypes = {
	/**
	 * All Classes
	 */
	className:Props.string,
    /**
	 * Style Object
	 */
	style:Props.string,
    /**
	 * Array of tags labels
	 */
	tags:Props.array,
    /**
	 * Function to update the tags array
	 */
	setTags:Props.func,
    /**
	 * Alignment of tags
	 */
	align:Props.func,
}

export default Tags;
