import React from 'react'
import ReactApexChart from "react-apexcharts";

export default function WordCloud({title,words=[]}) {
	const options = {
		series: [
			{
				data: words.map(item=>({x:item.text,y:item.value}))
			}
		],
		options: {
			legend: {
				show: false
			},
			chart: {
				height: 350,
				type: 'treemap'
			},
			plotOptions: {
				treemap: {
					enableShades: true,
					shadeIntensity: 0.5,
					reverseNegativeShade: true,
					colorScale: {
						ranges:  [
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
						].map((item,index)=>{
							return {
								from : index * 4,
								to : index * 4 + 4,
								color:item
							}
						})
					}
				}
			}
		},

	}
	return (
        <div  className="graph-container border rounded-md mg2 mt4 pd2">
            <p className="fw-bold mb4">
                {title}
            </p>
			<ReactApexChart options={options.options} series={options.series} type="treemap" height={350} />
		</div>
	)
}
