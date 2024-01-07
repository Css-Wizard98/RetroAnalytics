import React, {useCallback, useEffect, useId, useRef, useState} from 'react';
import './index.css'
import {get} from '../../App/Network/Axios'
import {debounce} from "../Utils";
import useRecentLocations from '../Hooks/useRecentLocations';

const Highlighted = ({text = '', highlight = ''}) => {
    if (!highlight.trim()) {
        return <span>{text}</span>
    }
    const regex = new RegExp(`(${_.escapeRegExp(highlight)})`, 'gi')
    const parts = text.split(regex)
    return (
        <span style={{color:"#777"}}>
        {parts.filter(part => part).map((part, i) => (
            regex.test(part) ? <span style={{fontWeight:600,color:"#333"}} key={i}>{part}</span> : <span key={i}>{part}</span>
        ))}
    </span>
    )
}
function Index({label,renderResult,modalSearch=false,removeOnSelect=false, recentCities=false, recentPlaces=false, geocode, placeholder,  disabled, value, onSelect, selected, api,resultKey, className='', style={}, searchKey='name'}) {
    console.log("::selected::",selected);
    let morph = false;
    const [modal,setModal] = useState(false)
    const [Value, setValue] = useState(value?value:'');
    const [FilteredValues, setFilteredValues] = useState([]);
    const [Loading, setLoading] = useState();
    const PLACES = useRecentLocations().recentPlaces
    const RECENTS = useRecentLocations().recentCities;
    const ID = useId();
    let LIST = useRef(null), INPUT = useRef(null);

    useEffect(() => {
        if(value&&value.includes('@')&&value.includes(':')){
            let val = value.split('@')[1]
            setValue(val)
            onSelect(value)
        }
        //eslint-disable-next-line
    }, [value]);

    useEffect(() => {
        if(selected){
            if(typeof(selected)==='object'){
                setValue(`${selected[searchKey]?selected[searchKey]:''}`)
            }else{
                //Remove Gecords from user view
                if(selected.includes('@')){
                    setValue(selected.split('@')[1])
                }else{
                    setValue(selected)
                }
            }
        }
    }, [selected,searchKey]);

    // eslint-disable-next-line
    const onChange = useCallback(debounce(() => {
        let val = INPUT.current?INPUT.current.value:"";
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
            if(!recentCities&&!recentPlaces){
                setFilteredValues([])
            }
        }
    }), [RECENTS, recentCities])

    const selectItem = (item) => {
        if(geocode){
            reverseGeocode(item)
        }else{
            setValue(`${item[searchKey]}`);
            onSelect(item)
            setFilteredValues([])
        }
        if(removeOnSelect){
            setValue(``);
        }
    }

    const reverseGeocode = (location) => {
        setLoading(true)
        get(`/search/geocode.reverse`, (e,r)=>{
            if(r){
                onSelect(`${r.lat}:${r.lng}@${location}`)
                setLoading()
                setFilteredValues([])
            }else if(e){
                setLoading()
                setFilteredValues([])
            }
        },{name: location})
    }

    if(modalSearch){
        return (
            <div className={`relative  ${className}`}>
                <div className='text-start mb1'>
                    {(label&&!morph)&&<label htmlFor={ID} className={`text-input-label `}>{label}</label>}
                </div>
                <div onClick={()=>{
                    setModal(true)
                }} style={{padding:'10px 12px'}} className="pointer border-dark rounded-sm">
                    {placeholder}
                </div>
                {
                    modal && <>
                        <div className="fixed-11 inset-0">
                            <div  onClick={(e)=>{
                                if(!LIST || !LIST.current.contains(e.target)){
                                    setModal(false)
                                }
                            }}  className="transition-opacity fixed inset-0 backdrop-blur">
                                <div className="pt6">
                                    <p className="mb2 text-small m-auto text-center">
                                        Enter your search criteria to search results.
                                    </p>
                                    <div ref={LIST} className="transition-all m-auto" style={{
                                        maxWidth:"32rem"
                                    }}>
                                        <div className="headless border rounded-md shadow-md">
                                            <div className="relative">
                                                <input autoComplete='off' id={ID} ref={INPUT} onFocus={()=>{onChange();recentCities&&setFilteredValues(RECENTS);recentPlaces&&setFilteredValues(PLACES)}} onChange={(e)=>{setValue(e.target.value);onChange();recentCities&&setFilteredValues(RECENTS)}}  value={Value} autoFocus placeholder={placeholder} type="text" />
                                                <div className="absolute right-2 top-2">
                                                    <i  className="fa fa-search"/>
                                                </div>
                                            </div>
                                            <div style={{height:2,overflow:'hidden',position:'relative'}}>
                                                {Loading&&<div className='hitZak-loader2'/>}
                                            </div>
                                            {
                                                FilteredValues.length?
                                                    <div className='FadeInDown-Effect relative'>
                                                        {
                                                            FilteredValues.map((item,index)=>{
                                                                return (
                                                                    <div onClick={()=>{
                                                                        setValue("")
                                                                        selectItem(item);
                                                                        setModal(false)
                                                                    }} key={index} className='item'>
                                                                        <Highlighted text={item} highlight={Value}/>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    :<></>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        )
    }

    return (
        <>
            <div className={`relative ${className}`}>
                <div className='text-start mb1'>
                    {(label&&!morph)&&<label htmlFor={ID} className={`text-input-label `}>{label}</label>}
                </div>
                <input style={style} autoComplete='off' id={ID} ref={INPUT} onFocus={()=>{onChange();recentCities&&setFilteredValues(RECENTS);recentPlaces&&setFilteredValues(PLACES)}} onChange={(e)=>{setValue(e.target.value);onChange();recentCities&&setFilteredValues(RECENTS)}} type='text' placeholder={!morph?placeholder:''} disabled={disabled} className='search-input' value={Value}/>
                {(label&&morph)&&<label htmlFor={ID} className={`morph-label ${Value?'morph-active':''}`}>{label}</label>}

                {
                    FilteredValues.length?
                        <div ref={LIST} className='search-result FadeInDown-Effect relative'>
                            {Loading&&<div className='absolute FadeInDown-Effect' style={{top:'-0.75rem', left:0, right:0}}><div className='hitZak-loader'/></div>}
                            {
                                FilteredValues.map((item,index)=>{
                                    if(renderResult){
                                        return      <div onClick={()=>{selectItem(item)}} key={index} className='item'>
                                            {renderResult(item)}
                                        </div>
                                    }
                                    return (
                                        <div onClick={()=>{selectItem(item)}} key={index} className='item'>
                                            {item.local&&<i className='fa fa-history mr1'/>}
                                            {
                                                typeof(item)==='object'
                                                    ?item[searchKey]
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

export default Index;
