import React from 'react'
import ReactApexChart from 'react-apexcharts'
import Graph from './graph.gif'

export default function TimeseriesGraph({title="",blank = false, type= 'area',zoom=true,series=[]}) {
	if(blank){
		return (
			<div  className="graph-container border rounded-md mg2 mt4 pd2 flex center vertically">
				<img alt="gif" src={Graph} style={{
					width:80,
					height:80,
					margin:12
				}}/>
				<p className="mb4 fw-bold">
					No Data Found
				</p>
			</div>
		)
	}
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
			<ReactApexChart options={data.options} series={data.series} type="line" height={350} />
		</div>
	)
}
