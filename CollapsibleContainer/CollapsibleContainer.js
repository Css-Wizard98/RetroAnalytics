import React, {useState} from 'react';
import {Headings} from '../index';

function CollapsibleContainer({id='', children, classname, onChange, style, icon, title, defaultState=true, size='sm'}) {

    const [Show, setShow] = useState(defaultState);

    return (
        <div id={id} style={style} className={`collapse-box border rounded-md pd2 mb2 ${classname}`}>
            <div onClick={()=>{setShow(!Show);if(onChange){onChange(!Show)}}} className='flex justify-between align-center'>
                <Headings.Small className={`heading-${size}`}>{icon&&icon} {title}</Headings.Small>
                <div>
                    <Headings.Small className={`heading-${size} pointer`}>
                        {
                            Show?<i className="fas fa-chevron-up"/>:<i className="fas fa-chevron-down"/>
                        }
                    </Headings.Small>
                </div>
            </div>
            {
                Show&&
                <div className='FadeInDown-Effect mt2'>
                {children}
                </div>
            }
        </div>
    );
}

export default CollapsibleContainer;
