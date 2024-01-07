import React, {useEffect, useRef, useState} from 'react'
import Props from 'prop-types'
import './ChatBox.css'
import {Attachment, FileInput, Thumbnail, UrlListener} from '../../retro'
import moment from 'moment'

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Chatbox Component
 */

 function ChatBox({className, id, onClose, comments, title, category, onSend, config}) {

    let CHATBOX = useRef(), FILE = useRef(), MESSAGE = useRef();

    const [Uploading, setUploading] = useState(false);
    const [File, setFile] = useState(undefined);

    //Send File when new file is uploaded
    useEffect(() => {
        if(File){
            onSend('file', File, id)
            setFile(undefined)
        }
    }, [id, File, onSend]);

    //Send Text Message
    const sendMessage = () => {
        let msg = MESSAGE.current.value;
        if(!msg){
            return
        }
        onSend('text', MESSAGE.current.value, id)
        MESSAGE.current.value = ''
    }

    useEffect(() => {
        if(CHATBOX){
            CHATBOX.current.scroll({ top: CHATBOX.current.scrollHeight, behavior: "smooth"})
        }
    }, [comments]);

    const renderChats = (chat, index) => {
		if(chat.type==="assigned"){
			return  (
				<div key={index} className="text-center text-light text-small">
					{chat.content}
				</div>
			)
		}
        if(config.name===chat.ownerName){
            return (
                <div key={index} className='sent'>
                    <div className='bubble'>
                        <div className='message'>
                            <div className='text-truncate'>
                                <span className='fw-bold mr1'>{chat.ownerName}</span>
                                <span className='text-muted' style={{color:'#999'}}>{moment(chat.time).format('hh:MM a')}</span>
                            </div>
                            <div>
                                {
                                    chat.type==='text'
                                    ?chat.content
                                    :renderFile(chat.content)
                                }
                            </div>
                        </div>
                        <Thumbnail className='ml1' size='L' letter={chat.ownerName[0]}/>
                    </div>
                </div>
            )
        }else{
            return (
                <div key={index} className='received'>
                    <div className='bubble'>
                        <Thumbnail className='mr1' size='L' letter={chat.ownerName[0]}/>
                        <div className='message'>
                            <div className='text-truncate'>
                                <span className='fw-bold mr1'>{chat.ownerName}</span>
                                <span className='text-muted' style={{color:'#999'}}>{moment(chat.time).format('hh:MM a')}</span>
                            </div>
                            <div>
                                {
                                    chat.type==='text'
                                    ?chat.content
                                    :<Attachment url={chat.content}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const renderFile = (file) => {
        if((file.endsWith('.png')||file.endsWith('.jpg')||file.endsWith('.jpeg')||file.endsWith('.bmp'))){
            return <img onClick={()=>UrlListener.$emit(file)} alt="File" src={file} className='rounded-md mt1 pointer' style={{width:'10rem', objectFit: 'fill'}}/>
        }else{
            return <Attachment className='mt1' url={file}/>
        }
    }

	return (
        <div className={`FadeInRight-Effect chat-wrapper ${className}`}>
            <div className='flex align-center justify-between pd2 border-bottom' style={{background: 'var(--theme-surface-color)'}}>
                <div className='flex align-center'>
                    <Thumbnail className='mr1' size='L' letter={'S'}/>
                    <div>
                        <div className='fw-bold text-truncate'>{title}</div>
                        <div className='text-small text-truncate'>{category}</div>
                    </div>
                </div>
                <i onClick={onClose} className="fas fa-times pointer mr1" style={{fontSize:'1.5rem'}}/>
            </div>
            <div className='chats' ref={CHATBOX}>
                {
                    comments.length?comments.map(renderChats)
                    :<div className='w-100 text-center text-small'><i className="fas fa-headphones-alt mr1"></i> You ticket is not assigned yet</div>
                }
            </div>
            <div className='bottom-bar'>
                <div className='message-box'>
                    <input onKeyDown={e=>e.key==='Enter'?sendMessage():null} ref={MESSAGE} type='text' placeholder='Type Message...'/>
                    <div className='icons'>
                        {
                            Uploading
                            ?<div><div className='mini-loader'></div></div>
                            :<i onClick={()=>FILE.current.click()} className="fas fa-paperclip"/>
                        }
                        <FileInput status={setUploading} ref={FILE} mono={true} updateFiles={setFile} className='display-none'/>
                        <i onClick={sendMessage} className="fas fa-paper-plane" style={{color:'var(--theme-primary-color)'}}></i>
                    </div>
                </div>
            </div>
        </div>
	)
}

ChatBox.propTypes = {
	/**
	 * All Classes
	 */
	className:Props.string,
    /**
	 * ID of Support Ticket
	 */
	id:Props.string,
    /**
	 * Array of Comments Objects
	 */
	comments:Props.array,
    /**
	 * Title for Chatbox
	 */
	title:Props.string,
    /**
	 * Sub heading for Chatbox
	 */
	category:Props.string,
	/**
	 * Pass function to send messages
	 */
	onSend:Props.func,
    /**
	 * Pass function to handle close
	 */
	onClose:Props.func,
}

export default ChatBox;
