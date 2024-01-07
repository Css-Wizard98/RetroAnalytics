import {useEffect, useMemo} from 'react';
import ReactDom from 'react-dom';
import Props from 'prop-types'

/**
 * @author [Aakash Bhadana](https://github.com/aakashbhadana)
 * @returns {JSX}
 * @constructor
 */

function Isolate({children}){
	//Creating a new isolated container in the root of the application
	const appRoot = useMemo(() => document.createElement('div'), []);
	appRoot.setAttribute('id', 'app-root')

	useEffect(() => {
		document.body.appendChild(appRoot);

		return () => {
			document.body.removeChild(appRoot);
		}
	}, [appRoot])

	let element =  ReactDom.createPortal(children, appRoot);

	return element;
}

Isolate.propTypes = {
	container:Props.string
}

export default Isolate;
