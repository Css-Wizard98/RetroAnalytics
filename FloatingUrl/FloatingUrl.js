import React, {useEffect, useState} from 'react'
import {Portal, Texts} from "../index";

class _EventBus {

	constructor() {
		this.cb = undefined
	}

	$on(cb) {
		this.cb = cb;
	}

    $off(){
        this.cb = undefined
    }

	$emit(url = "") {
		if (this.cb)
			this.cb(url)
	}
}

const UrlListener = new _EventBus();

export default function FloatingUrl() {
	const [height,setHeight] = useState("100vh")
    const [url,setUrl] = useState(undefined);
    useEffect(()=>{
        UrlListener.$on((url)=>{
			setHeight('100vh')
            setUrl(url)
        });
        return () => {
            UrlListener.$off()
        }
    },[])

    if(!url){
        return (<></>)
    }
	const render = () => {
		if((url.startsWith('https://map.eka.io')||url.endsWith('.png')||url.endsWith('.jpg')||url.endsWith('.jpeg')||url.endsWith('.bmp'))){
            return <img onClick={()=>window.open(url, '_blank')} alt="File" src={url} className='pointer rounded-sm' style={{objectFit: 'contain',height:'calc(100% - 2%)',width:'calc(100% - 2%)',margin:'1%'}}/>
        }else{
			return(
				<iframe  sandbox title='Floating_Modal' className="h-100 w-100 hidden"  src={url}/>
			)
		}
	}

	return (
		<Portal>
			<div
				className="hidden shadow-lg border transition-height-ease flex column pd0"
				style={{width:500,border:'none',padding:0,maxWidth:'100%',height,zIndex:111,position:'fixed',left:0,top:0,background:'var(--theme-surface-color,#ffffff)',}}>
				<div className="relative border-bottom pt2 pl3 pb2 pr3" style={{background:'var(--theme-primary-container,#ffffff)'}}>
					<Texts.Regular style={{width:"80%",color:'var(--theme-on-primary-container,#22222)'}} className="truncate w-80">{url}</Texts.Regular>
					<div className='flex align-center' style={{position:'absolute',right:15,top:10}}>
						<h3 onClick={()=>height==='3.8rem'?setHeight('80vh'):setHeight('3.8rem')} className='pointer'><i className="fas fa-minus mr2"></i></h3>
						<h3 onClick={()=>{setUrl(undefined)}} className='pointer'><i className="fas fa-times"/></h3>
					</div>
				</div>

				<div className="hidden flex-1">
					{
						render()
					}
				</div>
			</div>
		</Portal>
	)
}

export {
    UrlListener
}
