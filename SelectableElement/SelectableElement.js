import React, {useEffect, useRef, useState} from 'react';
import './SelectableElement.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Selectable wrapper for elements
 */
function SelectableElement({toggle, children, width, id, setState, state, className, style}) {

    const [Checked, setChecked] = useState(false);
    let CHECKBOX = useRef()

    useEffect(() => {
        if(state){
            setChecked(state.includes(id))
        }
    }, [state,id]);

    useEffect(() => {
        if(toggle){
            toggle.current = ()=>CHECKBOX.current.click()
        }
    }, [toggle]);

    const selectElement = (e) => {
        if(id){
            let arr = []
            if(e.target.checked){
                arr = [...state,id]
            }else{
                arr = state.filter(i=>i!==id)
            }
            setState(arr)
        }
    }

    return (
        <div className={`selectable-wrapper ${Checked?'checked-item':''} ${className}`} style={{...width&&{maxWidth:width}, ...style}}>
            {children}
            {
                state&&setState?
                <div className='check-box'>
                    <input ref={CHECKBOX} className='check-input' onChange={selectElement} checked={Checked} type='checkbox'/>
                </div>
                :<></>
            }
        </div>
    );
}

export default SelectableElement;
