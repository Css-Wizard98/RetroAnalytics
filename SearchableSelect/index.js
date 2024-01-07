import React, {useEffect, useId, useRef, useState} from 'react';
import './index.css'

function Index({label, placeholder,clearOnFocus = false, morph, disabled, value, onSelect, selected, list, className='', renderItems, labelKey='name', onSearch}) {

    const [Value, setValue] = useState(value?value:'');
    const [FilteredValues, setFilteredValues] = useState([]);

    const ID = useId();
    let LIST = useRef(null), INPUT = useRef(null);

    useEffect(() => {
        if(selected){
            setValue(`${selected[labelKey]?selected[labelKey]:''}`)
        }
    }, [selected, list]);

    const onFocus = () => {
        if(clearOnFocus){
            setFilteredValues(list)
            setValue("")
        }else{
            let val = INPUT.current.value;
            if(val.length>1){
                let filtered = list.filter((item)=>{
                    if(onSearch){
                        return onSearch(item, val)
                    }else{
                        item[labelKey].toLowerCase().includes(val.toLowerCase())
                    }
                })
                setFilteredValues(filtered)
            }else{
                setFilteredValues(list)
            }
        }
    }

    const onChange = () => {
        let val = INPUT.current.value;
        if(val.length>1){
            let filtered = list.filter((item)=>{
                if(onSearch){
                    return onSearch(item, val)
                }else{
                    item[labelKey].toLowerCase().includes(val.toLowerCase())
                }
            })
            setFilteredValues(filtered)
        }else{
            setFilteredValues(list)
        }
    }

    const selectItem = (item) => {
        setValue(`${item[labelKey]}`);
        onSelect(item)
        setFilteredValues([])
    }

    return (
        <>
        <div className={`relative ${className}`}>
            <div className='text-start mb1'>
				{(label&&!morph)&&<label htmlFor={ID} className={`text-input-label `}>{label}</label>}
			</div>
            <input onBlur={()=>setFilteredValues([])} autoComplete='off' id={ID} ref={INPUT} onFocus={onFocus} onChange={(e)=>{setValue(e.target.value);onChange()}} type='text' placeholder={!morph?placeholder:''} disabled={disabled} className='searchable' value={Value}/>
            <i className='fas fa-chevron-down absolute' style={{right:15, top:'60%'}}/>
            {(label&&morph)&&<label htmlFor={ID} className={`morph-label ${Value?'morph-active':''}`}>{label}</label>}
            {
                FilteredValues.length?
                <div onMouseDown={(e) => e.preventDefault()} ref={LIST} className='searchable-result FadeInDown-Effect'>
                    {
                        FilteredValues.map((item,index)=>{
                            return (
                                <div onClick={()=>{selectItem(item)}} key={index} className='item'>
                                    {
                                        renderItems?
                                        renderItems(item):
                                        item[labelKey]
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                :<></>
            }
        </div>
        </>
    );
}

export default Index;
