import React from 'react';
import './InlineTable.css'
import Props from 'prop-types'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default Inline Table with all classes
 */
function InlineTable({headers, rows, height, className, style, maxWidth = "100%"}) {
	return (
		<div className={`inline-table-wrapper ${className}`}
			 style={{height: height ? height : 'auto', maxWidth, ...style}}>
			<table className='inline-table'>
				<thead>
				<tr className='relative'>
					{
						headers.map((header, index) => {
							return (
								<th colSpan={index===0?"2":"1"} key={index}>
									{header}
								</th>
							)
						})
					}
				</tr>
				</thead>
				<tbody>
				{
					rows.map((row, index) => {
						return (
							<tr key={index}>
								{
									row.map((col, index) => {
										return (
											<td colSpan={index===0?"2":"1"} key={index}>
												{col}
											</td>
										)
									})
								}
							</tr>
						)
					})
				}
				{
					!rows.length&&<tr>
						<td className="pd2" colSpan={headers.length+1} >
							<p className="text-center">
								No data found for this view.
							</p>
						</td>
					</tr>
				}
				</tbody>
			</table>
		</div>
	);
}

InlineTable.propTypes = {
	/**
	 * All Classes
	 */
	className: Props.string,
	/**
	 * Style object
	 */
	style: Props.object,
	/**
	 * Table Headers Array
	 */
	headers: Props.array,
	/**
	 * Table Rows Array of Array Matrix
	 */
	rows: Props.array,
}

export default InlineTable;
