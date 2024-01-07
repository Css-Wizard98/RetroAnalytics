import React from 'react'
import ReactApexChart from "react-apexcharts";

export default function ScatterMap({title,series=[]}) {
	const state = {
		series,
		options: {
			chart: {
				height: 350,
				type: 'scatter',
				zoom: {
					type: 'xy'
				}
			},
			dataLabels: {
				enabled: false
			},
			grid: {
				xaxis: {
					lines: {
						show: true
					}
				},
				yaxis: {
					lines: {
						show: true
					}
				},
			},
			xaxis: {
				type: 'datetime',
			}
		},

	}
	return (
		<div  className="graph-container border rounded-md mg2 mt4 pd2">
			<p className="fw-bold mb4">
				{title}
			</p>
			<ReactApexChart options={state.options} series={state.series} type="scatter" height={350} />
		</div>
	)
}
