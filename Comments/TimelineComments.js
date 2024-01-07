import React, {useRef} from 'react'
import ReactTimeAgo from "react-time-ago";
import Moment from "moment";
import Thumbnail from "retro/Thumbnail/Thumbnail";
import {Button, Texts} from "retro/index";

export default function TimelineComments({comments,name,logs,onComment}) {
	const COMMENT = useRef()
	let allItems = [...logs,...comments.map(item=>{
		return {
			...item,
			type:"comment",
			ownerName:item.owner.ownerName,
			log:item.message
		}
	})]
	allItems = allItems.sort((a,b)=>a.time-b.time)
	let item = (item,index) => {
		if(item.type==="comment"){
			return  (
				<div key={item.time}>
					<div className="flex align-stretch center-vertically horizontally">
						<div className="flex vertically" style={{width:30}}>
							<div style={{
								marginLeft:-6
							}}>
								<Thumbnail size={"S"} letter={item.owner.ownerName[0]}/>
							</div>
							{
								index!==allItems.length-1 && <div className="flex-1" style={{
									width:4,
									borderRight:'1px dashed #dedede',
								}}/>
							}
						</div>
						<div className="flex-1">
							<div className="border relative rounded-msm pd2">
								<p >
									<span className="fw-500">{item.owner.ownerName} {item.owner?.ownerId && `(${item.owner.ownerId})`}</span> <span className="text-muted ml1">commented</span>
								</p>
								<p className="text-muted flex center-vertically mt1">
									<svg className="bi bi-arrow-return-right mr1" style={{flexShrink:0, marginTop:5}} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
										<path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"></path>
									</svg>
									{item.message}
								</p>
								<div className="absolute right-2 top-2">
									<ReactTimeAgo date={Moment(item.time)._d} locale="en-US"/>
								</div>
							</div>
						</div>
					</div>
					{index!==allItems.length-1&& 	<div style={{
						height:35,
						width:4,
						borderRight:'1px dashed #dedede',
					}}/>}
				</div>
			)
		}
		if(item.type==="created"){
			return (
				<div key={item.time}>
					<div className="flex align-stretch center-vertically horizontally">
						<div className="flex vertically" style={{width:30}}>
							<div style={{
								height:8,
								width:8,
								marginTop:4,
								borderRadius:4,
								background:"#6367FA",
							}}/>
							{
								index!==allItems.length-1 && <div className="flex-1" style={{
									width:4,
									borderRight:'1px dashed #dedede',
								}}/>
							}
						</div>
						<div className="flex-1 mr4">
							<p>
								{item.ownerName} {item?.ownerId && `(${item.ownerId})`} <span style={{color:"#777"}}>created the {item.documentType}</span>.
							</p>
							<p style={{color:"#777"}}>
								#{item.documentId}
							</p>
						</div>
						<p className="text-small">
							<ReactTimeAgo date={Moment(item.time)._d} locale="en-US"/>
						</p>
					</div>
					{index!==allItems.length-1&& 	<div style={{
						height:35,
						width:4,
						borderRight:'1px dashed #dedede',
					}}/>}
				</div>
			)
		}
		if(item.type==="approvals.sent"){
			return (
				<div key={item.time}>
					<div className="flex align-stretch center-vertically horizontally">
						<div className="flex vertically" style={{width:30}}>
							<div style={{
								height:8,
								width:8,
								marginTop:4,
								borderRadius:4,
								background:"#dcc38e",
							}}/>
							{
								index!==allItems.length-1 && <div className="flex-1" style={{
									width:4,
									borderRight:'1px dashed #dedede',
								}}/>
							}
						</div>
						<div className="flex-1 mr4">
							<p>
								{item.ownerName} {item?.ownerId && `(${item.ownerId})`} <span style={{color:"#777"}}>received the {item.documentType} approval</span>.
							</p>
						</div>
						<p className="text-small">
							<ReactTimeAgo date={Moment(item.time)._d} locale="en-US"/>
						</p>
					</div>
					{index!==allItems.length-1&& 	<div style={{
						height:35,
						width:4,
						borderRight:'1px dashed #dedede',
					}}/>}
				</div>
			)
		}
		if(item.type && item.type.includes("approvals.")){
			return (
				<div key={item.time}>
					<div className="flex align-stretch center-vertically horizontally">
						<div className="flex vertically" style={{width:30}}>
							<div style={{
								height:8,
								width:8,
								marginTop:4,
								borderRadius:4,
								background:item.status==="declined"?"#df4355":"#84da59",
							}}/>
							{
								index!==allItems.length-1 && <div className="flex-1" style={{
									width:4,
									borderRight:'1px dashed #dedede',
								}}/>
							}
						</div>
						<div className="flex-1 mr4">
							<p>
								{item.ownerName} {item?.ownerId && `(${item.ownerId})`} <span style={{color:"#777"}}> {item.status} the {item.documentType} approval</span>.
							</p>
						</div>
						<p className="text-small">
							<ReactTimeAgo date={Moment(item.time)._d} locale="en-US"/>
						</p>
					</div>
					{index!==allItems.length-1&& 	<div style={{
						height:35,
						width:4,
						borderRight:'1px dashed #dedede',
					}}/>}
				</div>
			)
		}
		if(!item.type){
			if(item.log && item.log.toLowerCase().includes("approval viewed")){
				return (
					<div key={item.time}>
						<div className="flex align-stretch center-vertically horizontally">
							<div className="flex vertically" style={{width:30}}>
								<div style={{
									height:8,
									width:8,
									marginTop:4,
									borderRadius:4,
									background:"#c2e6e1",
								}}/>
								{
									index!==allItems.length-1 && <div className="flex-1" style={{
										width:4,
										borderRight:'1px dashed #dedede',
									}}/>
								}
							</div>
							<div className="flex-1 mr4">
								<p>
									{item.ownerName} {item?.ownerId && `(${item.ownerId})`} <span style={{color:"#777"}}>viewed the {item.documentType} approval</span>.
								</p>
							</div>
							<p className="text-small">
								<ReactTimeAgo date={Moment(item.time)._d} locale="en-US"/>
							</p>
						</div>
						{index!==allItems.length-1&& 	<div style={{
							height:35,
							width:4,
							borderRight:'1px dashed #dedede',
						}}/>}
					</div>
				)
			}
		}
		return (
			<div key={item.time}>
				<div className="flex align-stretch center-vertically horizontally">
					<div className="flex vertically" style={{width:30}}>
						<div style={{
							height:8,
							width:8,
							marginTop:4,
							borderRadius:4,
							background:"#dedede",

						}}/>
						{
							index!==allItems.length-1 && <div className="flex-1" style={{
								width:4,
								borderRight:'1px dashed #dedede',
							}}/>
						}
					</div>
					<div className="flex-1 mr4">
						<p>
							{item.log || item.remarks}
						</p>
					</div>
					<p className="text-small">
						<ReactTimeAgo date={Moment(item.time)._d} locale="en-US"/>
					</p>
				</div>
				{index!==allItems.length-1&& 	<div style={{
					height:35,
					width:4,
					borderRight:'1px dashed #dedede',
				}}/>}
			</div>
		)
	}
	return (
		<div>
			<Texts.Small heading className="mb4">
				Timeline & Comments
			</Texts.Small>
			{
				allItems.map(item)
			}
			{
				onComment && <div className="flex horizontally mt4">
					<div style={{
						marginLeft:-6
					}}>
						<Thumbnail size={"S"} letter={name[0]}/>
					</div>
					<div className="flex-1 w-100 ml2">
						<div className="comments-area flex-1 relative">
							<textarea ref={COMMENT} style={{background:"white",width:'100%',fontSize:14,fontWeight:500}} placeholder="Comments"/>
							<div  className="relative absolute bottom-1 left-1 right-1 flex pd1 horizontally">
								<div className="flex-1">

								</div>
							</div>
						</div>
						<Button onClick={()=>{
							let comment = COMMENT.current.value;
							COMMENT.current.value = ""
							onComment(comment)
						}} margin="mt1" className="btn  btn-sm btn-primary">
							Comment
						</Button>
					</div>
				</div>
			}
		</div>
	)
}
