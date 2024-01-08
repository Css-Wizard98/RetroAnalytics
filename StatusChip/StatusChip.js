import React from 'react';
import './StatusChip.css'

function StatusChip({status, className, style, linear = false}) {
	let value;
	if (status) {
		value = status.toLowerCase();
	} else {
		value = ''
	}
	let flag = 'pending';

	if (value.includes('with') || value.includes('finance pending') || value.includes('approval pending')) {
		flag = 'approval'
	} else if (value.includes('pending')) {
		flag = 'pending'
	} else if (value.includes('settled') || value.includes('completed') || value.includes('approved') || value.includes('valid') || value.includes('active') || value.includes('success')) {
		flag = 'success'
	} else if (value.includes('duplicate') || value.includes('failed') || value.includes('declined') || value.includes('rejected') || value.includes('invalid')) {
		flag = 'failed'
	} else if (value.includes('disabled') || value.includes('inactive')) {
		flag = 'disabled'
	} else if (value.includes('cancelled') || value.includes('violation')) {
		flag = "cancelled"
	}

	if (linear) {
		return <div className="flex horizontally center-vertically">
			<div className={`chip-circle ${flag}`}/>
			<div style={style} className={`text-truncate pointer linear ${flag}-text ${className}`}>{status}</div>
		</div>;
	}


	return <div data-tooltip-content={status} data-tooltip-id="wrapper" style={style}
				className={`status-chip text-truncate pointer ${flag} ${className}`}>{status== 'failed' ? 'SELL':'BUY'}</div>;
}

export default StatusChip;
