import React, {useRef, useState} from 'react';
import {Headings} from '..';

function HorizontalSroll({children, margin = '-0.5rem',topMargin="mt4", heading, viewAll}) {

	let CONTAINER = useRef()
	const [State, setState] = useState(0);

	const scroll = (value) => {
		if (value > 0) {
			if (value > CONTAINER.current.scrollWidth) {
				value = CONTAINER.current.scrollWidth
			}
			CONTAINER.current.scroll({left: value, behavior: 'smooth'});
			setState(value)
		} else {
			CONTAINER.current.scroll({left: 0, behavior: 'smooth'});
			setState(0)
		}
	}


	return (
		<>
			<div className={`flex align-center justify-between ${topMargin}`}>
				{heading && <Headings.Regular>{heading}</Headings.Regular>}
				<div className='flex'>
					{
						viewAll &&
						<div onClick={viewAll}
							 className='ml3 pointer border rounded-pill text-small pl2 pr2 mr2 flex flex-center'>
							View All
						</div>
					}
					<div onClick={() => scroll(State - CONTAINER.current.clientWidth)}
						 className='border hoverable flex center mr1'
						 style={{width: '2rem', height: '2rem', borderRadius: '1rem'}}>
						<i className='fas fa-chevron-left'/>
					</div>
					<div onClick={() => scroll(State + CONTAINER.current.clientWidth)}
						 className='border hoverable flex center'
						 style={{width: '2rem', height: '2rem', borderRadius: '1rem'}}>
						<i className='fas fa-chevron-right'/>
					</div>
				</div>
			</div>
			<div ref={CONTAINER} className='flex w-100 mt2 overScrollX scrollbar-hidden pb1 relative' style={{margin}}>
				{children}
			</div>
		</>
	);
}

export default HorizontalSroll;
