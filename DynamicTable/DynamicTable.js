import React, {useState} from 'react'
import {Button, CheckBox, SteakMenu} from "../index";
import Pagination from '@atlaskit/pagination';
import ArrowUpIcon from '@atlaskit/icon/glyph/arrow-up'
import ArrowDownIcon from '@atlaskit/icon/glyph/arrow-down'
import DropdownMenu, {DropdownItem, DropdownItemGroup} from '@atlaskit/dropdown-menu';
import DateRange from "../Inputs/DateRange";

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default Table with All classes
 */

function DynamicTable({
						  onRange = undefined,
						  headers = [],
						  search = {sort: 'id', order: 'desc'},
						  setSearch,
						  data = {items: [], total: 0, current: 0},
						  selectable = {identifier: "id", actions: []},
						  className = "",
						  children,
						  setPage,
						  View = "list"
					  }) {
	selectable = {
		actions: [],
		identifier: "id",
		...selectable
	}
	const {items, total, current,cards} = data;
	const [Selected, setSelected] = useState([]);
	const selectRow = (row) => {
		if (Selected.includes(row[selectable.identifier])) {
			let newArr = Selected.filter((identifier) => identifier !== row[selectable.identifier])
			setSelected(newArr)
		} else {
			setSelected([...Selected, row[selectable.identifier]])
		}
	}
	let PAGES = [];
	for (let i = 0; i <= total; i++) {
		PAGES.push(i);
	}
	return (
		<div className={`relative ${className}`}>
			<div className="relative flex center-vertically horizontally mb2" style={{height: 50}}>
				{
					onRange &&
					<DateRange onChange={onRange} className="mr2" size={'0.8rem'} type='range'/>
				}
				{
					Selected.length ?
						<div className='FadeIn-Effect flex align-center mr2'>
							<p className="mr2">
								{Selected.length} Selected
							</p>
							<DropdownMenu style={{
								text: '#333'
							}} trigger="Actions" appearance="default">
								<DropdownItemGroup title="Quick Actions">
									{
										selectable.actions.map(child => {
											return (
												<DropdownItem key={child.title} elemBefore={child.before}
															  title={child.title} onClick={() => {
													child.onClick(Selected)
												}}>
													{child.title}
												</DropdownItem>
											)
										})
									}
								</DropdownItemGroup>
							</DropdownMenu>
						</div> : undefined
				}
				{
					children
				}
				<div style={{
					position: 'absolute',
					right: 0,
					top: 10,
					maxWidth: '50%',
					overflowX: 'scroll'
				}}>
					<Pagination max={8} onChange={(_, page) => {
						setPage(page - 1)
					}} selectedIndex={current + 1} pages={PAGES}/>
				</div>
			</div>
			{
				View === 'list' ? <div className={`table-wrapper`}>

						<table>
							{
								headers.length ?
									<thead>
									<tr className='relative'>
										{
											selectable.actions.length ? <th style={{width: 60}}>

											</th> : undefined
										}
										{
											headers.map((heading, index) => {
												return (
													<th colSpan={heading.weight} key={index}>
														<div onClick={() => {
															if (heading.sort) {
																if (search.sort === heading.sort) {
																	setSearch({
																		...search,
																		sort: search.sort,
																		order: search.order === "desc" ? "asc" : "desc"
																	})
																} else {
																	setSearch({
																		...search,
																		sort: heading.sort,
																		order: "desc"
																	})
																}
															}
														}} style={heading.style} className='flex align-center pointer'>
															{heading.title}
															{
																(search && search.sort && heading.sort && heading.sort === search.sort) ?
																	search.order === "desc" ?
																		<ArrowUpIcon size="small"/>
																		: <ArrowDownIcon size="small"/>
																	: <div className='ml2'/>
															}
														</div>
														<span className="text-small"
															  style={{color: 'var(--theme-primary-color)'}}>
															{
																(search && search.sort && heading.sort && heading.sort === search.sort) ?
																	search.order === "desc" ?
																		"Descending"
																		:
																		"Ascending"
																	: <></>
															}
														</span>
													</th>
												)
											})
										}
									</tr>
									</thead>
									: undefined
							}
							<tbody>
							{
								!items.length && <tr>
									<td colSpan={headers.reduce((a, b) => ({
										weight: a.weight + b.weight
									})).weight} className="pd4 text-center">
										No data found for this table
									</td>
								</tr>
							}
							{
								items.map((row, index) => {
									let selected = selectable.actions.length && Selected.includes(row.content[selectable.identifier]);
									return (
										<tr key={`row:${index}:${row.content.id}`}
											className={`${selected ? 'selected' : ''} FadeIn-Effect`}>
											{
												selectable.actions.length ? <td style={{width: 60}}>
													<CheckBox className="pd1" checked={selected} onChange={() => {
														if (selectable.actions.length)
															selectRow(row.content)
													}}/>
												</td> : undefined
											}
											{
												row.render.map((cell, index) => {
													if (cell.title || cell.name) {
														return (
															<td colSpan={cell.weight} onClick={() => {
																if (selectable.actions.length)
																	selectRow(row.content)
															}} style={cell.style} key={index}>
																{cell.title || cell.name}
															</td>
														)
													} else if (cell.container || cell.children || cell.component || cell.render) {
														return (
															<td colSpan={cell.weight} onClick={() => {
																if (selectable.actions.length)
																	selectRow(row.content)
															}} style={cell.style} key={index}>
																{cell.children || cell.container || cell.component || cell.render}
															</td>
														)
													} else if (cell.actions || cell.buttons) {
														return (
															<td colSpan={cell.weight}
																className="flex horizontally center-vertically justify-end"
																style={cell.style} key={index}>
																{
																	cell.buttons && cell.buttons.length && (
																		<div
																			className="flex horizontally center-vertically mr1">
																			{
																				cell.buttons.map(item => {
																					return (
																						<Button key={item.title} margin=""
																								className={`btn ${item.className} mr1`}
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
																	cell.actions && cell.actions.length &&
																	<SteakMenu options={cell.actions}/>
																}
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
					: undefined
			}

			{
				View !== "list" && cards &&
				<div className="flex flex-wrap mt4">
					{
						cards.map((row, index) => (<React.Fragment key={index}>
							{row}
						</React.Fragment>))
					}
				</div>
			}
			<div className="flex center mt4">
				<Pagination max={12} onChange={(_, page) => {
					setPage(page - 1)
				}} selectedIndex={current + 1} pages={PAGES}/>
			</div>
		</div>
	)
}

DynamicTable.defaultProps = {
	margin: 'mt2',
	pages: 0
}

export default DynamicTable;

