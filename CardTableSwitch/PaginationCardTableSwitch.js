import React, {useEffect, useState} from 'react';
import Empty from '../Empty/Empty';
import {Button, Loader, SteakMenu, Texts} from "../index";
import Pagination from "@atlaskit/pagination";

function PaginationCardTableSwitch({mode,data,
									   selected = false,
									   onSelectAll = undefined,search = {sort: 'id', order: 'desc'}, setSearch,rows=[],mapCard,tableStyle = {borderSpacing: 0},width = 125,headers = [],emptyState=(<Empty/>),loading=false,footerArea}) {
	const [page,setPage] = useState(0)
	useEffect(()=>{
		setPage(0)
	},[data])
	let PAGES = [];
	let total = data.length/10;
	if(data.length%10>0){
		total = total+1;
	}
	for (let i = 1; i <= total; i++) {
		PAGES.push(i);
	}
	if(loading){
		return (
			<>
				<Loader/>
				{footerArea}
			</>
		)
	}
	if(!data || !data.length){
		return (

			<>
				{emptyState}
				{footerArea}
			</>
		)
	}
	if (mode === 'card' && mapCard)
		return (
			<div className="relative">

				<div className={`card-container`}>
					{
						data.slice(page*10,(page*10)+10).map(mapCard)
					}
				</div>
				<div style={{margin: '30px auto'}} className="flex center">
					<Pagination max={8} onChange={(_, page) => {
						setPage(page - 1)
					}} selectedIndex={page} pages={PAGES}/>
				</div>
				{
					footerArea
				}
				<p className="absolute right-1 adani-hide bottom-1">
					Showing {page*10+1} - {data.length<(page*10)+10?data.length:(page*10)+10} from {data.length} items found.
				</p>
			</div>
		)

	return <div className="scrollable-table relative">
		<div className={`table-wrapper`}>
			<table style={tableStyle}>
				{
					headers.length > 0 &&
					<thead>
						<tr className='relative'>

							{
								headers.map((heading, index) => {
									if(index===0){
										heading.class = "table-sticky-row-first"
									}
									if(heading.title==="Select"){
										return <th className={heading.class}  style={{
											width: .3 * width
										}} >
											<div className="pointer" onClick={onSelectAll} style={{
												width:14,
												height:14,
												borderRadius:2,
												border:'1px solid #222',
												background:selected?"var(--theme-primary-color)":"none"
											}}/>
										</th>
									}
									return (
										<th className={heading.class} style={{
											width: heading.weight * width
										}} key={index}>
											<div onClick={() => {
												if (heading.sort) {
													if (search.sort === heading.sort) {
														setSearch({
															sort: search.sort,
															order: search.order === "desc" ? "asc" : "desc"
														})
													} else {
														setSearch({
															sort: heading.sort,
															order: "desc"
														})
													}
												}
											}}  style={heading.style} className='w-100 pointer'>
												{heading.title}
												{
													heading.sort !== undefined &&
													<>
														{
															search && search.sort && heading.sort === search.sort ?
																search.order === "desc" ?
																	<i className='fa fa-sort-up ml1'/>
																	: <i className='fa fa-sort-down ml1'/>
																: <i className='fa fa-sort ml1'/>
														}
													</>
												}
											</div>
										</th>
									)
								})
							}
						</tr>
					</thead>
				}
				<tbody>
				{
					rows.slice(page*10,(page*10)+10).map((row,index)=>{
						return(
							<tr key={`row:${index}}`}
								className={`FadeIn-Effect`}>
								{
									// eslint-disable-next-line
									row.map((cell, index) => {
										if(index===0){
											cell.class = "table-sticky-row-first"
										}
										if (cell.title || cell.name) {
											return (
												<td className={cell.class}  style={{
													...cell.style,
													width: cell.weight * width
												}} key={index}>
													<Texts.Regular>
														{cell.title || cell.name}
													</Texts.Regular>
												</td>
											)
										} else if (cell.container || cell.children || cell.component || cell.render) {
											return (
												<td className={cell.class} style={{
													...cell.style,
													width: cell.weight * width
												}} key={index}>
													{cell.children || cell.container || cell.component || cell.render}
												</td>
											)
										} else if (cell.actions || cell.buttons) {
											return (
												<td className=""
													style={{
														...cell.style,
														width: cell.weight * width
													}} key={index}>
													<div
														className="flex horizontally center-vertically justify-end">
														{
															cell.buttons && cell.buttons.length > 0 && (
																<div
																	className="flex horizontally center-vertically">
																	{
																		cell.buttons.filter(item => item !== undefined).map(item => {
																			return (
																				<Button key={item.title}
																						margin=""
																						className={`btn text-small ${item.className} ml1`}
																						onClick={item.onClick}>
																					{item.before} {item.title}
																				</Button>
																			)
																		})
																	}
																</div>
															)
														}
														{
															cell.actions && cell.actions.length > 1 &&
															<div className="ml1">
																<SteakMenu
																	options={cell.actions.filter(item => item !== undefined)}/>
															</div>
														}
													</div>
												</td>
											)
										}
									})
								}
							</tr>
						)
					})
				}
				</tbody>
			</table>
		</div>
		<div style={{margin: '30px auto'}} className="flex center">
			<Pagination max={8} onChange={(_, page) => {
				setPage(page - 1)
			}} selectedIndex={page} pages={PAGES}/>
		</div>
		{footerArea}
		<p className="absolute adani-hide right-1 bottom-1">
			Showing {page*10+1} - {data.length<(page*10)+10?data.length:(page*10)+10} from {data.length} items found.
		</p>
	</div>
}

export default PaginationCardTableSwitch;
