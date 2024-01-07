import useMobileHook from "../Alert/useMobileHook";
import useLocalHook from "./useLocalHook";
import {useSelector} from "react-redux";



export default function useWrapperHook(){
	const {origin} = useSelector(state=>({origin:state.origin}))
	const mobile = useMobileHook(950)
	const DEV_MODE = useLocalHook();
	if(mobile){
		return "left"
	}
	if(DEV_MODE){
		return "left";
	}
	if(!origin || origin.loading){
		return undefined
	}
	return mobile?'left':origin.navigation==="topbar"?"top":"left";
}
