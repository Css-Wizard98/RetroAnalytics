import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function DonutGraph({title, series = [],labels=[]}) {
	const options = {
		series,
		options: {
			chart: {
				type: 'polarArea',
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
				"#8d99ae"],
            dataLabels:{
                enabled: false
            },
            labels,
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
            <ReactApexChart options={options.options} series={options.series} type="polarArea" />
        </div>
	)
}
