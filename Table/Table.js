import React, {useEffect, useState} from 'react'
import Props from 'prop-types'
import './Table.css'
import {SteakMenu} from '../../retro'
import DateRange from '../Inputs/DateRange'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default Table with All classes
 */


function useCardSwitch(type){
	type = `switch:values:${type}`
	let viewDefault = localStorage.getItem(type);
	if(!viewDefault)
		viewDefault = "list";
	const [VIEW,SET] = useState(viewDefault);
	const SETVIEW = (value) => {
		localStorage.setItem(type,value)
		SET(value)
	}
	return [
		VIEW,SETVIEW
	]
}

function Table({className, margin, headers, rows, actions, title, description, filters, applyFilters, tileRenderer, pages, switchPage}) {

    const [Selected, setSelected] = useState([]);
    const [SortBy, setSortBy] = useState(undefined);
    const [SortedRows, setSortedRows] = useState([]);
    const [View, setView] = useCardSwitch(title)
    const [ActivePage, setActivePage] = useState(0);

    const [Filters, setFilters] = useState(false);
    const [ActiveFilters, setActiveFilters] = useState([]);

    useEffect(() => {
        setSortedRows(rows)
    }, []);

    useEffect(() => {
        if(switchPage){
            switchPage(ActivePage)
        }
    }, [ActivePage]);

    useEffect(() => {
        if(applyFilters){
            applyFilters(ActiveFilters)
        }
    }, [ActiveFilters]);

    const changePage = (op) => {
        if(op<0){
            if(ActivePage>0){
                setActivePage(ActivePage-1)
            }
        }else if(op>1){
            if(ActivePage<pages){
                setActivePage(ActivePage+1)
            }
        }
    }

    const selectRow = (index) => {
        if(Selected.includes(index)){
            let newArr = Selected.filter((rowIndex)=>rowIndex!==index)
            setSelected(newArr)
        }else{
            setSelected([...Selected, index])
        }
    }

    const selectAll = (e) => {
        let checked = e.target.checked

        if(checked){
            let selected = rows.map((row, index)=>index)
            setSelected(selected)
        }else{
            setSelected([])
        }
    }

    const sortRows = (index) => {

        let sortedRows = [];

        if(SortBy && SortBy.index===index){
            if(SortBy.order){
                sortedRows = rows.sort((a, b)=>b[index] - a[index]);
            }else{
                sortedRows = rows.sort((a, b)=>a[index] - b[index]);
            }
            setSortBy({...SortBy, order: !SortBy.order})

        }else{
            sortedRows = rows.sort((a, b)=>a[index] - b[index]);
            setSortBy({index: index, order: true})
        }

        setSortedRows(sortedRows)
    }

    const applyFilter = (e, label) => {
        let checked = e.target.checked
        let filters = []

        if(checked){
            filters = [...ActiveFilters, label]
        }else{
            filters = ActiveFilters.filter((filter)=>filter!==label)
        }
        setActiveFilters(filters)
    }

	return (
		<>
        <div className={`table-top-bar ${margin}`}>
            <div>
                {title&&<h2>{title}</h2>}
                {description&&<p className='mt1' style={{color: 'var(--theme-muted-color)', fontSize: 'var(--size-small)'}}>{description}</p>}
            </div>
            <div className='FadeInRight-Effect flex align-ceter justify-end'>
                <div className='filters'>
                    <div onClick={()=>setFilters(!Filters)} className={Filters?'icon-active':'icon'}>
                        <i className="fas fa-filter"/>
                    </div>
                </div>
                <div className='view-toggle'>
                    <div onClick={()=>setView('tile')} className={View==='tile'?'icon-active':'icon'}>
                        <i className="fas fa-th-large"></i>
                    </div>
                    <div onClick={()=>setView('list')} className={View==='list'?'icon-active':'icon'}>
                        <i className="fas fa-bars"></i>
                    </div>
                </div>
                <div className='pagination'>
                    <div onClick={()=>changePage(-1)} className='handle'><i className="fas fa-chevron-left"/></div>
                    <div className='counter'>{ActivePage} of {pages}</div>
                    <div onClick={()=>changePage(1)} className='handle'><i className="fas fa-chevron-right"/></div>
                </div>
            </div>
        </div>
        <div id='olive' className={`table-wrapper ${className}`}>
            {
                View==='list'?
                <table>
                    {
                        headers&&
                        <thead>
                            <tr className='relative' style={{background: ''}}>
                            <>
                            {
                                headers.map((heading, index)=>{
                                    return (
                                        <th key={index}>
                                            <div onClick={()=>sortRows(index)} style={{color: SortBy&&SortBy.index===index?'var(--theme-primary-color)':'#000'}} className='flex align-center pointer'>
                                                {heading}
                                                {
                                                    (SortBy&&SortBy.index===index)?
                                                        SortBy.order?
                                                        <i className="fas fa-sort-amount-up ml1" />
                                                        :<i className="fas fa-sort-amount-down ml1" />
                                                    :<div className='ml2'/>
                                                }
                                            </div>
                                        </th>
                                    )
                                })
                            }
                            <th></th>
                            </>
                            {
                                Selected.length?
                                <th className='FadeInRight-Effect absolute w-100' style={{top:0, left:0}} colSpan={headers.length+1}>
                                    <div className='action-bar'>
                                        <div>
                                            <div className='flex align-center'>
                                                <input onChange={selectAll} type='checkbox'  className='check-input'/>
                                                {Selected.length} Selected
                                            </div>
                                        </div>
                                        <div className='flex align-center'>
                                            {
                                            actions.map((action,index)=>{
                                                return (
                                                        <div onClick={action.onClick} className='action' key={index}>
                                                            {action.icon} {action.label}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </th>:<></>
                            }
                            {
                                Filters?
                                <th className='FadeInRight-Effect absolute w-100' style={{top:0, left:0}} colSpan={headers.length+1}>
                                    <div className='action-bar'>
                                        <div className='flex align-center'>
                                            Show
                                            <div className='ml2 flex align-center'>
                                                {
                                                    filters&&
                                                    filters.map((filter,index)=>{
                                                        return (
                                                            <div key={index} className='flex align-center justify-center mr2' style={{fontWeight:'normal', fontSize: '0.8rem'}}>
                                                                <input onChange={e=>applyFilter(e,filter)} type='checkbox'  className='check-input'/> {filter}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className='flex align-center'>
                                            Dates
                                            <DateRange className='ml2' size={'0.8rem'} type='range'/>
                                        </div>
                                    </div>
                                </th>:<></>
                            }
                            </tr>
                        </thead>
                    }
                    <tbody>
                    {
                        SortedRows.map((row,index)=>{
                            return (
                                <tr className={`${Selected.includes(index)?'selected':''}`} onClick={()=>selectRow(index)} key={index}>
                                    {
                                        row.map((cell,index)=>{
                                            return (
                                                <td key={index}>
                                                    {cell}
                                                </td>
                                            )
                                        })
                                    }
                                    <td>
                                        <SteakMenu options={actions}/>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                :
                <div className='mt4 tile-view'>
                    {
                        tileRenderer?
                        SortedRows.map((row, index)=>{
                            return tileRenderer(row)
                        })
                        :
                        <div className='FadeInUp-Effect w-100 flex justify-center align-center mt4' style={{height:'100px', color: '#666', borderRadius: '1rem', border: '1px solid var(--theme-secondary-container)'}}>No Renderer Provided</div>
                    }
                </div>
            }
        </div>
        </>
	)
}

Table.defaultProps = {
    margin: 'mt4',
    pages: 0
}

Table.propTypes = {
    /**
	 * Optional title for table
	 */
	title:Props.string,
    /**
	 * Optional description for table
	 */
	description:Props.string,
	/**
	 * External CSS Classes for table
	 */
	className:Props.string,
    /**
	 * Add margin to table component
	 */
	margin:Props.string,
    /**
	 * Table Headers
	 */
	headers:Props.array,
    /**
	 * Table Rows
     * Array of Column arrays
	 */
	rows:Props.array,
    /**
	 * Object of actions for table rows {label: string, onClick: func}
	 */
	actions:Props.array,
    /**
	 * Pass function to map rows data to tile view component
	 */
	tileRenderer:Props.func,
    /**
	 * Total number of pages for pagination
	 */
	pages:Props.number,
    /**
	 * Callback function that receives the active page and updates the table rows
	 */
     switchPage:Props.func,
      /**
	 * Array of filter labels
	 */
     filters:Props.array,
        /**
	 * Callback function that receives array of applied filters
	 */
     applyFilters:Props.func
}

export default Table;

