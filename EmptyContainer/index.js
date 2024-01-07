import React from 'react'

export default function EmptyContainer({src,title,description,modal=false}){
    if(modal){
        return (<div className="flex mt6 pd4 vertically center">
            <img style={{height:200}} src={src} alt="Empty"/>
            <h2 className="fw-bold mt2">
                {title}
            </h2>
            <p className="text-small">
                {description}
            </p>
        </div>)
    }
    return (<div className="flex pd6 mt6 mb6 vertically center">
        <img style={{height:350}} src={src} alt="Empty"/>
        <h1 className="fw-bold mt2">
            {title}
        </h1>
        <p className="text-small">
            {description}
        </p>
    </div>)
}
