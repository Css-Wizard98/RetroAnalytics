import {useEffect, useState} from "react";
import {debounce} from 'lodash';

export default function useMobileHook(maxWidth = 768){
	const [width, setWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleWindowSizeChange = debounce(() => {
			setWidth(window.innerWidth);
		}, 100);
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		}
	}, []);
	return  width <= maxWidth;
}
