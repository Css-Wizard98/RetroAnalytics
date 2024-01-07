import React, {useEffect, useState} from 'react';
import './GaugeLine.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Gaugeline Component
 */

function GaugeLine({total,value, labelStart, labelEnd,background}) {

    const [Width, setWidth] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setWidth(value*100/total)
        }, 200);
    }, [total, value]);

    return (
        <div className='gaugeline'>
            <div className='track'/>
            <div style={{width: `${Width>100?100:Width}%`,background}} className='fill'/>
            <div className='legend'>
                <div className='rounded-sm' style={{padding:'0.2rem 0rem'}}>{labelStart?labelStart:<>INR {value} used</>}</div>
                <div>{labelEnd?labelEnd:<>Total INR {total}</>}</div>
            </div>
        </div>
    );
}

export default GaugeLine;
