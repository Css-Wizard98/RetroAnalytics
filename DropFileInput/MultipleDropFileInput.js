import React, {useEffect, useRef, useState} from 'react';
import '../Animation/Animation.css'

function MultipleDropFileInput({setFiles, files}) {
	const INPUT = useRef()
	const drop = useRef();
	const drag = useRef();
	const [dragging, setDragging] = useState(false);

	const [message, setMessage] = useState({
		show: false,
		text: null,
		type: null,
	})

	const showMessage = (text, type, timeout) => {
		setMessage({
			show: true,
			text,
			type,
		});

		setTimeout(() => setMessage({
			show: false,
			text: null,
			type: null,
		}), timeout);
	};
	const handleDragEnter = (e) => {
		e.preventDefault();
		e.stopPropagation();

	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if(drag.current){
			if (e.target === drag.current) {
				setDragging(false);
			}
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	useEffect(() => {
		drop.current.addEventListener('dragover', handleDragOver);
		drop.current.addEventListener('drop', handleDrop);
		drop.current.addEventListener('dragenter', handleDragEnter);
		drop.current.addEventListener('dragleave', handleDragLeave);
		return () => {
			if(drop && drop.current){
				drop.current.removeEventListener('dragover', handleDragOver);
				drop.current.removeEventListener('drop', handleDrop);
				drop.current.removeEventListener('dragenter', handleDragEnter);
				drop.current.removeEventListener('dragleave', handleDragLeave);
			}
		};
	}, []);

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const formats = ['png','pdf','jpg','jpeg']
		const files = [...e.dataTransfer.files];
		if (formats && files.some((file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
			showMessage(`Only following file formats are acceptable: ${formats.join(', ')}`,'error',2000);
			return;
		}
		if (files && files.length) {
			selectFile(files)
		}
	};

	const selectFile = files => {

	}
	if(message.type && message.type==="uploading"){

	}
	return (
		<div ref={drop}>
			{
				dragging ? <div ref={drag} className="pd6 mg4 flex center vertically " style={{
						width: 600,
						minHeight: 400,
						border: '1px dashed #dedede',
						background: dragging ? "#d8f8ed" : "#f6f6f6"
					}}>
						<h3 className="mt2">
							 Drop your files now.
						</h3>
						<p>
							Its safe to drop your files now
						</p>
					</div> :
					<div onClick={()=>{INPUT.current.click()}} style={{
						width: 600,
						minHeight: 400,
						border: '1px dashed #dedede',
						background: dragging ? "#d8f8ed" : "#f6f6f6"
					}} className="pd6 pointer mg4 flex center vertically">
						<h3 className="mt2">
							Drag & Drop Files Here
						</h3>
						<p>
							You can add png,img,pdfs by dragging files here.
						</p>
					</div>
			}
			<input type='file' onChange={() => {
				selectFile(INPUT.current.files)
			}} ref={INPUT} style={{display: 'none'}} multiple={true}/>
		</div>
	)
}

export default MultipleDropFileInput;
