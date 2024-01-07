import React from 'react';
import {useHistory} from 'react-router-dom';
import {Headings} from '../index'

function BackButtom({url, onClick,className="mr3"}) {
    const HISTORY = useHistory()
    return (
        <div onClick={()=>onClick?onClick():url?HISTORY.push(url):HISTORY.goBack()}>
            <Headings.Regular className={`${className} pointer back-btn`}><i className='fa fa-arrow-left'/></Headings.Regular>
        </div>
    );
}

export default BackButtom;
