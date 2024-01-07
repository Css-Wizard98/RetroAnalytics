import React from 'react';
import {Headings} from '../.././retro';

function AttachmentPreview({files}) {

    const renderFiles = (file, index) => {
        if(file.endsWith('.pdf')){
            return <iframe sandbox key={index} onClick={()=>window.open(file,'_blank')} src={file} title='Preview' className='shadow-sm mt1 pointer' style={{border: 'none', width:'100%', height: '100vh'}}/>
        }else{
            return <img key={index} onClick={()=>window.open(file,'_blank')} src={file} alt='Attachment' className='w-100 shadow-sm mt1 pointer'/>
        }
    }

    return (
        <>
        <Headings.Small>{files.length} Attachment</Headings.Small>
        <div className='flex column w-100'>
            {files.map(renderFiles)}
        </div>
        </>
    );
}

export default AttachmentPreview;
