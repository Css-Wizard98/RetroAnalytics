import React, {useEffect, useRef} from 'react';
import Quill from 'quill';
import './quill.snow.css';
import {ImageDrop} from 'quill-image-drop-module';
import ImageResize from 'quill-image-resize-module-react';
import ImageUploader from "quill-image-uploader";
import axios from "axios";
import Props from 'prop-types'

Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageUploader', ImageUploader);

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Quill Text Editor with all classes
 */

const TextEditor = React.forwardRef(({id, prefill, uploader, className}, Editor) => {

	let Delta = useRef(null);

	useEffect(() => {
		Delta.current = Quill.import('delta');
		Editor.current = new Quill(`#${id}`, {
			modules: {
				imageDrop: true,
				imageUploader: {
					upload: (file) => {
						return new Promise((resolve, reject) => {
							if(uploader){
								uploader(file,resolve,reject)
							}else{
								const formData = new FormData();
								formData.append('file', file);
								axios({
									method: 'post',
									url: 'https://file.eka.io/file',
									data: formData,
									headers: {
										clientId: '422dc3e2-a960-4941-9a7a-af64732157b5',
										clientSecret: "9cd4ce3e-6ea6-45d7-bf92-06c9c7a69873"
									}
								}).then(res => {
									resolve(res.data.url)
								})
							}
						});
					},
				},
				imageResize: {
					parchment: Quill.import('parchment')
				},
				toolbar: [
					['bold', 'italic', 'underline', 'strike'],
					[{'size': ['small', false, 'large', 'huge']}],
					[{'header': [1, 2, 3, 4, false]}],
					['link', 'image'],
				]
			},
			placeholder: 'Start typing here...',
			theme: 'snow'
		});
		if (prefill) {
			Editor.current.root.innerHTML = prefill;
		}
	}, [prefill]);


	return (
		<>
			<div className={className}>
				<div id={id} className='w-100' style={{height: '250px', background: 'var(--theme-variant-color)'}}/>
			</div>
		</>
	)
});

TextEditor.propTypes = {
	/**
	 * HTML to load into text editor
	 */
	prefill:Props.string,
	/**
	 * Classes to customize component
	 */
	 className:Props.string,
	/**
	 * Function to upload image file (optional)
	 */
	uploader: Props.func,
}

export default TextEditor;
