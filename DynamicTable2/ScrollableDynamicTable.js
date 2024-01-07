import React, {useState} from 'react'
import {Button, CheckBox, DateRangeNew, Empty, SteakMenu, Texts} from "../index";
import Pagination from '@atlaskit/pagination';
import DropdownMenu, {DropdownItem, DropdownItemGroup} from '@atlaskit/dropdown-menu';
import Moment from "moment/moment";

function ScrollableDynamicTable({
									selected = false,
									onSelectAll = undefined,
									autoTrigger = true,
									onRange = undefined,
									headers = [],
									search = {sort: 'id', order: 'desc'},
									setSearch, View,
									width = 125,
									data = {items: [], total: 0, current: 0},
									selectable = {identifier: "id", actions: []},
									className = "scrollable-table",
									children,
									setPage,
									tableStyle = {borderSpacing: 0}
								}) {
	selectable = {
		actions: [],
		identifier: "id",
		...selectable
	}
	const {items, total, current, cards} = data;
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
	for (let i = 1; i <= total; i++) {
		PAGES.push(i);
	}
	return (
		<div className={`relative ${className} `}>
			{
				onRange || children ?
					<div className="flex mt4 mb4">
						{
							onRange &&
							<div className="mr2">
								<DateRangeNew defaultValue={{
									startDate: Moment().add(-24, 'd').valueOf(),
									endDate: Moment().add(1, 'd').valueOf()
								}} autoTrigger={autoTrigger} onChange={onRange} size={'0.8rem'}
											  type='range'/>
							</div>
						}
						{
							children
						}
					</div> : <div className="mt4"/>
			}
			{
				Selected.length ? <div className="relative flex center-vertically horizontally mt3 mb3">
					<div className='FadeIn-Effect border pl2 pr2 pt1 pb1 rounded-md flex align-center'>
						<p className="mr4 fw-600">
							{Selected.length} Selected
						</p>
						<DropdownMenu style={{
							text: '#333',
							background: 'var(--theme-primary-container)'
						}} trigger="Actions" appearance="default">
							<DropdownItemGroup title="Actions">
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
					</div>
				</div> : undefined
			}
			{
				View === "card" && cards &&
				<div style={{}} className="card-container">
					{
						cards.length === 0 && <div className="mg6 flex center w-100">
							<Empty/>
						</div>
					}
					{
						cards.map((row, index) => (<React.Fragment key={index}>
							{row.render}
						</React.Fragment>))
					}
				</div>
			}
			{
				View === 'list' || !cards ?
					<div className={`table-wrapper`}>
						<table style={tableStyle}>
							{
								headers.length ?
									<thead>
									<tr className='relative'>
										{
											headers.map((heading, index) => {
												if(heading.title==="Select"){
													return  (
														<th className={heading.class} style={{
															width: heading.weight * width
														}} key={index}>
															{
																onSelectAll && <>
																	<div className="pointer" onClick={onSelectAll} style={{
																		width:14,
																		height:14,
																		borderRadius:2,
																		border:'1px solid #222',
																		background:selected?"var(--theme-primary-color)":"none"

																	}}>

																	</div>
																</>
															}
														</th>
													)
												}
												return (
													<th className={heading.class} style={{
														width: heading.weight * width
													}} key={index}>
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
									: undefined
							}
							<tbody>
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
												// eslint-disable-next-line
												row.render.map((cell, index) => {
													if (cell.title || cell.name) {
														return (
															<td className={cell.class} style={{
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
																		cell.actions && cell.actions.length > 0 &&
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
						{
							!items.length && <>
								<div style={{
									width: '100%',
									position: 'sticky',
									left: 0
								}} className="pd4 text-center border">
									No data found for this table
								</div>
							</>
						}
					</div>
					: undefined
			}
			<div style={{margin: '30px auto'}} className="flex center">
				<Pagination max={8} onChange={(_, page) => {
					setPage(page - 1)
				}} selectedIndex={current} pages={PAGES}/>
			</div>
		</div>
	)
}


ScrollableDynamicTable.defaultProps = {
	margin: 'mt2',
	pages: 0
}

export default ScrollableDynamicTable;

