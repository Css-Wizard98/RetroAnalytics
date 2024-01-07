import React, {useState} from 'react'
import './index.css'
import ArrowUpIcon from "@atlaskit/icon/glyph/arrow-up";
import ArrowDownIcon from "@atlaskit/icon/glyph/arrow-down";


export default function ExpandableSidebar({title="",items=[]}) {
	const [toggled,setToggled] = useState(undefined)
	let item = 'Open Tabs'
	items.forEach(x=>{
		x.actions.forEach(m=>{
			if(m.active){
				item = m.title;
			}
		})
	})
	return (
		<div id="retro-expandable-sidebar" className={toggled}>
			<div className="sidebar-pane FadeIn-Effect">
				{
					items.filter(i=>i!==undefined).map(item=>{
						return (
							<div className="options" key={item.title}>
								<span className="title fw-bold ml1">{item.title}</span>
								{
									item.actions.map(action=>{
										return (
											<div onClick={()=>{
												action.onClick()
												setToggled(undefined)
											}} key={action.title} className={`option ${action.active&&'active'}`}>
												<span className="mr1">
													{action.icon}
												</span>
												{action.title}
											</div>
										)
									})
								}
							</div>
						)
					})
				}
			</div>
			<div onClick={()=>{
				if(!toggled){
					setToggled("toggled")
				}else{
					setToggled(undefined)
				}
			}} className="sidepane-button">
				{toggled?"Close":item}
				<span className="ml1">
					{toggled? <ArrowDownIcon size="small"/>: <ArrowUpIcon size="small"/>}
				</span>
			</div>
		</div>
	)
}
