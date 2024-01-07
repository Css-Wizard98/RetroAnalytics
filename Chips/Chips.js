import React from 'react'
import Props from 'prop-types'
import './Chips.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Chips Select with All classes
 */
function Chips({className="mt3", style, label, align, type, options, selected, onSelect}) {
    const selectOption = (option) => {
        if(type==='multiple'){
            if(!selected){
                selected = []
            }
            if(selected.includes(option)){
                let arr = selected.filter((val=>val!==option))
                onSelect(arr)
            }else{
                onSelect([...selected, option])
            }
        }else{
            onSelect(option)
        }
    }

	return (
       <div style={style} className={className}>
            <div className='flex align-center justify-between'>
            {label&&<label>{label}</label>}
            {
                    type==='multiple'&&
                    <div style={{fontSize:12}} onClick={()=>{if(options.length===selected.length){onSelect([])}else{onSelect(options)}}}  className={`btn btn-link btn-sm`}>
                        {options.length===selected.length
                        ?'Deselect All'
                        :'Select All'}
                    </div>
                }
            </div>
            <div className='mt1 flex align-center flex-wrap' style={{justifyContent: align}}>
                {
                    options.sort().map((option, index)=>{
                        let active = false;
                        if(type==='multiple'){
                            active = selected&&selected.includes(option)
                        }else{
                            active = selected===option
                        }

                        if(!option)
                        return <></>

                        return (
                            <div key={index} onClick={()=>{selectOption(option)}}  className={`${active?'chip-active':'chip'}`}>
                                {option}
                            </div>
                        )
                    })
                }
            </div>
	   </div>
	)
}

Chips.defaultProps = {
	type: 'multiple',
    label: 'Select',
}

Chips.propTypes = {
	/**
	 * All Classes
	 */
	className:Props.string,
    /**
	 * Style Object
	 */
	style:Props.string,
	/**
	 * Pass function u want to call on click
	 */
	onSelect:Props.func,
    /**
	 * Label for component
	 */
	label:Props.string,
    /**
	 * Flex alignment (center, space-between, space-around, start, end)
	 */
	align:Props.string,
    /**
	 * Array of Options
	 */
	options:Props.array,
    /**
	 * State for storing Selected options
	 */
	selected:Props.any,
}

export default Chips;
