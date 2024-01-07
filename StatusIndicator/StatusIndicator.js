import React from 'react';
import "./StatusIndicator.css"

function StatusIndicator({priority, style}) {
    if(priority==='HIGH'){
        return <div style={style} className='indicator-dot high'/>
    }
    if(priority==='MID'){
        return <div style={style} className='indicator-dot mid'/>
    }
    return <div style={style} className='indicator-dot low'/>
}

export default StatusIndicator;