import React, {useEffect, useState} from 'react'
import {Loaders, ScrollableDynamicTable, TableViewSwitch, TOAST as Alert} from "../";
import {get} from "../../App/Network/Axios";
import OpenIcon from "@atlaskit/icon/glyph/open";
import useQueryHook from "../Hooks/useQueryHook";
import Filter from "../Filter";


function useCardSwitch(type) {
	type = `switch:values:${type}`
	let viewDefault = localStorage.getItem(type);
	if (!viewDefault)
		viewDefault = "list";
	const [VIEW, SET] = useState(viewDefault);
	const SETVIEW = (value) => {
		localStorage.setItem(type, value)
		SET(value)
	}
	return [
		VIEW, SETVIEW
	]
}


function EmptyState({image,text,description,children}) {
	return (
		<div style={{minHeight:'calc(100vh - 120px)',minWidth:600}} className="flex w-100 h-100 vertically center">
			<div className="pd6 border rounded-md flex vertically center">
				<img alt="Empty State" src={image} style={{
					width:400
				}}/>
				<div className="mt4 mb4">
					<h1 className="fw-600 text-center">
						{text}
					</h1>
					<p className="text-center">
						{description}
					</p>
				</div>
				{children}
			</div>
		</div>
	)
}


const TableWithoutRangeBuilder = React.forwardRef(({
													   width = 150,
													   range = false,
													   empty = null,
													   tableClass = "",
													   sortKey = "id",
													   borderLess = false,
													   title,
													   searchEnabled = false,
													   des,
													   url,
													   card,
													   children,
													   onClick,
													   headers = [],
													   map = {},
													   hideAction = false
												   }, ref) => {
	borderLess = false;
	const [Query, setQuery] = useQueryHook();
	let page = 0;
	let total = 0;
	let order = 'desc';
	let sort = sortKey;
	if (Query.total) {
		total = Query.total;
		page = Query.page;
	}
	if (Query.sort) {
		sort = Query.sort;
		if (sort == null) {
			sort = sortKey;
		}
	}
	if (Query.order) {
		order = Query.order;
		if (order == null) {
			order = "desc";
		}
	}
	const [search, setSearch] = useState({
		page,
		sort,
		order,
		total,
		q: Query?.q || undefined
	})
	const [loading, setLoading] = useState(true)
	const [Data, SetData] = useState({
		total: 0,
		currentPage: page,
		totalPages: total,
		items: []
	})
	const loadPage = (search) => {
		get(url, (e, r) => {
			if (r) {
				SetData({
					...r,
					currentPage: search.page ? search.page : 0,
					totalPages: r.totalPages > 0 ? r.totalPages : Data.totalPages,
					total: r.total > 0 ? r.total : Data.total
				})
				setLoading(false)
			} else {
				Alert.handleError(e)
			}
		}, {
			offset: search.page,
			sort: search.sort,
			q: search.q,
			order: search.order,
		})
	}
	if (ref)
		ref.current = {
			reload: () => {
				if (search) {
					loadPage(search)
				}
			}
		};
	useEffect(() => {
		if (search) {
			loadPage(search)
			setQuery(search)
		}
	}, [search])
	const [VIEW, SETVIEW] = useCardSwitch(title ? title : url)
	if (loading) {
		return (
			<div className="pt4">
				<Loaders.Small/>
			</div>
		)
	}
	let Headers = [...headers].map((item, index) => ({
		title: item,
		class: index === 0 ? "table-sticky-row-first" : "",
		weight: index === 0 ? 1.5 : 1
	}));
	if (!hideAction) {
		Headers.push({
			weight: 1,
			title: "Actions",
			style: {
				justifyContent: "end",
				paddingRight: 10
			}
		})
	}

	/**
	 * If search is done then dont show empty state
	 */
	if (empty && !loading && Data.items.length===0 && (!search.q || search.q.length===0)) {
		return (<EmptyState {...empty}>{children}</EmptyState>)
	}
	return (
		<div className={`${tableClass} ${borderLess && 'borderLess'}`}>
			{
				searchEnabled &&
				<Filter border="" onSearch={q => {
					setSearch({
						...search,
						q,
						page: 0,
						total
					})
				}} margin="1rem -4rem">
					{
						card && <TableViewSwitch size="small" selected={VIEW} setSelected={SETVIEW}/>
					}
				</Filter>
			}
			<ScrollableDynamicTable
				tableStyle={{
					borderSpacing: 0
				}}
				width={width}
				setPage={page => {
					setSearch({
						...search,
						page,
						total: Data.totalPages,
					})
				}}
				View={VIEW}
				data={{
					current: Data.currentPage,
					total: Data.totalPages,
					items: Data.items.map(item => {
						let render = []
						headers.forEach((x, index) => {
							let content = map[x];
							if (!content) {
								render.push({
									class: index === 0 ? "table-sticky-row-first" : "",
									weight: index === 0 ? 1.5 : 1,
									title: item[x] ? item[x] : "Not Defined"
								})
							} else {
								render.push({
									class: index === 0 ? "table-sticky-row-first" : "",
									weight: index === 0 ? 1.5 : 1,
									children: content(item)
								})
							}
						})
						if (!hideAction) {
							if (map["actions"]) {
								render.push(
									map["actions"](item)
								)
							} else
								render.push({
									weight: 1,
									buttons: [
										{
											title: "View",
											className: 'btn-secondary btn-sm',
											before: (<OpenIcon size="small"/>),
											onClick: () => {
												onClick(item)
											}
										}
									],
									actions: [
										{
											actions: [
												{
													title: "View",
													before: (<OpenIcon size="small"/>),
													onClick: () => {
														onClick(item)
													}
												}
											]
										}
									]
								})
						}
						return {
							content: item,
							render
						}
					}),
					...card ? {
						cards: Data.items.map(item => ({
							item,
							render: card(item)
						})),
					} : {}
				}}
				headers={Headers}>
				<div className="flex center-vertically w-100 horizontally">
					{children}
				</div>
			</ScrollableDynamicTable>
		</div>
	)
})


export default TableWithoutRangeBuilder;
