import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function LineGraph({title="", type= 'radar',zoom=true,labels=[],series=[]}) {
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
			colors: [
				"#a2d2ff",
				"#ffac81",
				"#ff928b",
				"#fec3a6",
				"#efe9ae",
				"#cdeac0",
				"#a1b5d8",
				"#e7c6ff",
				"#bde0fe",
				"#8d99ae"
			],
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
			<ReactApexChart options={data.options} series={data.series} type="radar" height={350} />
		</div>
	)
}
