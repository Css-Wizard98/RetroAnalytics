import React from 'react'
import {DropDown, Headings, Texts, Thumbnail} from "../../index";


export default function Account({data,dropdown}){
	return(
		<div style={{position:'relative'}} className="mr2">
			<DropDown
				top={70}
				label={
					<div style={{height:80}} className="flex horizontally center-vertically pointer">
						<Thumbnail size="L" letter={data.name?data.name[0]:"L"}/>
						<div className='user-options ml1 mr1 flex-1'>
							<Headings.Small className="medium truncate">{data.name}</Headings.Small>
							<Texts.Light>
								{data.email}
							</Texts.Light>
						</div>
					</div>
				}
				options={dropdown}
			/>
		</div>
	)
}
