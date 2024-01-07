import React, {useState} from 'react';
import {Empty, Headings, Loaders, Modal, TOAST} from '../index';
import './BorderTable.css'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Simple Bordered Table with All classes
 */


function BorderTable({sortby=[], params, filters=[], freeze=false, rows, headers, title, onSearch, options, empty, colwidths=[], onSelect, selectionKeys, defaultHeaders, className}) {

    const [SortBy, setSortBy] = useState();
    const [Order, setOrder] = useState('asc');

    const [showFilters, setshowFilters] = useState();
    const [SelectedFilter, setSelectedFilter] = useState();
    const [SelectedItems, setSelectedItems] = useState([]);

    //Settings visible headers to default headers if available
    const [Headers, setHeaders] = useState(defaultHeaders?defaultHeaders:headers);

    const [showHeaders, setshowHeaders] = useState();

    const onFilter = (key,option)=>{
        if(key){
            let search = {...params[0]}
            search[key] = option
            params[1](search)
        }else{
            let search = {...params[0]}
            delete search[filters[showFilters].key]
            params[1](search)
        }
    }

    const onSort = (sort,order)=>{
        params[1](prev=>({...prev, sort: camelCase(sort), order}))
    }

    //Forming an array of headers index positions that are hidden/collapsed
    let COLLAPSED = []
    headers.forEach((head, index) => {
        if(!Headers.includes(head)&&head!==''){
            COLLAPSED.push(index)
        }
    });

    //Convert header to camelCase for API based sorting of columns
    function camelCase(str){
        var ans = str.toLowerCase();
        return ans.split(" ").reduce((s,c)=> s + (c.charAt(0).toUpperCase()+ c.slice(1) ));
    }

    const selectItem = (item, checked) => {
        if(selectionKeys){
            if(SelectedItems.includes(item)){
                let selection = SelectedItems.filter(row=>row!==item)
                setSelectedItems(selection)
                onSelect(selection)
            }else{
                setSelectedItems([...SelectedItems, item])
                onSelect([...SelectedItems, item])
            }
        }
    }

    return (
        <>
            <div className='mt4'>
                {
                    rows?
                        <div className='borderTable'>
                            {(title || options || onSearch) &&
                                <div className='top-bar'>
                                    {title&&<Headings.Regular className='mr2 mb3 flex align-center'>{title}</Headings.Regular>}
                                    <div className='flex align-center'>
                                        {options&&<div className='mb3'>{options}</div>}
                                        {
                                            onSearch&&
                                            <div className='relative ml2 mb3'>
                                                <input onChange={e=>onSearch(e.target.value)} type='text' placeholder='Search' style={{padding:'0.75rem', paddingRight: '2rem', fontSize:'0.8rem', background: 'var(--theme-surface-color)', borderColor: 'var(--theme-border-color)'}}/>
                                                <i className='fas fa-search absolute' style={{right:'0.75rem', top:'0.75rem', fontSize: '0.8rem'}}/>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                            <div className='ledger'>
                                <table style={{tableLayout:'fixed'}} className={className}>
                                    <thead>
                                    <tr style={{background:'rgba(0, 0, 0, 0.03)'}}>
                                        {
                                            //Empty first header if checkbox functionality is ON
                                            onSelect&&selectionKeys?<th></th>:<></>
                                        }
                                        {
                                            Headers.map((head,index)=>{
                                                return (
                                                    <th className={freeze&&index===0?'freeze':''} style={colwidths?{width:colwidths[index]}:{}} key={index}>
                                                        <div className='flex align-center justify-between'>
                                                            <div className='flex w-100 text-nowrap align-center' onClick={()=>{
                                                                if(sortby.includes(head)){
                                                                    if(SortBy===head){
                                                                        if(Order==='asc'){
                                                                            setOrder('desc');onSort(head, 'desc')
                                                                        }else{
                                                                            setOrder('asc');onSort(head, 'asc')
                                                                        }
                                                                    }else{
                                                                        setOrder('asc');setSortBy(head);onSort(head, 'asc')
                                                                    }
                                                                }
                                                            }} id={`header-${head.replace(' ','')}`}>
                                                                {head}
                                                                {sortby.includes(head)?SortBy===head?Order==='asc'?<i className='fa fa-sort-up ml1'/>:<i className='fa fa-sort-down ml1'/>:<i className='fa fa-sort ml1'/>:<></>}
                                                            </div>
                                                            {
                                                                //If Default headers are provides turn on Header Customization
                                                                defaultHeaders&&
                                                                <div onClick={()=>setshowHeaders(true)} className='customize'><i className='ml2 fas fa-cog'/></div>
                                                            }
                                                            {Object.keys(filters).includes(head)?
                                                                <div className='relative' onClick={()=>setshowFilters(head)}>
                                                                    <i className='fa fa-filter ml1'/>
                                                                    {
                                                                        showFilters===head&&
                                                                        <div className='filters FadeInDown-Effect absolute border pd2 rounded-md pd1'>
                                                                            <div className='flex align-center justify-between mb1'>
                                                                                <div className='text-small'>Filters</div>
                                                                                <h2 onClick={(e)=>{e.stopPropagation();setshowFilters(undefined)}}><i className='fas fa-times-circle'/></h2>
                                                                            </div>
                                                                            <div className='flex flex-wrap' style={{width:'100vh', maxWidth:300}}>
                                                                                {
                                                                                    filters[head].options.map((item,index)=>{
                                                                                        if(!item)
                                                                                        return <></>
                                                                                        return <div key={index}
                                                                                            onClick={()=>{
                                                                                                if(SelectedFilter===item){
                                                                                                    setSelectedFilter(undefined)
                                                                                                    onFilter(undefined)
                                                                                                }else{
                                                                                                    setSelectedFilter(item);onFilter(filters[head].key,item)
                                                                                            }}}
                                                                                            className={`${SelectedFilter===item?'chip-active':'chip'} rounded-sm text-nowrap text-center`} style={{minWidth:50,padding:'0.3rem 0.5rem', fontSize:'0.7rem'}}>{item}</div>
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                :<></>
                                                            }
                                                        </div>
                                                    </th>
                                                )
                                            })
                                        }
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        rows.map((row, index)=>{
                                            return (
                                                <tr onClick={()=>{
                                                    //If Selectio functionality is ON then show checkbox
                                                    if(onSelect&&selectionKeys){
                                                        if(selectionKeys[index])
                                                        selectItem(selectionKeys[index])
                                                        else
                                                        TOAST.warning('This item cannot be selected')
                                                    }
                                                }} key={index} style={{background: onSelect&&selectionKeys&&SelectedItems.includes(selectionKeys[index])?'#f2f2f2':'transparent'}}>
                                                    {
                                                        onSelect&&selectionKeys?
                                                        selectionKeys[index]?
                                                        <td><input checked={SelectedItems.includes(selectionKeys[index])} onChange={(e)=>selectItem(selectionKeys[index],e.target.checked)} type='checkbox'/></td>
                                                        :<td/>
                                                        :<></>
                                                    }
                                                    {
                                                        //Skipping items that have index stored in collapsed array
                                                        row.map((col,index)=>{
                                                            if(COLLAPSED.includes(index)){
                                                                return <></>
                                                            }
                                                            return <td  className={freeze&&index===0?'freeze':''} key={index}>{col}</td>
                                                        })
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                                {
                                    rows.length===0&&
                                    <div className="flex align-center justify-center pd2">
                                        <Empty label={empty}/>
                                    </div>
                                }
                            </div>
                        </div>
                        :<div className='mt5 w-100 h-100 flex center'><Loaders.Medium/></div>
                }
            </div>
            {
                showHeaders&&
                <Modal blank={true} title='Customize Headers' onClose={()=>setshowHeaders()}>
                        <div className='mt1 flex align-center flex-wrap'>
                            {
                                headers.map((option, index)=>{
                                    let active = false;
                                    active = Headers&&Headers.includes(option)
                                    if(!option)
                                    return <></>
                                    return (
                                        <div key={index} onClick={()=>{
                                            //If deselecting header than filter on Selected headers
                                            if(Headers.includes(option)){
                                                let newHeaders = Headers.filter(header=>header!==option)
                                                setHeaders(newHeaders)
                                            }else{
                                                //If selecting header than filter on All headers
                                                let newHeaders = headers.filter(header=>header===option||Headers.includes(header))
                                                setHeaders(newHeaders)
                                            }
                                        }}  className={`${active?'chip-active':'chip'}`}>
                                            {option}
                                        </div>
                                    )
                                })
                            }
                        </div>
                </Modal>
            }
        </>
    );
}

export default BorderTable;
