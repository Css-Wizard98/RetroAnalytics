import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function TimeseriesGraph({title="", type= 'area',zoom=true,series=[]}) {
	const data = {
		series,
		options: {
			chart: {
				height: 350,
				id: 'area-datetime',
				type: 'area',
				zoom: {
					enabled: zoom
				}
			},
			dataLabels: {
				enabled: false
			},
			stroke: {
				curve: 'smooth'
			},
			title: {
				text:title,
				align: 'left'
			},
			grid: {
				row: {
					colors: ['transparent', 'transparent'],
				},
			},
			xaxis: {
				type: 'datetime',
				tickAmount: 6,
			},
			tooltip: {
				x: {
					format: 'dd MMM yyyy'
				}
			},
		},


	}
	return (
		<div  className="graph-container border rounded-md mg2 mt4 pd2">
			<ReactApexChart options={data.options} series={data.series} type="area" height={350} />
		</div>
	)
}
