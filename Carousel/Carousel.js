import React, {useEffect, useState} from 'react';
import './Caraousel.css'
import PropType from 'prop-types'

Carousel.propTypes = {
	/**
	 * Defaults to 3000
	 */
	duration: PropType.number,
	/**
	 * Pass array of slides
	 */
	slides: PropType.array
}


/**
    @author [aakash bhadana](https://github.com/aakashbhadana)
 */
function Carousel({slides, duration=3000,height=300}) {
	const [page, setPage] = useState(0);
	useEffect(()=>{
		const interval = setInterval(()=>{
			setPage(page + 1)
		},duration?duration:3000)
		return () => {
			window.clearTimeout(interval)
		}
	})
	return (
		<div style={{height,overflow:'hidden'}}>
			<div className="FadeInLeft-Effect" key={page}>
				<img alt="caraousel" src={slides[page%slides.length]} style={{
					height,
					objectFit:'contain'
				}}/>
			</div>
		</div>
	);
}

export default Carousel;
