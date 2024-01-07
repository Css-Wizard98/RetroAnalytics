import React, {useEffect} from 'react'

class _EventBus{
	constructor() {
		this.cbs = {}
	}

	$on(channel,cb={id:"",handle:()=>{}}){
		let cbs = this.cbs[channel];
		if(!cbs)
			cbs = [];
		cbs = cbs.filter(mCb=>mCb!==cb).filter(mCb=>mCb.id!==cb.id);
		cbs.push(cb)
		this.cbs[channel] = cbs;
	}

	$off(channel,cb={id:"",handle:()=>{}}){
		let cbs = this.cbs[channel];
		if(!cbs)
			cbs = [];
		cbs = cbs.filter(mCb=>mCb!==cb).filter(mCb=>mCb.id!==cb.id);
		this.cbs[channel] = cbs;
	}

	$emit(channel="",payload={}){
		let cbs = this.cbs[channel];
		if(!cbs)
			cbs = []
		cbs.forEach(cb=>{
			cb.handle(channel,{payload,channel,id:cb.id,time:new Date().getTime()})
		})
	}
}

const EventBus = new _EventBus();

function SendEvent(event){
	EventBus.$emit("dice",event)
}

function PageLoad(page){
	EventBus.$emit("dice",{
		type:'page_load',
		page:page
	})
}

function UploadEvent(submission, ref){
	EventBus.$emit("dice",{
		type:'upload',
		submission:submission,
		reference: ref
	})
}

function UserAction(action){
	EventBus.$emit("dice",{
		type:'action',
		action:action
	})
}

export {
	EventBus,SendEvent,PageLoad, UploadEvent, UserAction
}

export default function AnalyticsContainer({children,channel,onEvent}){
	useEffect(()=>{
		EventBus.$on(channel,{
			id:channel,
			handle:onEvent
		});
		return () => {
			EventBus.$off(channel,{
				id:channel,
				handle:onEvent
			})
		}
	},[])
	return (
		<>
			{children}
		</>
	)
}
