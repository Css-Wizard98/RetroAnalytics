import React, {useState} from 'react';
import './Attachment.css'
import FILE_ICON from './Icons/file.png';
import DOC_ICON from './Icons/doc.png';
import SHEET_ICON from './Icons/sheet.png';
import PPT_ICON from './Icons/ppt.png';
import ZIP_ICON from './Icons/zip.png';
import TXT_ICON from './Icons/txt.png';
import PDF_ICON from './Icons/pdf.png';
import {Modal, UrlListener} from '../../retro';
import Props from 'prop-types'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * View Attachment Component with all classes and style prop
 */

function Attachment({url, onDelete, className=''}) {
    const [DeclineModal, setDeclineModal] = useState(undefined);
    if(!url)
    	return (<div/>)
    let ICON = FILE_ICON;
    if(url.endsWith('.pdf')){
        ICON = PDF_ICON;
    }else if(url.endsWith('.doc')){
        ICON = DOC_ICON;
    } else if(url.endsWith('.txt')){
        ICON = TXT_ICON;
    } else if(url.endsWith('.xlsx') || url.endsWith('.xls') || url.endsWith('.numbers')){
        ICON = SHEET_ICON;
    } else if(url.endsWith('.zip')){
        ICON = ZIP_ICON;
    } else if(url.endsWith('.png')||url.endsWith('.jpg')||url.endsWith('.jpeg')||url.endsWith('.bmp')){
        ICON = url;
    } else if(url.endsWith('.ppt')){
        ICON = PPT_ICON;
    }
    return (
        <>
			<div className={`Voucher-Preview ${className}`} onClick={(e)=>{e.stopPropagation();UrlListener.$emit(url)}} style={{backgroundImage: `url('${ICON}')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
				{
					onDelete&&<i onClick={(e)=>{e.stopPropagation();setDeclineModal(url)}} className="absolute far fa-times-circle rounded-pill bg-white" style={{top:'-4px', left:'-4px', fontSize:'1.1rem'}}/>
				}
			</div>
			{DeclineModal&&<Modal title='Delete Attachment' description='Are you sure you want to delete this Attachment?' onSubmit={()=>{onDelete(DeclineModal); setDeclineModal(undefined)}} onClose={()=>setDeclineModal(undefined)} button='Delete'/>}
        </>
    );
}

Attachment.propTypes = {
	/**
	 * URL of the file
	 */
	url:Props.string,
	/**
	 * Function to call on delete action
	 */
	onDelete:Props.func,
	/**
	 * Classes to customize component
	 */
	 className:Props.string,
}

export default Attachment;
