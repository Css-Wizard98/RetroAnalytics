import {useEffect, useId, useState} from "react";
import {get, post} from '../../App/Network/Axios'
import './Master.css'

const MasterInput = ({label, placeholder, fieldId, master, onUpdate, handleRef, details, token, style, className, morph, disabled}) => {

    let ID = useId();
    const [suggestion,setSuggestion] = useState([]);
    const [selected,setSelected] = useState(undefined);
    const [Value,setValue] = useState('')
    const [next,setNext] = useState(undefined);

    useEffect(()=>{
        if(handleRef) {
            handleRef({
                getValue:()=>selected
            })
        }
    })

    useEffect(()=>{
        if(Value.length>0) {
            get(`/formSearch/${details.id}/master`, (e, r) => {
                if (r) {
                    let data = {};
                    if (r.data.length > 0) {
                        Object.keys(master).forEach(val => {
                            data[r.data[0]] = master[r.data[0]];
                        })
                        setNext(r.next);

                        post(`/formSearch/${details.id}/search`, {
                            q: Value,
                            data,
                            token:token
                        }, (e, r) => {
                            if (r) {
                                setSuggestion(r.results);
                            }
                        })
                    } else {
                        setNext(r.next);
                        post(`/formSearch/${details.id}/search`, {
                            q: Value,
                            token:token

                        }, (e, r) => {
                            if (r) {
                                setSuggestion(r.results);
                            }
                        })
                    }

                }
            }, {
                q: Value,
                token:token

            })
        } else {
            setValue('');
            setSuggestion([]);
        }
    },[Value, details, master, token])

     let onChange=(e)=>{
        setValue(e.target.value);
        setSuggestion([]);
        setSelected(undefined);
    }

    let suggestionList = (item,index) => {
        let items = Object.keys(item).map(i => (i));
        let key = Object.keys(item)[0];
        return(
            <div className="item" key={index} onClick={()=>{
                onUpdate(next,item[next]);
                setSelected(item[fieldId]?item[fieldId]:item[key]);
                setValue('');
                setSuggestion([]);
            }}>
                {items.map((val,i)=>{
                    return(
                        <div className="flex align-center text-small" key={i}>
                             <div>{val} : </div>
                            <div>{item[val]}</div>
                        </div>
                    )
                })}
            </div>
        )
    }



    return(
        <>
       <div className={`relative ${className}`}>
            <div className='text-start mb1'>
				{(label&&!morph)&&<label htmlFor={ID} className={`text-input-label `}>{label}</label>}
			</div>
            <input autoComplete='off' id={ID} onChange={onChange} type='text' placeholder={!morph?placeholder:''} disabled={disabled} className='search-input' value={selected?selected:Value}/>
            {(label&&morph)&&<label htmlFor={ID} className={`morph-label ${Value?'morph-active':''}`}>{label}</label>}
            {
                suggestion.length?
                <div className='search-result FadeInDown-Effect'>
                    <div className='header text-muted'>Results</div>
                    {
                        suggestion.map(suggestionList)
                    }
                </div>
                :<></>
            }
        </div>
       </>
    )
}

export {MasterInput}
