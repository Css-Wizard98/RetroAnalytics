import React from 'react'

export default function Tag({title,value,onRemove}) {
	return (
		<div className="border-bottom pt3 pb3 flex horizontally center-vertically">
            <div className="flex-1 fw-500 mr6">
                {title}
            </div>
            <div className="flex-2 text-muted flex horizontally center-vertically">
                {value}
                {
                    onRemove &&  <div onClick={onRemove} style={{color:"#f86565"}} className="ml3 text-small pointer" >
                        - Remove
                    </div>
                }
            </div>
		</div>
	)
}
