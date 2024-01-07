import React from 'react'
import PropTypes from "prop-types";

function AnalyticTiles({title,items=[]}) {
    const colors = [
        "rgb(205, 228, 208)",
        "rgb(247, 235, 221)",
        "rgb(254, 227, 236)",
        "rgb(225, 229, 234)"
    ]
	return (
		<div>
            <h3 className="fw-bold">{title}</h3>
            <div className="flex horizontally mt2 overScrollX scrollbar-autohide">
                {
                    items.map((item,index)=>{
                        return (
                            <div style={{background:colors[index%4],borderColor:colors[index%4]}} className="FadeInRight-Effect stats-card" key={item.title}>
                                <h2 className="heading-lg">
                                    {item.value}
                                </h2>
                                <p className="text fw-bold mb1">
                                    {item.title}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
		</div>
	)
}

AnalyticTiles.propTypes = {
    title:PropTypes.string.isRequired,
    items:PropTypes.array
}

export default AnalyticTiles;
