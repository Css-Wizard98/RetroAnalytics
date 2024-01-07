import React, {useEffect, useMemo} from 'react';
import ReactDom from 'react-dom';
import Props from 'prop-types'

/**
 * @author [Aakash Bhadana](https://github.com/aakashbhadana)
 * @returns {JSX}
 * @constructor
 */

function Portal({children,container="modal-root"}){

	const modal = document.getElementById(container);
	const el = useMemo(() => document.createElement('div'), []);

	useEffect(() => {
		modal.appendChild(el);

		return () => {
			modal.removeChild(el);
		}
	}, [el])

	let element =  ReactDom.createPortal(children, el);

	return <>{element}</>;
}

Portal.propTypes = {
	children : Props.object,
	container:Props.string
}

export default Portal;
