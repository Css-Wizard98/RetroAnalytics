import {useRef} from "react";

const useRefHooks = (count=2) => {
    let array = [];
	for(var i = 0;i<count;i++){
		array.push(useRef());
	}
	return array;
}

export default useRefHooks;

export{
	useRefHooks
}
