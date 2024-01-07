import React, {useEffect, useState} from 'react';
import {get} from '../../App/Network/Axios';
import {Input, SearchableSelect, TOAST} from '../index'
import ALL_CURRENCIES from './allCurrencies'

function CurrencyConverter({currency, amount, label, getAmount, className, style, defaultValue, placeholder}) {

    const [Converted, setConverted] = useState({from:'INR', to:'INR', rate:1});
    const [SelectedCurrency, setSelectedCurrency] = useState(defaultValue?defaultValue.currency:'INR');
    const [Amount, setAmount] = useState(defaultValue?defaultValue.amount:0);

    if(currency){
        currency.current = {value: SelectedCurrency}
    }

    //getAmount to get amount in base value
    useEffect(() => {
        if(getAmount){
            getAmount.current = ()=>{
                return (Number(amount.current.value)*Converted.rate)
            }
        }
    }, [Converted, amount, getAmount]);

    useEffect(() => {
        get(`/config/currency`, (e,r)=>{
            if(r){
                setConverted(r)
            }else if(e){
                TOAST.handleError(e)
            }
        },{currency: SelectedCurrency})
    }, [SelectedCurrency, amount]);

    return (
        <>
            <div className="flex horizontally center-vertically">
                <div className="flex-2 mr1">
                    <SearchableSelect clearOnFocus={true}  onSearch={(item,val)=>item.name.includes(val.toUpperCase())} value={SelectedCurrency} onSelect={val=>setSelectedCurrency(val.name)} className='mr1' list={ALL_CURRENCIES} label='Currency' placeholder='Select Currency'/>
                </div>
                <div className="flex-3 ml1">
                    <Input defaultValue={Amount} ref={amount} type='number' value={Amount} onChange={setAmount} className='flex-fill' label={label?label:'Amount'} placeholder={placeholder? placeholder : label ?label:'Amount'}/>
                </div>
            </div>
            {/* {
                Converted.from!==Converted.to && !isNaN(Math.ceil(Amount*Converted.rate))&&
                <div className='border-dark pd1 text-small rounded-sm mt2'>
                    <i className='fas fa-info-circle mr1'/>Entered amount will be converted to <b>{Converted.to} {Math.ceil(Amount*Converted.rate)}</b>
                </div>
            } */}
        </>
    );
}

export default CurrencyConverter;
