import React from 'react'
import Props from 'prop-types'
import './Tabs.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Statelss Tabswith all classes
 */

function StatelessTab ({className="",  active, tabs, onClick, style}) {
	return (
		<div style={{ ...style}} className={`stateless-tabs scrollbar-hidden ${className}`}>
            {
                tabs.map((tab,index)=>{
					return (
						<div key={index} onClick={()=>onClick(tab)} className={'tab-option relative'}>
							{tab}
							{
								active===tab && <div style={{
									height:4,
									borderTopLeftRadius:8,
									borderTopRightRadius:8,
									bottom:-2,
									background:"#222"
								}} className="absolute FadeInLeft-Effect  left-0 right-0">

								</div>
							}
						</div>
					)
                })
            }
        </div>
	)
}

StatelessTab.propTypes = {
	/**
	 * Use external css classes
	 */
	className:Props.string,
    /**
	 * Array of Tab labels
	 */
	tabs:Props.array,
    /**
	 * Label of currently active Tab
	 */
	active:Props.string,
    /**
	 * Function to change active Tab
	 */
	onClick:Props.func,
}

export default StatelessTab
