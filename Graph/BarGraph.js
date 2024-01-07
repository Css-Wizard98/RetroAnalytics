import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function BarGraph({title, series = [],labels=[]}) {
	const options = {
		series,
		options: {
			chart: {
				type: 'bar',
			},
            dataLabels:{
                enabled: false
            },
			plotOptions: {
				bar: {
					columnWidth: '65%',
					distributed: true,
				}
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
			xaxis: {
				categories:labels
			},
			responsive: [{
				breakpoint: 480,
				options: {
					chart: {
						width: 200
					},
					legend: {
						position: 'bottom'
					}
				}
			}]
		},


	};
	return (
        <div  className="graph-container border rounded-md mg2 mt4 pd2">
            <p className="fw-bold mb4">
                {title}
            </p>
            <ReactApexChart options={options.options} series={options.series} type="bar" />
        </div>
	)
}
