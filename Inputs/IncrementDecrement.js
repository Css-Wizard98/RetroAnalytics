import React from 'react';
import {TOAST} from '../Alert/Alert';
import './Input.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Increment Descrement Input
 */

function IncrementDecrement({className, style, max, min, value, setValue}) {

    const changeValue = (op) => {
        let newVal = value+op
        if(newVal>max){
            TOAST.error(`Maximun ${max} is allowed`)
            return
        }
        if(newVal<min){
            return
        }
        setValue(newVal)
    }

    return (
        <div className={`inc-dec ${className}`} style={style}>
            <div onClick={()=>changeValue(-1)} className='plusMinus'>-</div>
            <input value={value} type='text' className='value' style={{minWidth:60}}/>
            <div onClick={()=>changeValue(1)} className='plusMinus'>+</div>
        </div>
    );
}

export default IncrementDecrement;
