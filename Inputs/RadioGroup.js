import React from 'react'

/**
 * RadioGroup
 *
 * @param items
 * @param checked
 * @param setChecked
 * @returns {JSX.Element}
 * @constructor
 */
export default function RadioGroup({items, checked, setChecked}) {
	return (
		<>
			{items.map((item, index) => {
                return (
                    <div onClick={()=>{
                        setChecked(item.id)
                    }} className="flex pointer horizontally mb2">
                        <div style={{
                            width:14,
                            height:14,
                            borderRadius:14,
                            marginTop:item.description?6:3,
                            border: checked === item.id ? '4px solid #6367FA' : '1px solid #E0E0E0',
                        }}/>
                        <div className="ml2">
                            <p className="fw-500">
                                {item.title}
                            </p>
							{
								item.description && <p className="text-small text-muted">
									{item.description}
								</p>
							}
                        </div>
                    </div>
                )
			})}
		</>
	)
}
