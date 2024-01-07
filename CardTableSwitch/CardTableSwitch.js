import React from 'react';
import {Loaders} from '..';
import BorderTable from '../BorderTable/BorderTable';
import Empty from '../Empty/Empty';

function CardTableSwitch({
							 defaultHeaders,
							 onSelect,
							 selectionKeys,
							 freeze,
							 params,
							 sortby,
							 filters,
							 colwidths,
							 mode,
							 data,
							 card,
							 row,
							 headers,
							 empty,
							 title,
							 options,
							 onSearch,
							 style,
							 className = 'mt3'
						 }) {
	if (!data)
		return <div className='flex center mt5'><Loaders.Medium/></div>

	if (mode === 'card')
		return (
			<div className={`card-container ${className}`} style={{...style}}>
				{
					data
						? data.length
							? data.map(card)
							: <div className='flex center w-100'><Empty label={empty}/></div>
						: <div className='flex center'><Loaders.Medium/></div>
				}
			</div>
		)

	if (mode === 'list')
		return (
			<BorderTable selectionKeys={selectionKeys} onSelect={onSelect} defaultHeaders={defaultHeaders}
						 params={params} filters={filters} sortby={sortby} freeze={freeze} colwidths={colwidths}
						 empty={empty} className={className} style={style} rows={data && data.map(line => row(line))}
						 headers={headers} title={title} onSearch={onSearch} options={options}/>
		)

	return <></>
}

export default CardTableSwitch;
