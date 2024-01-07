import {useHistory, useLocation} from "react-router-dom";

export default function useOpenHook(){
	const location = useLocation()
	const {search} = location;
	const history = useHistory();
	let mQuery = new URLSearchParams(search);
	return [mQuery.get('_id')||undefined,(id)=>{
		let apply = mQuery.get("q");
		let search = `?`;
		if(apply){
			search = `${search}q=${apply}`
		}
		if(search.length>2 && id){
			search = `${search}&_id=${id}`
		}else if(id){
			search = `_id=${id}`
		}
		history.replace({
			search
		})
	}]
}
