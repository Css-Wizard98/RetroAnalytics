import React, {useEffect, useId, useRef, useState} from 'react'
import Props from 'prop-types'
import './Input.css'
import axios from 'axios'
import {getToken, getUploadUrl} from '../../App/Network/DecentralizeWrapper'
import {TOAST} from '../../retro'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default File Input with All classes
 */

 const FileInput = React.forwardRef(({label, onSelect, extensions, type, className, updateFiles, mono, status, cameraOnly}, ref) => {

    const ID = useId();

    let FILE_REF = useRef(undefined);
    const [FileName, setFileName] = useState(undefined);

    const [Uploading, setUploading] = useState(false);

    useEffect(() => {
        if(status){
            status(Uploading)
        }
    }, [Uploading, status]);

    const uploadFile = async (file) => {
		if (file) {
			const formData = new FormData();
			formData.append('file', file);
            setUploading(true);

			await axios({
				method: 'post',
				url: getUploadUrl(),
				data: formData,
				headers: {
                    Authorization : `Bearer ${getToken()}`
				}
			}).then(res => {
                if(updateFiles){
                    updateFiles(res.data.url,file.name)
                }
                setUploading(false);
                if(mono){
                    setFileName(file.name)
                }
				FILE_REF.current.value = null
			})

		}
	};

    const selectFile = () => {
        let file;
        if(type==='multiple'){
            file = FILE_REF.current.files;
            if(onSelect){
                onSelect(file)
                return
            }
            Object.keys(file).forEach(item => {
                if(file[item].name&&checkExtension(file[item].name)){
                    uploadFile(file[item])
                }else{
                    TOAST.error('Invalid file, only images and documents are allowed')
                }
            });
        }else{
            file = FILE_REF.current.files[0];
            if(onSelect){
                onSelect(file)
                return
            }
            if(checkExtension(file.name)){
                uploadFile(file)
            }else{
                TOAST.error('Invalid file, only images and documents are allowed')
            }
        }
    }

    const checkExtension = (name) => {
        let Extensions = extensions||['.jpg','.jpeg','.png','.bmp','.pdf','.xls', '.xlsx', '.sheet','.doc', '.docx', '.page', '.ppt', '.pptx', '.csv', '.eml'];
        let FLAG = false;

        Extensions.forEach(ext => {
            if(name?.toLowerCase()?.endsWith(ext) && FLAG===false){
                FLAG = true;
            }
        });

        return FLAG
    }

    if(mono&&FileName){
        return(<div className="mt2">
			<p className="text-small">
				Attachment:
			</p>
			<div className="">
				{FileName} <span className="ml1 pointer danger-text fw-500" onClick={()=>{
				updateFiles(undefined)
				setFileName(undefined)
			}}>Remove</span>
			</div>
		</div>)
    }

    return (
        <>
        <div className={`${className}`}>
            {label&&
            <div className='text-start mb1'>
				<label className='text-input-label text-truncate'>{label}</label>
			</div>
            }
            {
                cameraOnly?
                <input type='file' accept='image/*' capture='environment' onChange={selectFile} id={ID} ref={(r)=>{FILE_REF.current=r;if(ref){ref.current=r}}} style={{display:'none'}} multiple={type==='multiple'}/>
                :<input type='file' onChange={selectFile} id={ID} ref={(r)=>{FILE_REF.current=r;if(ref){ref.current=r}}} style={{display:'none'}} multiple={type==='multiple'}/>
            }
            {
                FileName?
                <div className='text-small pd1 rounded-sm bg-light'>{FileName} <i onClick={()=>setFileName(undefined)} className='fa fa-times-circle pointer ml1'/></div>:
                <label htmlFor={ID} className='file-input'>
                    {
                        Uploading?
                        <div className='mini-loader'></div>
                        :<i className="fas fa-paperclip"/>
                    }
                </label>
            }
        </div>
        </>
    );
})

FileInput.propTypes = {
	/**
	 * Use external css classes
	 */
	className:Props.string,
    /**
	 * By default multiple file selection is allowed, pass type 'single' to make single file select.
	 */
	type: Props.string,
    /**
	 * Array of previous files, required if using multiple files select
	 */
	files: Props.array,
    /**
	 * Function to update previous files array
	 */
	updateFiles: Props.func,
}

export default FileInput;
