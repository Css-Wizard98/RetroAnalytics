import React, {useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import useMobileHook from '../Alert/useMobileHook';
import './Drawer.css'

function Drawer({options, title}) {

    const HISTORY = useHistory();
    const LOCATION = useLocation();
    const {pathname} = LOCATION
    const MOBILE = useMobileHook()
    const [Open, setOpen] = useState(false);

    if(MOBILE){
        return (
            <>
            <div onClick={()=>setOpen(!Open)} className='fixed bg-light rounded-pill pd1 pl2 pr2' style={{top:'1rem', right:'1rem', zIndex:100}}>
                {
                    Open?<>Close <i className='fas fa-times'/></>:<>Menu <i className='fas fa-chevron-down'/></>
                }
            </div>
            {
                Open&&
                <div className='FadeInLeft-Effect drawer-wrapper scrollbar-autohide' style={{maxWidth:'100%', width:'100%', minWidth:'100%'}}>
                {
                    title&&<h3 className='ml2 mb2'>{title}</h3>
                }
                <div className='options'>
                    {
                        options.map((option, index)=>{
                            if(!option.label){
                                return (
                                    <div className='mt2 mb2 border-top'></div>
                                )
                            }
                            return (
                                <div key={index} onClick={()=>{setOpen(false);HISTORY.push(option.route)}} className={`option ${pathname.includes(option.route)?'active':''}`}>
                                    {
                                        option.icon&&
                                        <div className='icon'>
                                            {option.icon}
                                        </div>
                                    }
                                    {option.label}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            }
            </>
        )
    }

    return (
        <>
            <div className='FadeInLeft-Effect drawer-wrapper scrollbar-autohide'>
                {
                    title&&<h3 className='ml2 mb2'>{title}</h3>
                }
                <div className='options'>
                    {
                        options.map((option, index)=>{
                            if(!option.label){
                                return (
                                    <div className='mt2 mb2 border-top'></div>
                                )
                            }
                            return (
                                <div key={index} onClick={()=>HISTORY.push(option.route)} className={`option ${pathname.includes(option.route)?'active':''}`}>
                                    {
                                        option.icon&&
                                        <div className='icon'>
                                            {option.icon}
                                        </div>
                                    }
                                    {option.label}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default Drawer;
