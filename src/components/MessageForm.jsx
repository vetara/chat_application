import { useState } from 'react';
import { sendMessage, isTyping } from 'react-chat-engine';
import { sendOutlined, PictureOutlined, SendOutlined } from '@ant-design/icons';

const MessageForm = (props) => {
    const [value, setValue] = useState(''); // Initial Value Of Message Is An Empty String
    //Props To Be Reconstructed
    const { chatId, creds} = props;

    //Submission Handler
    const handleSubmit = (event) => {
        event.preventDefault(); //Prevents The Browser From Refreshing When Form Is Submitted

        const text = value.trim();

        if (text.length > 0) {
            sendMessage(creds, chatId, { text });
            setValue('');
        }
    }

    //Input Field Handler
    const handleChange = (event) => {
        setValue(event.target.value); //Value Of Input

        isTyping(props, chatId);
    }

    //File Upload Handler
    const handleUpload = (event) => {
        sendMessage(creds, chatId, { files: event.target.files, text: '' })
    }
    return (
        <form className="message-form" onSubmit={handleSubmit}>
            <input 
                className="message-input" 
                placeholder="Type a message" 
                value={value} 
                onChange={handleChange} 
                onSubmit={handleSubmit}
                type="text"
            />
            <label htmlFor='upload-button'> 
                <span className='image-button'>
                    <PictureOutlined className='picture-icon' />
                </span>
            </label>
            <input 
                type="file"
                multiple={false}
                id='upload-button'
                style={{ display: 'none' }}
                onChange={handleUpload.bind(this)}    
            />
            <button type="submit" className="send-button">
                <SendOutlined className="send-icon" />
            </button>
        </form>
    )
}

export default MessageForm;