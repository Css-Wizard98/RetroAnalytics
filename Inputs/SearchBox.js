import React, {useId, useState} from 'react'
import Props from 'prop-types'

const SearchBox = React.forwardRef(({disabled=false,placeholder,containerClass='w-100', className, onChange, onFocus, style, margin='mt1'}, ref) => {

	const ID = useId();
	const [Value, setValue] = useState('');

	const changeEvent = (e) => {
		let val = e.target.value;
		setValue(val)
		if(onChange){
			onChange(val)
		}
	}

	return (
		<div style={style} className={`search-box-wrapper ${containerClass}`}>
			<input disabled={disabled} autoComplete="off" type='text' className={`search-box ${margin} ${className}`} id={ID} onFocus={onFocus} onChange={changeEvent} ref={ref} placeholder={placeholder} value={Value}/>
			<i className="fas fa-search" style={{marginLeft:'-30px'}}/>
		</div>
	)
})

SearchBox.defaultProps = {
	placeholder: ''
}

SearchBox.propTypes = {
	className:Props.string,
	placeholder: Props.string,
}

export default SearchBox;

