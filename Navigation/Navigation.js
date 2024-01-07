import React, {useEffect, useRef} from 'react';
import './Navigation.css'
import '..//Animation/Animation.css'
import {useHistory} from 'react-router-dom'


function Navigation({title,tags=[],  backUrl,children,top, style, container='wrapper'}) {

    let HISTORY = useHistory();
    let NAVBAR = useRef()

    useEffect(() => {
            const wrapper = document.getElementById(container);
            if(wrapper){
                wrapper.addEventListener('scroll', animate, false);

            return ()=>{
                wrapper.removeEventListener('scroll', animate);
            }
        }
    // eslint-disable-next-line
    }, [container]);

    const animate = () => {
        if(NAVBAR && NAVBAR.current){
            const wrapper = document.getElementById(container);
            let top = wrapper.scrollTop;
            if(top>80){
                NAVBAR.current.className = 'navigator-m'
            } else if(top<20){
                NAVBAR.current.className = 'navigator-web'
            }
        }
    }

    return (
        <div ref={NAVBAR} style={{top, ...style}} className='navigator-web'>
            <div className="relative">
                <div className='title-wrapper'>
                    {
                        backUrl&&
                        <div onClick={()=>{
                            if(backUrl==="back"){
                                HISTORY.go(-1)
                            }
                            else if(backUrl){
                                HISTORY.push(backUrl)
                            }else{
                                HISTORY.back()
                            }
                        }} className='back'>
                            <i className="fas fa-arrow-left"/>
                        </div>
                    }
                    <div className="relative w-100">
                        <div className='title text-truncate'>
                            {title}
                        </div>
                        {
                            tags.length>0 && <div style={{
                                color:"rgb(107,114,128)",
                                flexWrap: 'wrap',
                                rowGap: 4
                            }} className="mt1 flex horizontally center-vertically">
                                {
                                    tags.map((tag,index)=> {
                                        return (
                                            <div className="mr4 flex horizontally center-vertically">
                                                <i className={`fa mr1 ${tag.icon}`}/> {tag.text}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Navigation;
