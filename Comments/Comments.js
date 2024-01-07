import React, {useRef, useState} from 'react'
import Props from 'prop-types'
import moment from 'moment'
import {Button, Input, Modal, Texts, Thumbnail, TOAST} from '../index'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default Comments Input with All classes
 */

const Comment = ({author,comment,time}) => {
	return (
		<div className="mt3">
			<div className="flex horizontally center-vertically">
				<Texts.Regular style={{color:'var(--theme-on-variant-color)'}} >
					{author}
				</Texts.Regular>
				<Texts.Light className="ml1" style={{
					padding:'1px 4px',
					borderRadius:3,
					background:'var(--theme-variant-color)',
					color:'var(--theme-on-variant-color)'
				}}>
					Author
				</Texts.Light>
				<Texts.Light style={{fontSize:9}} className="flex-1 ml1">
					{moment(time).format("MMM DD, YYYY")}
				</Texts.Light>
			</div>
			<Texts.Regular style={{
				marginTop:12,
			}}>
				{comment}
			</Texts.Regular>
		</div>
	)
}

const Comments = React.forwardRef(({comments, addComment, className, disableHeader}, ref) => {


	let COMMENT_INPUT = useRef()
	const [AddModal, setAddModal] = useState(undefined);

	const add = (params) => {
		let val = COMMENT_INPUT.current.value;
		if(!val){
			TOAST.error('Enter something in comment box')
			return
		}
		addComment(val)
		setAddModal(undefined)
	}

	return (
		<>
		<div className={`flex justify-between align-center mb3 ${className}`}>
			{!disableHeader&&<div className='fw-bold text-small'>COMMENTS</div>}
			{
				addComment&&
				<Button onClick={()=>setAddModal(true)} className='btn btn-sm approve-btn rounded-pill text-small' margin='mt0'>+ New</Button>
			}
		</div>
        {
			comments.length?
			comments.map((comment,index)=>{
				return (
					<div key={index} className='pd2 mb1 rounded-sm border text-small'>
						<div className='flex justify-between align-center flex-wrap'>
							<div>
								{<Thumbnail letter={comment.owner.ownerName[0]} size='S'/>}
								<span className='ml1'>{comment.owner.ownerName}</span>
							</div>
							<div style={{color: '#999'}}>{moment(comment.time).format('DD MMM YYYY')}</div>
						</div>
						<div>
							<div className='flex mt2'>
								<svg className="bi bi-arrow-return-right mr1" style={{flexShrink:0, marginTop:5}} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
									<path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"></path>
								</svg>
								<div>
									{comment.message}
								</div>
							</div>
						</div>
					</div>
				)
			}):<div className='w-100 text-center text-small'>No Comments</div>
		}
		{
			AddModal&&
			<Modal title='New Comment' description='Enter the comment below' onSubmit={add} onClose={()=>setAddModal(undefined)} button='Add'>
				<Input className='' type='text' label='New Comment' placeholder='Comment here' ref={COMMENT_INPUT}/>
			</Modal>
		}
		</>
	)
})

Comments.Comment = Comment;

Comments.propTypes = {
	/**
	 * Use external css classes
	 */
	className:Props.string,
	/**
	 * Function to handle new comment addition
	 */
	addComment:Props.func,
	/**
	 * Comments Array
	 */
	comments: Props.array,
}

export {
	Comment
}

export default Comments;
