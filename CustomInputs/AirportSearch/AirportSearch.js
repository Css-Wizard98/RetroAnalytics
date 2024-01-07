import React, {useCallback, useEffect, useId, useRef, useState} from 'react';
import {get} from '../../../App/Network/Axios'
import useRecentLocations from '../../Hooks/useRecentLocations';
import {debounce} from "../../Utils";

function AirportSearch({label, recents=true, icon, placeholder, morph, disabled, value, onSelect, selected, api,resultKey, className='', searchKey='name'}) {

    const [Value, setValue] = useState(value?value:'');
    const [FilteredValues, setFilteredValues] = useState([]);
    const [Loading, setLoading] = useState();

    const RECENTS = useRecentLocations().recentCities?.filter((item)=>item.airport);
    const ID = useId();
    let LIST = useRef(null), INPUT = useRef(null);

    useEffect(() => {
        if(selected){
            if(typeof(selected)==='object'){
                setValue(`${selected[searchKey]?selected[searchKey]:''}`)
            }else{
                setValue(selected)
            }
        }
    }, [selected,searchKey]);

     // eslint-disable-next-line
    const onChange = useCallback(debounce(() => {
        let val = INPUT.current.value;
        if(val.length>1){
            setLoading(true)
            get(`${api}`, (e,r)=>{
                if(r){
                    if(typeof(r)==='object'){
                        let key = Object.keys(r)[0]
                        if(resultKey)
                            key = resultKey;
                        setFilteredValues(r[key])
                        if(r[key].length){
                            document.addEventListener("click", function closeMenu(event) {
                                if (LIST.current && !LIST.current.contains(event.target)) {
                                  setFilteredValues([])
                                  document.removeEventListener('click',closeMenu)
                                }
                            });
                        }
                    }else{
                        setFilteredValues(r)
                        if(r.length){
                            document.addEventListener("click", function closeMenu(event) {
                                if (LIST.current && !LIST.current.contains(event.target)) {
                                  setFilteredValues([])
                                  document.removeEventListener('click',closeMenu)
                                }
                            });
                        }
                    }
                }
                setLoading()
            },{q:val})
        }else{
            !recents&&setFilteredValues([])
        }
    }), [RECENTS, recents])

    const selectItem = (item) => {
        setValue(`${item[searchKey]}`);
        onSelect(item)
        setFilteredValues([])
    }

    return (
        <>
        <div className={`relative ${className}`}>
            <div className='text-start mb1'>
				{(label&&!morph)&&<label htmlFor={ID} className={`text-input-label `}>{label}</label>}
			</div>
            <input style={{textIndent:'2rem'}} autoComplete='off' id={ID} ref={INPUT} onFocus={()=>{onChange();recents&&setFilteredValues(RECENTS)}} onChange={(e)=>{setValue(e.target.value);onChange();recents&&setFilteredValues(RECENTS)}} type='text' placeholder={!morph?placeholder:''} disabled={disabled} className='search-input' value={Value}/>
            <div className='absolute' style={{top:'0.75rem', left:'1rem'}}><i className={icon?icon:'fas fa-plane'}/></div>
            {(label&&morph)&&<label htmlFor={ID} className={`morph-label ${Value?'morph-active':''}`}>{label}</label>}
            {
                FilteredValues.length?
                <div ref={LIST} className='search-result FadeInDown-Effect scrollbar-autohide'>
                    {Loading&&<div className='absolute FadeInDown-Effect' style={{top:'-0.75rem', left:0, right:0}}><div className='hitZak-loader'/></div>}
                    {
                        FilteredValues.map((item,index)=>{
                            return (
                                <div onClick={()=>{selectItem(item)}} key={index} className='item'>
                                    {item.local&&<i className='fa fa-history mr1'/>}
                                    {
                                        typeof(item)==='object'?
                                        <>
                                        <span className='fw-bold'>{item[searchKey]}</span><br/>
                                        <span className='text-small text-muted'>{item.airport} ({item.code})</span>
                                        </>
                                        :item
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

export default AirportSearch;
