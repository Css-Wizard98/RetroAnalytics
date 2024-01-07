import React from 'react'
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import ErrorIcon from '@atlaskit/icon/glyph/error';

export default function Flag({data}) {
    let Component = ()=>(
        <div style={{
            color:"#0f5132"
        }}>
            <SuccessIcon/>
        </div>
    );
    if(data.type==="error"){
        Component = ()=>(<div style={{color:"red"}}>
            <ErrorIcon/>
        </div>);
    }
    if(data.type==="warning"){
        Component = WarningIcon;
    }
    if(data.type==="info"){
        Component = WarningIcon;
    }
	return (
		<div className={`flag ${data.type} FadeInRight-Effect`}>
            <div className="flex horizontally ">
                <div style={{width:40,height:40}}>
                    <Component size="large"/>
                </div>
                <div className="flex-1">
                    <div className="center-vertically">
                        <p className="title">
                            {data.title}
                        </p>
                    </div>
                    <p className="message">
                        {data.message}
                    </p>
                </div>
            </div>
		</div>
	)
}
