import React, {useEffect, useRef, useState} from 'react';
import '../Animation/Animation.css'
import axios from 'axios';
import {getToken, getUploadUrl} from '../../App/Network/DecentralizeWrapper'
import {Loaders, TOAST} from '../../../src/retro';

function DropFileInput({onDrop}) {

	const [FileDrop, setFileDrop] = useState(false);
	const [UploadingFiles, setUploadingFiles] = useState(false);
	let INPUT = useRef()

	useEffect(() => {
		['dragenter', 'dragover'].forEach(eventName => {
			document.addEventListener(eventName, (e) => {
				e.preventDefault();
				e.stopPropagation();
				setFileDrop(true);
			}, false);

		});

		['dragleave'].forEach(eventName => {
			document.addEventListener(eventName, (e) => {
				e.preventDefault();
				e.stopPropagation();
				setFileDrop(false);
			})
		}, false);

		document.addEventListener('drop', (e) => {
			e.preventDefault();
			e.stopPropagation();

			let droppedFiles = [...e.dataTransfer.files];
			setUploadingFiles(true);

			droppedFiles.forEach((file) => {
				uploadFile(file)
			});

		}, false);
	}, []);

	const uploadFile = async (file) => {
		if (file) {
			const formData = new FormData();
			formData.append('file', file);

			await axios({
				method: 'post',
				url: getUploadUrl(),
				data: formData,
				headers: {
					Authorization: `Bearer ${getToken()}`
				}
			}).then(res => {
				if (onDrop) {
					onDrop(res.data.url)
					setUploadingFiles(false)
				}
			})

		}
	};

	const selectFile = () => {
		let file = INPUT.current.files[0];
		if (checkExtension(file.name)) {
			uploadFile(file)
		} else {
			TOAST.error('Invalid file, only images and documets are allowed')
		}
	}

	const checkExtension = (name) => {
		let Extensions = ['.jpg', '.jpeg', '.png', '.bmp', '.pdf', '.xls', '.xlsx', '.sheet', '.doc', '.docx', '.page', '.ppt', '.pptx', '.csv', '.eml'];
		let FLAG = false;

		Extensions.forEach(ext => {
			if (name.endsWith(ext) && FLAG === false) {
				FLAG = true;
			}
		});

		return FLAG
	}

	if (UploadingFiles) {
		return (
			<div className='FadeIn-Effect h-100 w-100 flex center text-white pointer pd2'
				 style={{background: 'rgba(0,0,0,0.3'}}>
				<div className='w-100 h-100 rounded-sm flex center'
					 style={{border: '2px dashed #fff', fontSize: '1.6rem'}}>
					<div className='flex align-center'>
						<Loaders.Medium/>
						<span className='ml1'>Uploading..</span>
					</div>
				</div>
			</div>
		);
	} else if (FileDrop) {
		return (
			<div className='FadeIn-Effect h-100 w-100 flex center text-white pointer pd2'
				 style={{background: 'rgba(0,0,0,0.3'}}>
				<div className='w-100 h-100 rounded-sm flex center'
					 style={{border: '2px dashed #fff', fontSize: '1.6rem'}}>
					<div>
						<i className="fas fa-plus mr1"></i>
						Drop File here
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div onClick={() => INPUT.current.click()} className='h-100 w-100 flex column center pointer'
				 style={{fontSize: '1.6rem', color: 'var(--theme-primary-color)'}}>
				<i className="fas fa-paperclip mb2" style={{fontSize: '2rem'}}></i>
				<div>
					<input type='file' onChange={selectFile} ref={INPUT} style={{display: 'none'}} multiple={false}/>
					Drop or Upload File
				</div>
			</div>
		)
	}

}

export default DropFileInput;
