import React, {useEffect, useState} from 'react'
import {v4} from "uuid";
import Moment from 'moment'
import './index.css'
import Flag from './Flag'

class AlertWrapper {
	cb = undefined;
	setCb = (mCb) => {
		this.cb = mCb;
	}
	getCb = () => {
		return this.cb;
	}
	Container = ({mobile = false}) => {
		const [alerts, setAlerts] = useState([]);
		useEffect(() => {
			Alert.setCb((type, title, message) => {
				if(mobile){
					alert(message)
				}else{
					let mAlerts = [...alerts];
					mAlerts.push({
						type,
						id: v4(),
						title,
						dismissAt:Moment().add(3 + mAlerts.length * .5,'seconds').valueOf(),
						message
					})
					setAlerts(mAlerts)
				}
			})
		}, [alerts, setAlerts])
		useEffect(()=>{
			let interval = window.setInterval(()=>{
				let time = Moment().valueOf();
				let mAlerts = [...alerts];
				mAlerts = mAlerts.filter(value => {
					if(value.dismissAt<time){
						return false;
					}
					return true;
				})
				setAlerts(mAlerts)
			},100)
			return () => {
				if(interval)
					window.clearInterval(interval)
			}
		},[alerts,setAlerts])
		return (
			<div id="flag-group">
				{
					alerts.map(item=>{
						return (
							<Flag key={item.id} data={item}/>
						)
					})
				}
			</div>
		)
	}
}

const Alert = new AlertWrapper();

const vibrate = () => {
	if (Boolean(window.navigator.vibrate)) {
		window.navigator.vibrate(200);
	}
}

const TOAST = {
	success: message => {
		if (Alert.getCb()){
			Alert.getCb()("success", message, "Your action has been completed successfully!!")
		}else{
			alert(message)
		}
		vibrate()
	},
	warning: message => {
		if (Alert.getCb()){
			Alert.getCb()("warning", message, "There was an error while performing the action")
		}
		else{
			alert(message)
		}
		vibrate()
	},
	error: message => {
		if (Alert.getCb()){
			Alert.getCb()("error", message, "There was an error while performing the action")
		} else{
			alert(message)
		}
		vibrate()
	},
	handleError: e => {
		if (Alert.getCb()){
			let message = e.data.message;
			Alert.getCb()("error", message, "There was an error while performing the action")
		}
		else{
			alert(e.data.message)
		}
		vibrate()
	}
}

export {
	TOAST, Alert
}
