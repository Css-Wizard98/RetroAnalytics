import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function HeatMap({title, series = [],labels=[]}) {
	const options = {
		series,
		options: {
			chart: {
				height: 350,
				type: 'heatmap',
			},
			plotOptions: {
				heatmap: {
					radius: 0,
					enableShades: false,
					colorScale: {
						ranges: [
							{
								from: 0,
								to: 0,
								color: '#dee2e6'
							},
							{
								from: 1,
								to: 100000,
								color: '#cdeac0'
							},
							{
								from: 100000,
								to: 1000000,
								color: '#a2d2ff'
							},
							{
								from: 1000000,
								to: 10000000,
								color: '#ffac81'
							},
							{
								from: 10000000,
								to: 100000000,
								color: '#ff928b'
							},
							{
								from: 10000000,
								to: 10000000000,
								color: '#616161'
							},
					],
					},
			}},
			dataLabels: {
				enabled: false
			},
			labels
		},
	};
	return (
        <div style={{width:'100%'}} className="graph-container border rounded-md mg2 mt4 pd2">
            <p className="fw-bold mb4">
                {title}
            </p>
			<ReactApexChart options={options.options} series={options.series} type="heatmap" height={350} />
		</div>
	)
}
