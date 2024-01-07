import React, {useEffect, useState} from 'react';
import {Button} from '../index';
import './Filters.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Fitlers Component
 */

function FiltersMenu({get, set, filters, className, margin='mt1'}) {

    const [Filters, setFilters] = useState({});
    const [SelectedFilter, setSelectedFilter] = useState({});

    const selectFilter = (type, key, value) => {
        //Spreading previously set filters
        let filters = {...SelectedFilter}
        //If filter type already exists
        if(SelectedFilter[type]){
            //Check if filter was already in use then deselect it
            if(SelectedFilter[type].values.includes(value)){
                filters[type].values = filters[type].values.filter(item=>item!==value)
                //Remove filters if no value is selected for it
                if(!filters[type].values.length){
                    delete filters[type]
                }
                setSelectedFilter(filters)
            //Check if filter was not in use then apply it
            }else{
                filters[type].values = [...filters[type].values, value]
                setSelectedFilter(filters)
            }
        //If filter does not exist in array
        }else{
            filters[type] = {values: [value], key}
            setSelectedFilter(filters)
        }
    }

    useEffect(() => {
        //On changing filters updating provided data with only filtered values
        if(Object.keys(SelectedFilter).length){
            let filtered = get.filter(item=>{
                let flag = true
                Object.keys(SelectedFilter).forEach(node => {
                    //Selecting values using key from filter
                    if(!SelectedFilter[node].values.includes(item[SelectedFilter[node].key])){
                        flag = false
                    }
                });
                return flag
            })
            set(filtered)
        }else{
            set([...get])
        }
        // eslint-disable-next-line
    }, [SelectedFilter]);

    useEffect(() => {
        if(filters&&get){
            let update = {...Filters}
            //For each filter create an object {LABEL: <DISTICT VALUES FOR EACH DATA NODE>}
            filters.forEach(filter => {
                get.forEach(element => {
                    if(update[filter.label]){
                        if(!update[filter.label].values.includes(element[filter.key])){
                            update[filter.label].values = [...update[filter.label].values, element[filter.key]]
                        }
                    }else{
                        update[filter.label] = {values:[element[filter.key]], key: filter.key}
                    }
                });
            });
            setFilters(update)
        }
        // eslint-disable-next-line
    }, [filters, get]);

    return (
        <div className='filters-wrapper'>
            <Button id='filter-btn' className={`btn-secondary text-small ${className}`} margin={margin}><i className="mr1 fas fa-sliders-h"></i> Filters</Button>
            {
                Object.keys(Filters).length>0&&
                <div className='filter-popup FadeInDown-Effect mt1'>
                {
                    Object.keys(Filters).map((filter,index)=>{
                        return (
                            <div key={index} className='mb2'>
                                <div className='text-small mb2'>By {filter}</div>
                                <div className='flex flex-wrap' style={{margin:'-0.5rem'}}>
                                    {
                                        Filters[filter].values.map((item,index)=>{
                                            if(!item || item.startsWith('CUSTOM::FORM::'))
                                            return <></>
                                            return <div key={index} onClick={()=>selectFilter(filter, Filters[filter].key,item)} className={`${SelectedFilter[filter]&&SelectedFilter[filter].values.includes(item)?'chip-active':'chip'} rounded-sm text-nowrap text-center`} style={{minWidth:50,padding:'0.3rem 0.5rem', fontSize:'0.7rem'}}>{item}</div>
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            }
        </div>
    );
}

export default FiltersMenu;
