import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function LineGraph({title="", type= 'area',zoom=true,labels=[],series=[]}) {
	const data = {
		series,
		options: {
			chart: {
				height: 350,
				type,
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
				categories: labels,
			}
		},


	}
	return (
		<div  className="graph-container border rounded-md mg2 mt4 pd2">
			<ReactApexChart options={data.options} series={data.series} type="area" height={350} />
		</div>
	)
}
