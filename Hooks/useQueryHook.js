import {useHistory, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";


export default function useQueryHook(){
	const location = useLocation()
	const {search} = location;
	const history = useHistory();
	let mQuery = new URLSearchParams(search);
	let apply = mQuery.get("q");
	let page = 0;
	let total = 0;
	let q = undefined;
	if(apply){
		apply = JSON.parse(apply);
		if(apply.total && apply.total>apply.page){
			total = apply.total;
			page = apply.page;
			q = apply.q;
		}
	}else{
		apply = {}
	}
	let order = apply.order||'desc';
	let sort = apply.sort;
	let startDate = apply.startDate;
	let endDate = apply.endDate;
	let filter = apply.filter;
	const [query,setQuery] = useState({
		q:q,
		page,
		order,
		sort,
		filter,
		total,
		endDate,
		startDate
	})
	useEffect(()=>{
		if(search){
			let mQuery = new URLSearchParams(search);
			let apply = mQuery.get("q");
			let page = 0;
			let total = 0;
			let q = undefined;
			if(apply){
				apply = JSON.parse(apply);
				if(apply.total && apply.total>apply.page){
					total = apply.total;
					page = apply.page;
				}
				q = apply.q;
				let order = apply.order||'desc';
				let sort = apply.sort||'id';
				let startDate = apply.startDate;
				let endDate = apply.endDate;
				let filter = apply.filter;
				setQuery({
					...search,
					q,
					page,
					order,
					sort,
					startDate,
					filter,
					endDate,
					total
				})
			}
		}
	},[search,setQuery])
	return [
		query,(s)=>{
			let query = `?q=${JSON.stringify(s)}`;
			let mQuery = new URLSearchParams(search);
			let $ = mQuery.get("_id");
			if($){
				query = `${query}&_id=${$}`
			}
			history.replace({
				search:query
			})
		}
	]

}
